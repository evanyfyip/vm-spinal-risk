# Virginia Mason Spinal Risk Assessment Model

## Overview

This repository contains the code and resources for developing a predictive model for spinal risk assessments. The goal is to create a machine learning model that can accurately predict potential spinal surgery candidates assessment of spinal surgery risk given demographics, ODI, general risk assessments etc.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Data](#data)
- [Model Training](#model-training)
- [Evaluation](#evaluation)
- [Model Prediction](#model-prediction)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/evanyfyip/vm-spinal-risk.git
   cd vm-spinal-risk
   ```

2. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

## Usage

To use the spinal risk assessment model, follow these steps:

1. **Preprocess Data:**
   - Prepare your dataset following the format specified in the `data/` directory.
   - Utilize the provided data preprocessing scripts if necessary.

2. **Train Model:**
   - Run the model training script with your preprocessed data:

     ```bash
     python train_model.py --data_path data/train_data.csv
     ```

3. **Evaluate Model:**
   - After training, assess the model's performance using the evaluation script:

     ```bash
     python evaluate_model.py --data_path data/test_data.csv --model_path saved_models/model_checkpoint.pth
     ```
4. **Predict Model:**
   - Given a set of features, the model will return a spinal risk assessment score

## Data

The `data/` directory contains sample datasets for training and testing the model. Ensure your data follows the specified format for successful training and evaluation.

- `train_data.csv`: Training dataset
- `test_data.csv`: Testing dataset

## Model Training

The model is trained using a combination of demographic features, ODI score, and general risk assessment data. Customize the model architecture and hyperparameters in the `train_model.py` script as needed.

```bash
python train_model.py --data_path data/train_data.csv
```

## Evaluation

Evaluate the model's performance on unseen data using the evaluation script. Provide the path to the testing dataset and the trained model checkpoint.

```bash
python evaluate_model.py --data_path data/test_data.csv --model_path saved_models/model_checkpoint.pth
```
## Model Prediction

To generate a spinal risk score prediction....


## License

This project is licensed under the [MIT License](LICENSE).
```
