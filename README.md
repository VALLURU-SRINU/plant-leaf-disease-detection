# PlantDoc AI: Plant Disease Detection Using Machine Learning

[![Python 3.9+](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://www.python.org/)
[![Flask 3.0](https://img.shields.io/badge/Flask-3.0.0-green.svg)](https://flask.palletsprojects.com/)
[![TensorFlow 2.15](https://img.shields.io/badge/TensorFlow-2.15.0-orange.svg)](https://www.tensorflow.org/)
[![MobileNetV2](https://img.shields.io/badge/Architecture-MobileNetV2-brightgreen.svg)](https://arxiv.org/abs/1801.04381)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An end-to-end, deep learning-powered foliar disease classification system. Designed to assist agricultural producers, agronomists, and home gardeners in rapidly diagnosing crop pathologies from leaf photos, estimating severity, and receiving verified organic and chemical curative treatments.

---

## 🌟 Key Features

- **Leaf Image Upload & Drag-and-Drop:** Intuitive web interface built with Bootstrap 5 and modern agricultural styling.
- **Deep Learning Inference:** Transfer learning via **MobileNetV2** pre-trained on ImageNet and fine-tuned on the PlantVillage foliar disease benchmark.
- **25+ Supported Crop Pathologies:** Detects diseases across Tomatoes, Potatoes, Apples, Corn, Grapes, and Bell Peppers.
- **Actionable Agronomic Guidance:** Instant treatment protocols covering both biological/organic controls and commercial fungicides/bactericides.
- **RESTful API Endpoint:** `/api/predict` endpoint for direct integration into mobile apps, edge devices, or drone surveillance.
- **Printable Field Diagnostic Report:** One-click print-optimized PDF generation for farmers and agronomy records.
- **Lightweight & Edge-Ready:** MobileNetV2 architecture (~14MB) ensures sub-100ms inference times on standard CPUs.

---

## 🏗️ Project Architecture

```
plant-disease-detection/
├── app.py                  # Flask backend server and routing
├── model.py                # MobileNetV2 architecture, inference engine, & disease metadata
├── requirements.txt        # Python dependency manifest
├── README.md               # Project documentation and guide
├── static/
│   ├── style.css           # Custom agricultural theme styles
│   └── uploads/            # Temporary storage for uploaded leaves
└── templates/
    ├── index.html          # Leaf upload & landing page
    ├── result.html         # Diagnostic report & treatment page
    └── about.html          # Neural network architecture overview
```

---

## 🚀 Quickstart Guide

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/plant-disease-detection.git
cd plant-disease-detection
```

### 2. Create and Activate a Virtual Environment
```bash
# macOS / Linux
python3 -m venv venv
source venv/bin/activate

# Windows (Command Prompt / PowerShell)
python -m venv venv
venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Run the Flask Application
```bash
python app.py
```
Open your browser and navigate to:
```
http://localhost:5000
```

---

## 🧠 Model Training & PlantVillage Dataset

The system uses **MobileNetV2** as a feature extractor with custom classification layers:
- `GlobalAveragePooling2D`
- `BatchNormalization`
- `Dense(256, activation='relu')`
- `Dropout(0.35)`
- `Dense(num_classes, activation='softmax')`

### Downloading the Dataset:
Download the standard **PlantVillage** dataset from Kaggle or Mendeley Data:
- [Kaggle PlantVillage Dataset](https://www.kaggle.com/datasets/emmarex/plantdisease)

Organize your dataset folder into train/validation folders:
```
dataset/
├── train/
│   ├── Tomato___Early_blight/
│   ├── Tomato___healthy/
│   └── ...
└── val/
```

### Retraining the Model:
You can invoke the built-in training routine from Python:
```python
from model import PlantDiseaseClassifier

classifier = PlantDiseaseClassifier(model_path="plant_disease_model.h5")
history = classifier.train_model(
    data_directory="path/to/dataset/train",
    epochs=15,
    batch_size=32
)
```

---

## 🔌 RESTful API Usage

You can query the API programmatically using `curl` or Python requests:

### cURL Example:
```bash
curl -X POST -F "file=@sample_leaf.jpg" http://localhost:5000/api/predict
```

### JSON Response:
```json
{
  "success": true,
  "inference_time_ms": 38.4,
  "prediction": {
    "crop": "Tomato",
    "disease": "Early Blight",
    "class_key": "Tomato___Early_blight",
    "confidence": 96.82,
    "severity": "Moderate to High",
    "pathogen": "Fungus (Alternaria linariae / solani)",
    "is_healthy": false,
    "symptoms": "Distinct target-shaped concentric rings on lower leaves...",
    "organic_treatment": "Serenade Garden (Bacillus subtilis), liquid copper fungicide...",
    "chemical_treatment": "Chlorothalonil, Azoxystrobin, or Boscalid...",
    "prevention": "Prune lower 12 inches of foliage; mulch underneath plants...",
    "top_candidates": [
      { "disease": "Early Blight", "crop": "Tomato", "confidence": 96.82 },
      { "disease": "Target Spot", "crop": "Tomato", "confidence": 2.14 },
      { "disease": "Septoria Leaf Spot", "crop": "Tomato", "confidence": 0.81 }
    ]
  }
}
```

---

## 🐳 Docker Deployment

To containerize the application for Google Cloud Run, AWS ECS, or Kubernetes:

```dockerfile
FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=5000
EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "--threads", "4", "--timeout", "120", "app:app"]
```

Build and run:
```bash
docker build -t plantdoc-ai .
docker run -p 5000:5000 plantdoc-ai
```

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
