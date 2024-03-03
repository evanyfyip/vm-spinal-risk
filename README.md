# Virginia Mason Spinal Risk Assessment Model

## Overview

This repository contains the code and resources for developing a predictive model for spinal risk assessments. The goal is to create a machine learning model that can accurately predict potential spinal surgery candidates assessment of spinal surgery risk given demographics, ODI, general risk assessments etc.

## Installation

If desired, create a new conda environment for the project.
```
conda create -n vm-spinal-risk python=3.8.18 -y
conda activate vm-spinal-risk
```

1. Clone the repository:

   ```bash
   git clone https://github.com/evanyfyip/vm-spinal-risk.git
   cd vm-spinal-risk
   ```

2. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```


## Project Structure
The project is organized into three main directories:

- `/node_modules`: Contains all the npm dependencies required by the project. The contents of this directory are managed by npm and primarily include libraries and frameworks used in the web application.
- `/risk-web-app`: Houses the source code for the web application portion of the project.
- `/vm-spinal-risk`: Contains data, models, notebooks, and utilities related to the spinal risk assessment analysis.

Below is a more detailed look into the `/risk-web-app` and `/vm-spinal-risk` components of the repository:

### Detailed Structure
#### `/risk-web-app`
- `/api`: Backend API sources for the web application.
- `/public`: Public assets and files served by the web app, such as `index.html`, images, and favicon.
- `/src`: The main source directory for the web application.
  - `/components`: Reusable UI components. For example, `NavBar` for navigation.
  - `/pages`: The different pages or routes of the web application.

#### `/vm-spinal-risk`
- `/data`: Datasets and related files used in the analysis.
  - Includes raw data, processed data, machine learning models, and training scripts organized by processing steps and model complexity (e.g., `polydegree1`, `polydegree2`).
- `/documents`: Documentation related to the project's research and analysis.
- `/figures`: Generated figures and plots, organized by analysis type (e.g., hyperparameter tuning, variance analysis).
- `/notebooks`: Jupyter notebooks detailing the project's analysis, divided into aims or sections (e.g., exploratory analysis, predictive modeling).
- `/output`: Output files generated by scripts and analysis, such as processed datasets or model metrics.
- `/utilities`: Utility scripts and modules that support data processing, analysis, and other repetitive tasks.

### Special Directories

#### `/node_modules`
This directory is managed by npm and should not be manually modified. It contains dependencies necessary for the web application's development and runtime. Due to its size, it's typically not included in version control (excluded via `.gitignore`).

## Usage -  NEEDS TO BE UPDATED

For more detailed instructions on how to set up the development environment, run the web application, or execute the analysis notebooks, please refer to the specific README files located within the `/risk-web-app` and `/vm-spinal-risk` directories.

To use the spinal risk assessment model, follow these steps:

1. **Preprocess Data:**
   - Prepare your dataset following the format specified in the `data/` directory.
   - Utilize the provided data preprocessing scripts if necessary.
   a. Navigate to `vm-spinal-risk`
      ```bash
      cd vm-spinal-risk
      ```
   b. Run the data_processing.py script
      ```bash
      python utilities/data_processing.py
      ```

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

## License

This project is licensed under the [MIT License](LICENSE).
