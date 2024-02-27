import pandas as pd
import os
import time
from flask import Flask, render_template, redirect, url_for, request

app = Flask(__name__)

# home page of the project with basic information
@app.route('/home')
def landing_page():
    return {'time': time.time()}
    # return render_template('home.html')

# patient answers preoeration survey including ODI, dospert, etc.
@app.route("/survey/predict", methods=["POST"])
def survey_patient_page():
    result = request.get_json(silent=True)
    print(result)
    return 'OK, response received.'
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
    data = pd.read_csv(os.path.join(os.getcwd(), "data/all_risk_processed.csv"))
    # Process data into graphics
    return
    # return render_template('admin.html')