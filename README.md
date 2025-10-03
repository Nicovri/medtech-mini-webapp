# medtech-mini-webapp

Mini full-stack MedTech demo — static frontend + Python backend (Gradio on Hugging Face Space).

---

## Project Overview

This project demonstrates a **full-stack mini web app** for simulated medical image processing:

- **Frontend**: static HTML/CSS/JS app that allows a user to:

  - Upload a PNG/JPG image
  - Select a phase (`Arteriosa` or `Venosa`)
  - Submit the image to the backend
  - Display the original and processed images side-by-side

- **Backend**: Python + Gradio service deployed on Hugging Face Spaces that:
  - Receives an image and phase selection
  - Applies simulated image processing:
    - **Arterial phase** → increased contrast
    - **Venous phase** → Gaussian blur
  - Returns the processed image (base64)

> ⚠️ This project is for **educational purposes only**. It does not perform real medical image analysis.

---

## Repository Structure

medtech-mini-webapp/
├─ frontend/ # Static frontend (HTML/CSS/JS)
├─ backend/ # Python backend (Gradio + Pillow)
├─ LICENSE # MIT License
└─ README.md # Root README (this file)

---

## Demo / Live Links

- **Frontend (GitHub Pages)**:  
  [https://nicovri.github.io/medtech-mini-webapp/](https://nicovri.github.io/medtech-mini-webapp/)

- **Backend (Hugging Face Space)**:  
  [https://nicovri-medtech-backend.hf.space](https://nicovri-medtech-backend.hf.space)

---

## Setup / Run Locally

### 0. Clone the repository

Clone this repository with submodules (if used):

```bash
git clone --recurse-submodules https://github.com/Nicovri/medtech-mini-webapp.git
```

### 1. Backend

```bash
cd backend
python -m venv venv
# macOS / Linux
source venv/bin/activate
# Windows PowerShell
.\venv\Scripts\Activate.ps1

pip install -r requirements.txt
python app.py
```

### 2. Frontend

```bash
cd frontend
python -m http.server 8000
```

- Open your browser at [http://localhost:8000](http://localhost:8000)
- Make sure to update app.js with the backend URL (local or deployed HF Space).
