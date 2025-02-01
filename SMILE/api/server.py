from flask import Flask, request, jsonify
from deepface import DeepFace
from PIL import Image
import tempfile
import io

app=Flask(__name__)

def get_happiness_score(image):
    #image = Image.open(io.BytesIO(image))
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
        image.save(temp_file, "JPEG")
        temp_file_path = temp_file.name
    analysis = DeepFace.analyze(img_path=temp_file_path, actions=['emotion'])
    emotion_data = analysis[0]['emotion']
    smile_score = emotion_data['happy'] #.get('happy', 0.0)
    return float(smile_score)


@app.route("/")
def AboutUs():
    return "Smile ML Working!! "#render_template('AboutUs.html',home='',about='active',donate="",contact="")

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    
    image_data = Image.open(request.files['image'])

    #image_file = request.files['image']
    #image_data = image_file.read()
    try:
        score = get_happiness_score(image_data)
        return jsonify({'happiness_score': score})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
