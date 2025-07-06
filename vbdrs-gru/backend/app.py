from flask import Flask, request, jsonify
from flask_cors import CORS
from audio_utils import process_audio
from tensorflow.keras.models import load_model
import os

app = Flask(__name__)
CORS(app)

# Load your GRU model
model = load_model("model/gru_model.h5")

# Define your emotion labels
emotion_labels = ['sad', 'happy', 'anger', 'disgust', 'fear', 'neutral']

@app.route("/predict", methods=["POST"])
def predict():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio = request.files["audio"]
    audio_path = os.path.join("temp", "audio.webm")
    audio.save(audio_path)

    # Process the audio and get features
    try:
        features = process_audio(audio_path)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # Predict using the model
    prediction = model.predict(features)
    predicted_index = prediction.argmax()
    predicted_emotion = emotion_labels[predicted_index]

    return jsonify({"emotion": predicted_emotion})
