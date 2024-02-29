import pickle
from .data_processing import ml_model_prep


def predict_risk_model(df):
    """Applies transformations and calls the risk model"""
    X = ml_model_prep(df)
    pass


def predict_choice_model(df):
    """Applies transformations and calls the choice model"""
    X = ml_model_prep(df, model_type='choice_model')
    # Load the pickle and apply it
    with open('./data/ml_models/choice_model.pkl', 'rb') as f:
        model = pickle.load(f)
    
    pred = model.predict(X)
    return pred