from flask import Flask

app=Flask(__name__)

@app.route("/")
def AboutUs():
    return "Smile ML Working!! "#render_template('AboutUs.html',home='',about='active',donate="",contact="")

if __name__ == '__main__':
    app.run(debug=True)