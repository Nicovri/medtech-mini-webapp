// ⚠️ Replace with your Hugging Face Space URL
const BACKEND_URL = "https://nicovri-medtech-backend.hf.space";

const fileInput = document.getElementById("fileInput");
const processBtn = document.getElementById("processBtn");
const originalImage = document.getElementById("originalImage");
const processedImage = document.getElementById("processedImage");
const imagesRow = document.getElementById("imagesRow");
const originalCard = document.getElementById("originalCard");
const processedCard = document.getElementById("processedCard");

let base64Image = null;

// File selected → preview original
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    base64Image = reader.result;
    originalImage.src = base64Image;

    // Show original card + row, hide processed
    originalCard.style.display = "block";
    imagesRow.style.display = "flex";
    originalImage.hidden = false;
    processedCard.style.display = "none";
    processedImage.hidden = true;
  };
  reader.readAsDataURL(file);
});

// Button click → process image
processBtn.addEventListener("click", async () => {
  if (!base64Image) {
    alert("Seleziona prima un'immagine.");
    return;
  }

  const phase = document.querySelector("input[name='phase']:checked").value;

  processBtn.disabled = true;
  processBtn.textContent = "Elaborazione...";

  try {
    const response = await fetch(`${BACKEND_URL}/api/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [base64Image, phase] }),
    });

    if (!response.ok) throw new Error("Errore dal server backend");

    const result = await response.json();
    processedImage.src = result.data[0];

    // Show processed card
    processedCard.style.display = "block";
    processedImage.hidden = false;
  } catch (err) {
    alert("Errore durante l'elaborazione: " + err.message);
  } finally {
    processBtn.disabled = false;
    processBtn.textContent = "Elabora immagine";
  }
});
