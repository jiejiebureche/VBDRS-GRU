from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from utils.audio_utils import extract_features


app = Flask(__name__)
CORS(app)

# Load your model
model = load_model("model/gru_model.keras")

# Label map (adjust based on your model training)
emotion_labels = ["fear", "angry", "disgust", "neutral", "sad", "happy"]


@app.route('/predict', methods=['POST'])
def predict():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    file = request.files['audio']
    try:
        # Check filename
        filename = file.filename.lower()
        print("Received file:", filename)

        features = extract_features(file)
        if features is None:
            return jsonify({'error': 'Feature extraction failed'}), 400

        features = np.expand_dims(features, axis=0)  # shape: (1, 40, 1)
        prediction = model.predict(features)
        predicted_index = np.argmax(prediction)
        predicted_label = emotion_labels[predicted_index]
        predicted_prob = float(np.max(prediction))

        # Detect true emotion from filename
        true_emotion = "N/A"
        for label in emotion_labels:
            if label in filename:
                true_emotion = label
                break
        print("True Emotion inferred:", true_emotion)

        prediction_table = [{
            "True Emotion": true_emotion,
            "Predicted Emotion": predicted_label,
            "Predicted Probability": predicted_prob
        }]

        return jsonify({
            'emotion': predicted_label,
            'prediction_table': prediction_table
        })

    except Exception as e:
        import traceback
        print("Prediction error:", e)
        traceback.print_exc()
        return jsonify({'error': 'Failed to process audio'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000)