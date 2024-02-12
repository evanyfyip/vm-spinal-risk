import pandas as pd
import os

from app import app
from flask import render_template, redirect, url_for, request

@app.route("/")
def landing_page():
    return render_template('home.html')

@app.route("/survey")
def survey_page():
    return render_template('survey.html')

@app.route("/result")
def result_page():
    return render_template('result.html')

@app.route("/admin")
def admin_page():
    data = pd.read_csv(os.path.join(os.getcwd(), "data/all_risk_processed.csv"))
    # Process data into graphics
    return render_template('admin.html')