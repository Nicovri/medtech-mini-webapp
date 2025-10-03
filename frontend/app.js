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

  // Show processing message with hourglass emoji
  processBtn.disabled = true;
  processBtn.textContent = "⏳ Elaborazione in corso...";

  try {
    const client = await Client.connect("nicovri/medtech-backend");

    const result = await client.predict("/predict", {
      image: imageFile,
      phase: phase,
    });

    // Show the processed image
    processedImage.src = result.data[0].url;
    processedCard.style.display = "block";
    processedImage.hidden = false;

    // Update message to done with green check
    processBtn.textContent = "✅ Elaborazione completa";
  } catch (err) {
    alert("Errore durante l'elaborazione: " + err.message);
    processBtn.textContent = "Elabora immagine";
  } finally {
    // Re-enable button after a short delay if you want
    setTimeout(() => {
      processBtn.disabled = false;
      processBtn.textContent = "Elabora immagine";
    }, 1500);
  }
});
