# system modules
import os
import sys
thisFileDir = os.path.dirname(__file__)
utilitiesRootDir = os.path.join(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "vm-spinal-risk")
sys.path.insert(0, utilitiesRootDir)
os.chdir(utilitiesRootDir)

# standard modules
import pandas as pd
import importlib
import matplotlib
matplotlib.use('Agg')
import seaborn as sns
import matplotlib.pyplot as plt
import base64
import shap

from flask import Flask, request, jsonify
from io import BytesIO
from flask import Flask, request, jsonify
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

# Create registries of the survey questions to translate the option number back to option text for the output message
activity_registry = {
    0: "exercise",
    1: "work"
}

comp_registry = {
    0: "foot drop",
    1: "paralysis",
    2: "death"
}

ethnicity_registry = {
    1: "White" ,
    2: "Black or African American" ,
    3: "American Indian or Alaska Native" ,
    4: "Asian or Pacific Islander" ,
    5: "Hispanic, Latino, or Spanish origin" ,
    6: "An ethnicity not listed here" ,
    7: "Prefer not to say" 
}

sex_registry = {
    1: "Male" ,
    2: "Female" ,
    3: "Intersex" ,
    4: "Prefer not to say" 
}

income_registry = {
    1: "Less than $10,000",
    2: "$10,000-19,999",
    3: "$20,000-29,999",
    4: "$30,000-39,999",
    5: "$40,000-49,999",
    6: "$50,000-59,999",
    7: "$60,000-69,999",
    8: "$70,000-79,999",
    9: "$80,000-89,999",
    10: "$90,000-99,999" ,
    11: "$100,000-$124,999" ,
    12: "$125,000-$149,999" ,
    13: "$150,000-$174,999" ,
    14: "$175,000-$199,999" ,
    15: "$200,000-$224,999" ,
    16: "$225,000-$249,999" ,
    17: "$250,000 or more" ,
    18: "Prefer not to say" 
}

# the results from the preoperation survey including ODI, dospert, etc. is input into the model,
# model sends back predictions and distribution images for demographics, dospert, and risk. 
@app.route("/survey", methods=["POST"])
def survey_page():
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
    print(f"probability of patient proceeding with surgery: {pred_choice[0]}")
    print(f"predicted patient risk score: {pred_risk[0]}")

    # Create a figure and a set of subplots
    fig, ((ax1, ax2), (ax3, ax4), (ax5, ax6), (ax7, ax8), (ax9, ax10)) = plt.subplots(nrows=5, ncols=2, figsize=(14, 30))
    axes = [ax1, ax2, ax3, ax4, ax5, ax6, ax7, ax8, ax9, ax10]

    # Create age subplot
    sns.histplot(odi_quality_df['age'], ax=axes[0])
    axes[0].set_xlabel("Age")
    axes[0].set_title("US Population Age")
    axes[0].axvline(x=df_features["age"][0], color = 'r')

    # Create bmi subplot
    sns.histplot(odi_quality_df['bmi'].sort_values(), ax=axes[1])
    axes[1].set_xlabel("BMI")
    axes[1].set_title("US Population BMI")
    axes[1].axvline(x=df_features["bmi"][0], color = 'r')

    # Create ADI national ranking subplot
    sns.histplot(pd.to_numeric(odi_quality_df['adi_score'], errors='coerce').dropna(), ax=axes[2], bins=50)
    axes[2].set_xlabel("ADI National Ranking")
    axes[2].set_yticks(range(0, 21, 4))
    axes[2].set_xticks([1] + list(range(10, 101, 10)))
    axes[2].set_xticklabels(["1"] + [str(n) for n in range(10, 101, 10)])
    axes[2].set_title("US Population ADI")
    axes[2].axvline(x=int(df_features["ADI_NATRANK"][0]), color = 'r')

    # Create odi subplot
    sns.histplot(odi_quality_df['odi_final'].sort_values(), ax=axes[3])
    axes[3].set_xlabel("ODI")
    axes[3].set_title("US Population ODI")
    axes[3].axvline(x=df_features["odi_final"][0], color = 'r')

    # Create DOSPERT Ethical subplot
    sns.histplot(odi_quality_df['dospert_ethical'], ax = axes[4])
    axes[4].set_xlabel("DOSPERT Ethical (6-42)")
    axes[4].set_title("US Population DOSPERT Ethical")
    axes[4].axvline(x=df_features["dospert_ethical"][0], color = 'r')

    # Create DOSPERT Financial subplot
    sns.histplot(odi_quality_df['dospert_financial'], ax = axes[5])
    axes[5].set_xlabel("DOSPERT Financial (6-42)")
    axes[5].set_title("US Population DOSPERT Financial")
    axes[5].axvline(x=df_features["dospert_financial"][0], color = 'r')

    # Create DOSPERT Health/Safety subplot
    sns.histplot(odi_quality_df['dospert_health/safety'], ax = axes[6])
    axes[6].set_xlabel("DOSPERT Health/Safety (6-42)")
    axes[6].set_title("US Population DOSPERT Health/Safety")
    axes[6].axvline(x=df_features["dospert_health/safety"][0], color = 'r')

    # Create DOSPERT Recreational subplot
    sns.histplot(odi_quality_df['dospert_recreational'], ax = axes[7])
    axes[7].set_xlabel("DOSPERT Recreational (6-42)")
    axes[7].set_title("US Population DOSPERT Recreational")
    axes[7].axvline(x=df_features["dospert_recreational"][0], color = 'r')

    # Create DOSPERT Social subplot
    sns.histplot(odi_quality_df['dospert_social'], ax = axes[8])
    axes[8].set_xlabel("DOSPERT Social (6-42)")
    axes[8].set_title("US Population DOSPERT Social")
    axes[8].axvline(x=df_features["dospert_social"][0], color = 'r')

    # Create spinal risk score subplot
    sns.histplot(odi_quality_df['spinal_risk_score'], ax = axes[9])
    axes[9].set_xlabel("Spinal Risk Score (0-1)")
    axes[9].set_title("US Population Risk Score")
    axes[9].axvline(x=pred_risk[0], color = 'r')

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

    # construct message output for the patient
    message_output = f"""For a surgical scenario that has {df_features["pct_improv"][0]}% chance of improvement
        from {activity_registry[df_features["activity"][0]]}
        and a {df_features["pct_comp"][0]}% chance
        of {comp_registry[df_features["comp"][0]]},
        this {df_features["age"][0]}-year old
        {ethnicity_registry[df_features["ethnicity"][0]]}
        {sex_registry[df_features["sex"][0]]}
        with an ODI of {int(df_features["odi_final"][0])},
        BMI of {df_features["bmi"][0]:.2f},
        ADI of {df_features["ADI_NATRANK"][0]},
        an annual salary of {income_registry[df_features["income"][0]]},
        dospert ethical 90%,
        dospert financial 80%,
        dospert health 90%,
        dospert recreational 10%,
        dospert social 30%,
        risk score of {pred_risk[0]:.2f},
        the likelihood of choosing surgery is {pred_choice[0]:.2f}%."""
    return jsonify({'demo_plot': demo_base64, 'choice_plot': choice_shap_plot_base64, 'risk_plot': risk_shap_plot_base64, 'message': message_output})

# admin page: allows importing new data, exporting existing training data, show metrics on the data
@app.route("/admin", methods=["GET"])
def admin_page():
    # Create a figure and a set of subplots
    fig, ((ax1, ax2), (ax3, ax4), (ax5, ax6), (ax7, ax8), (ax9, ax10)) = plt.subplots(nrows=5, ncols=2, figsize=(14, 30))
    axes = [ax1, ax2, ax3, ax4, ax5, ax6, ax7, ax8, ax9, ax10]

    # Create age subplot
    sns.histplot(odi_quality_df['age'], ax=axes[0])
    axes[0].set_xlabel("Age")
    axes[0].set_title("US Population Age")

    # Create bmi subplot
    sns.histplot(odi_quality_df['bmi'].sort_values(), ax=axes[1])
    axes[1].set_xlabel("BMI")
    axes[1].set_title("US Population BMI")

    # Create ADI national ranking subplot
    sns.histplot(pd.to_numeric(odi_quality_df['adi_score'], errors='coerce').dropna(), ax=axes[2], bins=50)
    axes[2].set_xlabel("ADI National Ranking")
    axes[2].set_yticks(range(0, 21, 4))
    axes[2].set_xticks([1] + list(range(10, 101, 10)))
    axes[2].set_xticklabels(["1"] + [str(n) for n in range(10, 101, 10)])
    axes[2].set_title("US Population ADI")

    # Create odi subplot
    sns.histplot(odi_quality_df['odi_final'].sort_values(), ax=axes[3])
    axes[3].set_xlabel("ODI")
    axes[3].set_title("US Population ODI")

    # Create DOSPERT Ethical subplot
    sns.histplot(odi_quality_df['dospert_ethical'], ax = axes[4])
    axes[4].set_xlabel("DOSPERT Ethical (6-42)")
    axes[4].set_title("US Population DOSPERT Ethical")

    # Create DOSPERT Financial subplot
    sns.histplot(odi_quality_df['dospert_financial'], ax = axes[5])
    axes[5].set_xlabel("DOSPERT Financial (6-42)")
    axes[5].set_title("US Population DOSPERT Financial")

    # Create DOSPERT Health/Safety subplot
    sns.histplot(odi_quality_df['dospert_health/safety'], ax = axes[6])
    axes[6].set_xlabel("DOSPERT Health/Safety (6-42)")
    axes[6].set_title("US Population DOSPERT Health/Safety")

    # Create DOSPERT Recreational subplot
    sns.histplot(odi_quality_df['dospert_recreational'], ax = axes[7])
    axes[7].set_xlabel("DOSPERT Recreational (6-42)")
    axes[7].set_title("US Population DOSPERT Recreational")

    # Create DOSPERT Social subplot
    sns.histplot(odi_quality_df['dospert_social'], ax = axes[8])
    axes[8].set_xlabel("DOSPERT Social (6-42)")
    axes[8].set_title("US Population DOSPERT Social")

    # Create spinal risk score subplot
    sns.histplot(odi_quality_df['spinal_risk_score'], ax = axes[9])
    axes[9].set_xlabel("Spinal Risk Score (0-1)")
    axes[9].set_title("US Population Risk Score")

    plt.tight_layout()

    # prepare the demographics plot to be sent to the frontend
    buf = BytesIO()
    plt.savefig(buf, format='png')
    plt.close()  
    buf.seek(0)
    demo_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    
    return jsonify({'demo_plot': demo_base64})

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
