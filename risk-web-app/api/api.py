import pandas as pd
import os
import time
from flask import Flask, request, jsonify

app = Flask(__name__)

# data = pd.read_csv(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "vm-spinal-risk", "data", "all_risk_processed.csv"))

# home page of the project with basic information
@app.route('/home')
def landing_page():
    return {'time': time.time()}
    # return render_template('home.html')

# the results from the preoperation survey including ODI, dospert, etc. is input into the model, model sends back distribution images for risk, dospert, 
@app.route("/survey/predict", methods=["POST"])
def survey_patient_page():
    result = request.get_json(silent=False)
    if "spin_surg" not in result and "succ_surg" not in result:
        result["spin_surg"] = None
        result["succ_surg"] = None
    print(f"result received from frontend: {result}")
    # model goes here

    # model predicts

    # model returns percentile information
     
    return jsonify(result)
    # return redirect(url_for("index"))

# surgeon will enter values for percent complication and percent improvement
@app.route("/survey/surgeon")
def survey_surgeon_page():
    return
    # return render_template('survey_surgeon.html')

# shows patient a distribution and where their risk is on that
@app.route("/survey/results")
def survey_results_page():
    return
    # return render_template('survey_results.html')

# admin page: allows importing new data, exporting existing training data, show metrics on the data
@app.route("/admin")
def admin_page():
    # Process data into graphics
    return
    # return render_template('admin.html')

"""
send visual as image using the following
import json
import base64

data = {}
with open('some.gif', mode='rb') as file:
    img = file.read()
data['img'] = base64.encodebytes(img).decode('utf-8')

print(json.dumps(data))
"""