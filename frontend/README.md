# medtech-mini-webapp — Frontend

This folder contains the **static frontend** (HTML/CSS/JS) for the MedTech mini web app.  
It is designed to be deployed to **GitHub Pages** (or any static hosting service).

---

## Features

- Upload a PNG/JPG image.
- Select a phase:
  - `Arteriosa` → arterial phase
  - `Venosa` → venous phase
- Send the image and phase selection to the **backend** for processing.
- Display the original and processed images **side by side**.
- The images are **hidden until available** for a cleaner UX.

---

## Notes

- The frontend performs **no image processing**; all processing is done by the backend (Gradio + Pillow).
- Make sure the **backend Space is running and public**.
- For debugging, you can open the backend URL directly in a browser to see the Gradio interface.
