from flask import Flask, request, jsonify
from deepface import DeepFace
from PIL import Image
import tempfile

app = Flask(__name__)

def get_happiness_score(image):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
        image.save(temp_file, "JPEG")
        temp_file_path = temp_file.name

    analysis = DeepFace.analyze(img_path=temp_file_path, actions=['emotion'])
    emotion_data = analysis[0]['emotion']
    smile_score = emotion_data['happy']
    return float(smile_score)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']
    try:
        image = Image.open(file.stream)
        score = get_happiness_score(image)
        return jsonify({'happiness_score': score}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Remove debug=True for production deployment
if __name__ == '__main__':
    from waitress import serve
    serve(app, host='0.0.0.0', port=8080)
