// Import Gradio JS client from CDN
import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client@latest/dist/index.js";

// DOM elements
const fileInput = document.getElementById("fileInput");
const processBtn = document.getElementById("processBtn");
const originalImage = document.getElementById("originalImage");
const processedImage = document.getElementById("processedImage");
const imagesRow = document.getElementById("imagesRow");
const originalCard = document.getElementById("originalCard");
const processedCard = document.getElementById("processedCard");

let imageFile = null; // store the uploaded file

// When the user selects a file, show a preview
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return; // no file selected

  imageFile = file;
  // Show preview of original image
  originalImage.src = URL.createObjectURL(file);

  // Show the original image card and row
  originalCard.style.display = "block";
  imagesRow.style.display = "flex";
  originalImage.hidden = false;

  // Hide the processed image until ready
  processedCard.style.display = "none";
  processedImage.hidden = true;
});

// When the user clicks the "Elabora immagine" button
processBtn.addEventListener("click", async () => {
  if (!imageFile) {
    alert("Seleziona prima un'immagine."); // safety check
    return;
  }

  const phase = document.querySelector("input[name='phase']:checked").value;

  // Show processing state
  processBtn.disabled = true;
  processBtn.textContent = "⏳ Elaborazione in corso...";

  try {
    // Connect to the Hugging Face Space backend
    const client = await Client.connect("nicovri/medtech-backend"); // username/space_name

    // Call the /predict function with uploaded file and selected phase
    const result = await client.predict("/predict", {
      image: imageFile,
      phase: phase,
    });

    // result.data[0] is a FileData object; use its URL for img.src
    processedImage.src = result.data[0].url;

    // Show the processed image card
    processedCard.style.display = "block";
    processedImage.hidden = false;

    // Update button to indicate success
    processBtn.textContent = "✅ Elaborazione completa";
  } catch (err) {
    // Show error message if something goes wrong
    alert("Errore durante l'elaborazione: " + err.message);
    processBtn.textContent = "Elabora immagine";
  } finally {
    // Re-enable button after a short delay so user can process again
    setTimeout(() => {
      processBtn.disabled = false;
      processBtn.textContent = "Elabora immagine";
    }, 1500);
  }
});
