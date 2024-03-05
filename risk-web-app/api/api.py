import os
import sys
utilitiesRootDir = os.path.join(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "vm-spinal-risk")
sys.path.insert(0, utilitiesRootDir)
os.chdir(utilitiesRootDir)

# Import local modules
from utilities import data_processing as dp_utils
from utilities.drop_unbalanced_features import DropUnbalancedFeatures
from utilities.ml_models import predict_choice_model, predict_risk_model

import pandas as pd
import time

from flask import Flask, request, jsonify

# For reload purposes
import importlib
importlib.reload(dp_utils)

app = Flask(__name__)

# home page of the project with basic information
@app.route('/home')
def landing_page():
    return {'time': time.time()}
    # return render_template('home.html')

# the results from the preoperation survey including ODI, dospert, etc. is input into the model, model sends back distribution images for risk, dospert, 
@app.route("/survey/predict", methods=["POST"])
def survey_patient_page():
    os.chdir(utilitiesRootDir)
    print(os.getcwd())
    result = request.get_json(silent=False)
    del result["test_question"]
    if "spin_surg" not in result and "succ_surg" not in result:
        result["spin_surg"] = 0
        result["succ_surg"] = 0

    # preprocess data into correct format
    df = pd.DataFrame([result])
    df_features = dp_utils.get_data_features(df)
    print(df_features.columns)

    # model predictions
    pred_choice = predict_choice_model(df_features)
    pred_risk = predict_risk_model(df_features)
    print(pred_choice)
    print(pred_risk)

    return {"predicted_choice": pred_choice[0][0], "predicted_risk": pred_risk[0][0]}
    # return {"predicted_choice": pred_choice}

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