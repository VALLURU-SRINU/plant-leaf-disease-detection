"""
Plant Disease Detection Web Application
Framework: Flask
Deep Learning Engine: TensorFlow/Keras & MobileNetV2
Author: PlantDoc AI Engineering Team
"""

import os
import time
import uuid
import logging
from flask import Flask, render_template, request, redirect, url_for, jsonify, flash
from werkzeug.utils import secure_filename
from model import PlantDiseaseClassifier, DISEASE_CLASSES, DISEASE_INFO

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Flask App Configuration
app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "plantdoc-ai-production-secret-key-2026")

# Upload folder configuration
UPLOAD_FOLDER = os.path.join(app.root_path, "static", "uploads")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # 16 MB max payload

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize Classifier
logger.info("Initializing Plant Disease Classifier...")
classifier = PlantDiseaseClassifier(model_path="plant_disease_model.h5")


def allowed_file(filename: str) -> bool:
    """Checks if uploaded file has a permissible image extension."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/", methods=["GET"])
def index():
    """Renders the main upload interface with disease catalogue and guidelines."""
    # Group supported diseases by crop for clean UI presentation
    crops_summary = {}
    for key, info in DISEASE_INFO.items():
        crop = info.get("crop", "Other")
        if crop not in crops_summary:
            crops_summary[crop] = []
        crops_summary[crop].append(info.get("disease"))

    return render_template(
        "index.html",
        crops_summary=crops_summary,
        total_classes=len(DISEASE_CLASSES)
    )


@app.route("/predict", methods=["POST"])
def predict():
    """Handles plant leaf image uploads, executes classification, and renders results."""
    # Check if a file was submitted
    if "file" not in request.files:
        flash("No image file provided in upload request.", "danger")
        return redirect(url_for("index"))

    file = request.files["file"]

    if file.filename == "":
        flash("No file was selected. Please choose a leaf image.", "warning")
        return redirect(url_for("index"))

    if not allowed_file(file.filename):
        flash("Unsupported file format. Please upload a PNG, JPG, JPEG, or WEBP image.", "danger")
        return redirect(url_for("index"))

    try:
        # Generate safe unique filename to prevent collisions & directory traversal
        original_name = secure_filename(file.filename)
        extension = original_name.rsplit(".", 1)[1].lower()
        unique_filename = f"{uuid.uuid4().hex[:12]}_{int(time.time())}.{extension}"
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], unique_filename)

        # Save to disk
        file.save(file_path)

        # Run Deep Learning Inference
        start_time = time.time()
        result = classifier.predict(file_path)
        inference_time_ms = round((time.time() - start_time) * 1000, 1)

        # Build image URL for browser rendering
        image_url = url_for("static", filename=f"uploads/{unique_filename}")

        return render_template(
            "result.html",
            result=result,
            image_url=image_url,
            inference_time_ms=inference_time_ms
        )

    except Exception as e:
        logger.error(f"Inference error during processing: {str(e)}", exc_info=True)
        flash(f"Error analyzing image: {str(e)}", "danger")
        return redirect(url_for("index"))


@app.route("/api/predict", methods=["POST"])
def api_predict():
    """RESTful API endpoint for external clients, mobile apps, or IoT edge cameras."""
    if "file" not in request.files:
        return jsonify({"success": False, "error": "No file part in request."}), 400

    file = request.files["file"]
    if file.filename == "" or not allowed_file(file.filename):
        return jsonify({"success": False, "error": "Invalid or missing file."}), 400

    try:
        unique_filename = f"api_{uuid.uuid4().hex[:12]}.{file.filename.rsplit('.', 1)[1].lower()}"
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], unique_filename)
        file.save(file_path)

        start_time = time.time()
        prediction = classifier.predict(file_path)
        inference_ms = round((time.time() - start_time) * 1000, 1)

        return jsonify({
            "success": True,
            "inference_time_ms": inference_ms,
            "prediction": prediction
        }), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/about", methods=["GET"])
def about():
    """Displays project background, model architecture, and dataset specifications."""
    return render_template("about.html")


@app.route("/health", methods=["GET"])
def health():
    """Kubernetes/Docker liveness health check."""
    return jsonify({
        "status": "healthy",
        "service": "plant-disease-detection",
        "classes_loaded": len(classifier.classes),
        "model_loaded": classifier.model is not None
    }), 200


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
