# system modules
import os
import sys
thisFileDir = os.path.dirname(__file__)
utilitiesRootDir = os.path.join(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "vm-spinal-risk")
sys.path.insert(0, utilitiesRootDir)
os.chdir(utilitiesRootDir)

# standard modules
import pandas as pd
import time
import importlib
import matplotlib
matplotlib.use('Agg')
import seaborn as sns
import matplotlib.pyplot as plt
import base64
import shap
import io

from flask import Flask, request, jsonify
from io import BytesIO
from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin

# local modules
from utilities import data_processing as dp_utils
from utilities.drop_unbalanced_features import DropUnbalancedFeatures
from utilities.ml_models import predict_choice_model, predict_risk_model

importlib.reload(dp_utils)

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

# Load and preprocess the data for display purposes
sns.set_theme()
os.chdir(thisFileDir)
odi_df = pd.read_csv('../data_processed/all_risk_processed.csv')
os.chdir(utilitiesRootDir)
odi_df = odi_df.rename(columns={'ADI_NATRANK':'adi_score'})
odi_quality_df = odi_df[odi_df['risk_1_timestamp'] != '[not completed]']


# home page of the project with basic information
@app.route('/home')
def landing_page():
    return {'time': time.time()}
    # return render_template('home.html')

# the results from the preoperation survey including ODI, dospert, etc. is input into the model, model sends back distribution images for risk, dospert, 
@app.route("/survey/predict", methods=["POST"])
def survey_patient_page():
    result = request.get_json(silent=False)
    del result["test_question"]
    if "spin_surg" not in result and "succ_surg" not in result:
        result["spin_surg"] = 0
        result["succ_surg"] = 0

    # preprocess data into correct dataframe format
    df = pd.DataFrame([result])
    df_features = dp_utils.get_data_features(df)
    # print(df_features.T)

    # create model predictions
    pred_choice, choice_shap_values = predict_choice_model(df_features)
    pred_risk, risk_shap_values = predict_risk_model(df_features)
    print(f"patient will choose: {pred_choice[0]}")
    print(f"predicted patient risk score: {pred_risk[0]}")

    # Create a figure and a set of subplots
    fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(nrows=2, ncols=2, figsize=(14, 10))
    axes = [ax1, ax2, ax3, ax4]

    # create plots
    sns.histplot(odi_quality_df['age'], ax=axes[0])
    sns.histplot(odi_quality_df['bmi'].sort_values(), ax=axes[1])
    sns.histplot(pd.to_numeric(odi_quality_df['adi_score'], errors='coerce').dropna(), ax=axes[2], bins=100)
    sns.histplot(odi_quality_df['odi_final'].sort_values(), ax=axes[3])
    plt.suptitle("Numerical variable distributions")
        
    # adjust the labels of the figure
    axes[0].set_xlabel("Age")
    axes[0].axvline(x=df_features["age"][0], color = 'r')

    axes[1].set_xlabel("BMI")
    axes[1].axvline(x=df_features["bmi"][0], color = 'r')

    axes[2].set_xlabel("ADI National Ranking")
    axes[2].set_yticks(range(0, 21, 4))
    axes[2].set_xticks([1] + list(range(10, 101, 10)))
    axes[2].set_xticklabels(["1"] + [str(n) for n in range(10, 101, 10)])
    axes[2].axvline(x=int(df_features["ADI_NATRANK"][0]), color = 'r')

    axes[3].set_xlabel("ODI")
    axes[3].axvline(x=df_features["odi_final"][0], color = 'r')

    plt.tight_layout()

    # prepare the demographics plot to be sent to the frontend
    buf = BytesIO()
    plt.savefig(buf, format='png')
    plt.close()  
    buf.seek(0)
    demo_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')

    # prepare the choice model shap plot to be sent to the frontend
    shap.plots.bar(choice_shap_values, show=False)
    plt.title("Choice Prediction for Given Risk Scenario SHAP Values")
    plt.tight_layout()
    buf = BytesIO()
    plt.savefig(buf, format='png')
    plt.close() 
    buf.seek(0)
    choice_shap_plot_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')

    # prepare the choice model shap plot to be sent to the frontend
    shap.plots.bar(risk_shap_values, show=False)
    plt.title("Risk Score Prediction SHAP Values")
    plt.tight_layout()
    buf = BytesIO()
    plt.savefig(buf, format='png')
    plt.close() 
    buf.seek(0)
    risk_shap_plot_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')

    # message = f"""For a surgical scenario that has {df_features["pct_improv"][0]}% chance of improvement
    #     from {df_features["activity"][0]}
    #     and a {df_features["pct_comp"][0]}% chance
    #     of {df_features["comp"][0]},
    #     this {df_features["age"][0]}-year old
    #     {df_features["ethnicity"][0]}
    #     {df_features["sex"][0]}
    #     with an ODI of {df_features["odi_final"][0]},
    #     BMI of {df_features["bmi"][0]},
    #     ADI of {df_features["ADI_NATRANK"][0]},
    #     an annual salary of $175,000-$199,999, dospert ethical 90%, dospert financial 80%, dospert health 90%, dospert recreational 10%, dospert social 30%, risk score of [risk], the likelihood of choosing surgery is 8%."""
    return jsonify({'demo_plot': demo_base64, 'choice_plot': choice_shap_plot_base64, 'risk_plot': risk_shap_plot_base64})
    # return jsonify({'demo_plot': demo_base64, 'choice_plot': choice_shap_plot_base64, 'risk_plot': risk_shap_plot_base64, 'pred_choice': pred_choice, 'pred_risk': pred_risk})

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
    plt.subplots_adjust(wspace=0.5, hspace=0.5)
    fig.set_size_inches(30, 10, forward=True)
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
