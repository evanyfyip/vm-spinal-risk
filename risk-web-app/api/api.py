import pandas as pd
import os
import time
import matplotlib
import seaborn as sns
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import base64
from io import BytesIO
from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

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

@app.route('/generate-plot', methods=['POST'])
@cross_origin()
def generate_plot():
    # Load and preprocess the data
    sns.set_theme()
    odi_df = pd.read_csv('../data_processed/all_risk_processed.csv')
    odi_df = odi_df.rename(columns={'ADI_NATRANK':'adi_score'})
    odi_quality_df = odi_df[odi_df['risk_1_timestamp'] != '[not completed]']
    #odi_df['adi_score']  = odi_df['adi_score'].astype(int)
    # Create a figure and a set of subplots
    fig, ((ax1, ax2, ax3), (ax4, ax5, ax6)) = plt.subplots(nrows=2, ncols=3, figsize=(15, 7))
    axes = [ax1, ax2, ax3, ax4, ax5, ax6]

    sns.histplot(odi_quality_df['age'], ax=axes[0])
    sns.histplot(odi_quality_df['height_m'], ax=axes[1])
    sns.histplot(odi_quality_df['weight_kg'], ax=axes[2])
    sns.histplot(odi_quality_df['bmi'], ax=axes[3])
    sns.histplot(odi_quality_df['adi_score'], ax=axes[4])
    sns.histplot(odi_quality_df['odi_final'], ax=axes[5])
    plt.suptitle("Numerical variable distributions")
    axes[0].set_xlabel("Age")
    axes[1].set_xlabel("Height (m)")
    axes[2].set_xlabel("Weight (kg)")
    axes[3].set_xlabel("BMI")
    axes[4].set_xlabel("ADI")
    axes[5].set_xlabel("ODI")
    
    # Set title
    plt.title('Age Distribution')

    buf = BytesIO()
    plt.savefig(buf, format='png')
    plt.close()  
    buf.seek(0)

    image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    
    return jsonify({'image': image_base64})


@app.route('/get-number')
@cross_origin()
def get_number():
    return jsonify({'number': 42})  # Example number to return

if __name__ == "__main__":
    app.run(port=8000, debug=True)