from flask import Flask, request, jsonify
from deepface import DeepFace
from PIL import Image
import io

app = Flask(__name__)

def get_happiness_score(image):
    image = Image.open(io.BytesIO(image))
    analysis = DeepFace.analyze(img_path=image, actions=['emotion'], enforce_detection=False)
    emotion_data = analysis[0]['emotion']
    smile_score = emotion_data.get('happy', 0.0)
    return float(smile_score)

@app.get('/',methods=['GET'])
def index():
    return "Smile ML Backend Working"

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image_file = request.files['image']
    image_data = image_file.read()
    try:
        score = get_happiness_score(image_data)
        return jsonify({'happiness_score': score})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# This line is not needed for Vercel as it automatically handles the server
# if __name__ == '__main__':
#     app.run(debug=True)
