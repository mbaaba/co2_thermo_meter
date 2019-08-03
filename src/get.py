from flask import Flask, render_template, request, jsonify, make_response
import json


app = Flask(__name__)
@app.route('/', methods=['POST', 'GET'])
def test():
    return render_template('main.html', result="")


@app.route('/climate', methods=['POST', 'GET'])
def climate():
    with open("../data/curr_climate_data.json", "r") as read_file:
        data = json.load(read_file)
    return make_response(jsonify(
        data
    ), 200)
