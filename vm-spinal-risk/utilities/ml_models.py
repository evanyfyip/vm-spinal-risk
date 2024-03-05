import pickle
import shap
from .data_processing import ml_model_prep
from .drop_unbalanced_features import DropUnbalancedFeatures
import matplotlib.pyplot as plt


def predict_risk_model(df):
    """Applies transformations and calls the risk model"""
    X = ml_model_prep(df, model_type='risk_model')
    # Load the pickle and apply it
    with open('./data/ml_models/risk_model.pkl', 'rb') as f:
        model = pickle.load(f)

    # Load SHAP explainer
    with open('./data/ml_models/risk_model_shap.pkl', 'rb') as f:
        explainer = pickle.load(f)

    # Save SHAP plot
    shap_values = explainer(X)
    shap.plots.bar(shap_values[0], show=False)
    x = plt.gcf()

    pred = model.predict(X)
    return (pred, x)


def predict_choice_model(df):
    """Applies transformations and calls the choice model"""
    X = ml_model_prep(df, model_type='choice_model')
    
    # Load the pickle and apply it
    with open('./data/ml_models/choice_model.pkl', 'rb') as f:
        model = pickle.load(f)
    
    # Load SHAP explainer
    with open('./data/ml_models/choice_model_shap.pkl', 'rb') as f:
        explainer = pickle.load(f)
    
    # Save SHAP plot
    shap_values = explainer(X)
    shap.plots.bar(shap_values[0], show=False)
    x = plt.gcf()

    pred = model.predict(X)
    # If predicted value is less than 0, make it 0
    pred = [0 if p < 0 else p for p in pred]
    # If predicted value is more than 5, make it 5
    pred = [5 if p > 5 else p for p in pred]
    # Multiply by 20 to bring predictions to 0-100 scale
    pred = [p * 20 for p in pred]
    return (pred, x)