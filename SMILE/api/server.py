from flask import Flask
from deepface import DeepFace
from PIL import Image
import io

app=Flask(__name__)

@app.route("/")
def AboutUs():
    return "Smile ML Working!! "#render_template('AboutUs.html',home='',about='active',donate="",contact="")

if __name__ == '__main__':
    app.run(debug=True)