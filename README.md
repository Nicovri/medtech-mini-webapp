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

## Setup / Run locally

1. Clone this repository with submodules (if used):

   ```bash
   git clone --recurse-submodules https://github.com/Nicovri/medtech-mini-webapp.git
   cd medtech-mini-webapp/frontend
   ```

2. Start a simple HTTP server to serve static files (recommended instead of opening index.html directly):

   ```bash
   # Python 3
   python -m http.server 8000
   ```

Then open your browser at [url](http://localhost:8000)
