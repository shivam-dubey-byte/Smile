from flask import Flask
from deepface import DeepFace
from PIL import Image
import io

app=Flask(__name__)

def get_happiness_score(image):
    image = Image.open(io.BytesIO(image))
    analysis = DeepFace.analyze(img_path=image, actions=['emotion'], enforce_detection=False)
    emotion_data = analysis[0]['emotion']
    smile_score = emotion_data.get('happy', 0.0)
    return float(smile_score)


@app.route("/")
def AboutUs():
    return "Smile ML Working!! "#render_template('AboutUs.html',home='',about='active',donate="",contact="")

if __name__ == '__main__':
    app.run(debug=True)