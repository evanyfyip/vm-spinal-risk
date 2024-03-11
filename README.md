# Virginia Mason Spinal Risk Assessment Model

## Overview

This repository contains the code and resources for developing a predictive model for spinal risk assessments. The goal is to create a machine learning model that can accurately predict potential spinal surgery candidates assessment of spinal surgery risk given demographics, ODI, general risk assessments etc.

**Aim 0: Data collection and design**
We will design a survey that will be put onto a crowdsourcing platform such as MTurk, CloudResearch, or Prolific. The survey will give us insight into how the general public feels about undergoing surgery based on risk factors.

**Aim 1: Exploratory Analysis -  ODI Distribution**
A presentation of Age-based variations (per decade) of the "baseline" Oswestry Disability Index (ODI - which is a gold standard patient-reported outcome survey) in the general population. This will serve as an introduction to crowdsourcing platforms and establish important baseline data to help drive our future questions.

**Aim 2: Risk score correlations**
A model that demonstrates the relationship between a person's "risk" (financial, recreational activities, etc...) and their risk-taking attitudes towards their own health (spine care).
Modeling: Linear regression, correlation coefficient

**Aim 3: Predicting health (spinal) risk**
The Goal: An algorithmic tool that allows us to collect several factors including socio-economic status, risk, expectations, medical comorbidities, etc. --- and provides us with some sort of score/percentage that places them into a specific treatment recommendation category (we will work on these categories). We can then apply this model to our patients to validate the model and tune parameters for the best fit.
Modeling: Linear Regression, Decision tree, XGBoost, Random Forest, Bayesian modeling

Feature Importance: SHAP values

## Installation
### First, ensure system packages are installed:
- conda: [Link to Install Page](https://conda.io/projects/conda/en/latest/user-guide/install/index.html)
   - Scroll down to regular installation
- nodejs: [Link to Install Page](https://nodejs.org/en/download)
   - In the installation wizard, make sure npm is also installed

### Second, execute the following commands in a conda terminal (search for "Anaconda Prompt (anaconda3)") to install all project dependencies:
```bash
conda create -n vm-spinal-risk python=3.8.18 -y
conda activate vm-spinal-risk
git clone https://github.com/evanyfyip/vm-spinal-risk.git
cd vm-spinal-risk
pip install -r requirements.txt
cd risk-web-app
npm install
```
If you have an `ssh` key set up in GitHub, you can also clone the repository using `git clone git@github.com:evanyfyip/vm-spinal-risk.git`

### Lastly, to start the app, you need two conda terminals - one to run the frontend and one to run the backend. Ensure the current directory of both terminals are `…/vm-spinal-risk/risk-web-app/` and both terminals have the conda environment activated (step 2 of the previous section)
- Frontend:
   - `npm start`
- Backend:
   - `cd api`
   - `flask run --no-debugger -h localhost -p 5001`

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
  - `data_raw/`
     - `RiskFinal_DATA_2024-02-05_0017_combined.csv`: Final raw survey data from CloudResearch provided by Virginia Mason Spinal Research Team
     - `nc-est2022-agesex.xlsx`: Census data from [census.gov](https://www.census.gov/data/tables/time-series/demo/popest/2020s-national-detail.html)
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

1. conda create -n vm-spinal-risk python=3.8.18 -y
2. conda activate vm-spinal-risk
3. git clone https://github.com/evanyfyip/vm-spinal-risk.git
Use ssh if you have an ssh key set up: git clone git@github.com:evanyfyip/vm-spinal-risk.git 
5. cd vm-spinal-risk
6. pip install -r requirements.txt
7. cd risk-web-app
8. npm install


To use the spinal risk assessment model, follow these steps:
### Environment setup
a. Obtain API key from zipcode <br>
   1. Create an account [here](https://app.zipcodebase.com/register) <br>
   2. Generate an API key <br>
   3. Store API key in a .env file in the root directory<br>
      - *Note: Name it ZIPCODE_API_KEY=`your-api-key`*

### Use case 1: Running the web application

### Use case 2: Recreating processed data and ML models
1. **Preprocess Data:**
   - **Note:** If you don't care to recreate the processed data and pipelines, SKIP THIS STEP.
   - This step only needs to be done if you want to recreate the steps to produce `data_processed/all_risk_processed.csv`.
   - Prepare your dataset following the format specified in the `data/` directory. The default file is `RiskFinal_DATA_2024-02-05_0017_combined.csv`
   a. Navigate to `vm-spinal-risk`
      ```bash
      cd vm-spinal-risk
      ```
   b. Run the data_processing.py script
      ```bash
      python utilities/data_processing.py
      ```
      - *Note: If needed you have a new data file (csv) you will need to update the path in the data_procesing.py file*

3. **Aim 1 and Aim 2 Analysis:**
   - You should now have all the data files and packages necessary to run the notebooks in `aim1_exploratory_analysis` and `aim2_risk_score_correlations`
   - Navigate to the normative_odi_eda.ipynb to regenerate plots and tables from Aim1.
   - Navigate to those folders and run the notebooks as desired
  
     *Example: Opening normative_odi_eda.ipynb*
     ```bash
     cd notebooks/aim1_exploratory_analysis
     ```
     ```bash
     jupyter notebook normative_odi_eda.ipnyb
     ```

4. **Aim 3: Predictive modeling**
   - The next step is to process the data for the machine learning models.
  a. Navigate to `aim3_predictive_modeling` folder
  b. Run each of the cells in the step1_ml_data_processing_pipeline.ipynb
      - This will process the data and save the pipeline into a pickle object for later
  c. Run the either the `step2_ml_pipeline_choice_model.ipynb` or the `step2_ml_pipeline_risk_model.ipynb` to recreate ML models
      - This will generate plots and save the trained model into the `data/ml_models` folder
      

## License

This project is licensed under the [MIT License](LICENSE).
