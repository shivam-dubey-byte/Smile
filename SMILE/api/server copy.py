# /api/predict.py

from flask import Flask, request, jsonify
from deepface import DeepFace
from PIL import Image
import tempfile
from io import BytesIO

app = Flask(__name__)

def get_happiness_score(image):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
        image.save(temp_file, "JPEG")
        temp_file_path = temp_file.name

    analysis = DeepFace.analyze(img_path=temp_file_path, actions=['emotion'])
    emotion_data = analysis[0]['emotion']
    smile_score = emotion_data['happy']
    return float(smile_score)

@app.route('/api/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = Image.open(request.files['image'])
    score = get_happiness_score(image)
    return jsonify({'happiness_score': score})

# Vercel handler
def handler(event, context):
    from flask_lambda import FlaskLambda
    app_lambda = FlaskLambda(app)
    return app_lambda(event, context)
