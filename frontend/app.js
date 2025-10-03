import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client@latest/dist/index.js";

const fileInput = document.getElementById("fileInput");
const processBtn = document.getElementById("processBtn");
const originalImage = document.getElementById("originalImage");
const processedImage = document.getElementById("processedImage");
const imagesRow = document.getElementById("imagesRow");
const originalCard = document.getElementById("originalCard");
const processedCard = document.getElementById("processedCard");

let imageFile = null;

// File selected → preview original
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  imageFile = file;
  originalImage.src = URL.createObjectURL(file);

  // Show original card + row, hide processed
  originalCard.style.display = "block";
  imagesRow.style.display = "flex";
  originalImage.hidden = false;
  processedCard.style.display = "none";
  processedImage.hidden = true;
});

// Button click → process image
processBtn.addEventListener("click", async () => {
  if (!imageFile) {
    alert("Seleziona prima un'immagine.");
    return;
  }

  const phase = document.querySelector("input[name='phase']:checked").value;

  processBtn.disabled = true;
  processBtn.textContent = "Elaborazione...";

  try {
    // Connect to your deployed Space
    const client = await Client.connect("nicovri/medtech-backend"); // username/space_name

    // Call the /predict function
    const result = await client.predict("/predict", {
      image: imageFile,
      phase: phase,
    });

    // result.data[0] is the base64 string of the processed image
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
