from flask import Flask, request, jsonify
from deepface import DeepFace
from PIL import Image
import numpy as np
import io
import tempfile

app = Flask(__name__)

# Function to process the image and return a happiness score
def get_happiness_score(image):
    # Create a temporary file to save the image
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
        image.save(temp_file, "JPEG")
        temp_file_path = temp_file.name

    # Analyze the image for emotions
    analysis = DeepFace.analyze(img_path=temp_file_path, actions=['emotion'])

    # Extract the 'happy' score
    emotion_data = analysis[0]['emotion']
    smile_score = emotion_data['happy']
    return float(smile_score)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']

    try:
        # Read the image file
        image = Image.open(file.stream)

        # Process the image and get the happiness score
        score = get_happiness_score(image)

        return jsonify({'happiness_score': score}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
