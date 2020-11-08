
from makeMusic import main
from flask import Flask, send_file, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
@app.route('/')
def output():
    return "Flask server"

@app.route('/upload', methods = ['POST'])
def postdata():
    data = request.json
    print(request.is_json)
    print(request.json)

    main(data)

    curDir = os.getcwd()
    newCurDir = curDir.replace(os.sep, '/')
    return send_file(newCurDir + '/sounds/final-song/final.wav')


if __name__ == '__main__':
    app.run()
