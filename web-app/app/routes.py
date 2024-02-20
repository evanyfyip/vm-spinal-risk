import pandas as pd
import os

from app import app
from flask import render_template, redirect, url_for, request

# shows what the project is
@app.route("/")
def landing_page():
    return render_template('home.html')

# patient answers preoeration survey including ODI, dospert, etc.
@app.route("/survey/patient")
def survey_patient_page():
    return render_template('survey_patient.html')

# surgeon will enter values for percent complication and percent improvement
@app.route("/survey/surgeon")
def survey_surgeon_page():
    return render_template('survey_surgeon.html')

# shows patient a distribution and where their risk is on that
@app.route("/survey/results")
def survey_results_page():
    return render_template('survey_results.html')

# admin page: allows importing new data, exporting existing training data, show metrics on the data
@app.route("/admin")
def admin_page():
    data = pd.read_csv(os.path.join(os.getcwd(), "data/all_risk_processed.csv"))
    # Process data into graphics
    return render_template('admin.html')