import os
import time
import requests
import re
import numpy as np
import pandas as pd
from tqdm import tqdm
import pickle
import json
from sklearn.preprocessing import PolynomialFeatures

from dotenv import load_dotenv

def filter_df_by_attention_check(data, col_start, col_end, tol, remove=False):
    """
    Filter a pandas data frame of survey responses for rows where the attention check is passed.

    args:
        data: pd.DataFrame
            Survey responses. Columns may vary.
        col_start: int
            The column index where the attention check question starts.
        col_end: int 
            The column index where the attention check question ends.
        tol: int
            The exact number of choices that must be selected to pass the attention check
    """

    subset = data.iloc[:, col_start:col_end]
    result = (subset == 1).sum(axis=1) == tol
    print(f"{result.mean()*100:.2f} percent of responses passed the attention check.")
    if remove:
        return subset[result]
    else:
        data['pass_att_check'] = result
        return data


height_registry = {
# 0: [< "4'0", "four feet", <121.92],
1: ["4'1", "four feet, one inch", 124.46],
2: ["4'2", "four feet, two inches", 126.99],
3: ["4'3", "four feet, three inches", 129.54],
4: ["4'4", "four feet, four inches", 132.08],
5: ["4'5", "four feet, five inches", 134.62],
6: ["4'6", "four feet, six inches", 137.16],
7: ["4'7", "four feet, seven inches", 139.70],
8: ["4'8", "four feet, eight inches", 142.24],
9: ["4'9", "four feet, nine inches", 144.78],
10: ["4'10", "four feet, ten inches", 147.32],
11: ["4'11", "four feet, eleven inches", 149.86],
12: ["5'0", "five feet", 152.40],
13: ["5'1", "five feet, one inch", 154.94],
14: ["5'2", "five feet, two inches", 157.48],
15: ["5'3", "five feet, three inches", 160.02],
16: ["5'4", "five feet, four inches", 162.56],
17: ["5'5", "five feet, five inches", 165.10],
18: ["5'6", "five feet, six inches", 167.64],
19: ["5'7", "five feet, seven inches", 170.18],
20: ["5'8", "five feet, eight inches", 172.72],
21: ["5'9", "five feet, nine inches", 175.26],
22: ["5'10", "five feet, ten inches", 177.80],
23: ["5'11", "five feet, eleven inches", 180.34],
24: ["6'0", "six feet", 182.88],
25: ["6'1", "six feet, one inch", 185.42],
26: ["6'2", "six feet, two inches", 187.96],
27: ["6'3", "six feet, three inches", 190.50],
28: ["6'4", "six feet, four inches", 193.04],
29: ["6'5", "six feet, five inches", 195.58],
30: ["6'6", "six feet, six inches", 198.12],
31: ["6'7", "six feet, seven inches", 200.66],
32: ["6'8", "six feet, eight inches", 203.20],
33: ["6'9", "six feet, nine inches", 205.74],
34: ["6'10", "six feet, ten inches", 208.28],
35: ["6'11", "six feet, eleven inches", 210.82],
36: ["7'0", "seven feet", 213.36],
# 37: [>"7'0" (seven feet", >213.36],
}

def get_height_value(value, registry=height_registry, unit='metric'):
    try:
        if unit == 'metric':
            return registry[value][2]
        elif unit == 'imperial':
            return registry[value][0]
        else:
            raise ValueError("Invalid unit. Supported units are 'metric' and 'imperial'.")
    except KeyError as ke:
        raise KeyError(f"Value '{value}' not found in the height registry. Please provide a valid value.") from ke
    except Exception as e:
        raise Exception(f"An unexpected error occurred: {e}")
    
def get_weight_value(value, unit='metric', starting_value=90):
    weight = value + starting_value
    try:
        if unit == 'metric':
            return weight*0.453592 # Converting to kg
        elif unit == 'imperial':
            return weight
        else:
            raise ValueError("Invalid unit. Supported units are 'metric' and 'imperial'")
    except Exception as e:
        raise Exception(f"An unexpected error occured: {e}")

def compute_bmi(height, weight):
    """
    Computes bmi based on height (m) and weight (kg)
    https://www.cdc.gov/nccdphp/dnpao/growthcharts/training/bmiage/page5_1.html#:~:text=With%20the%20metric%20system%2C%20the,by%2010%2C000%2C%20can%20be%20used.
    """
    return weight / (height **2)

def get_age_ranges(df, age_column):
    df = df.copy()
    age = df[age_column]
    # Define conditions
    conditions = [
        age < 20,
        (20 <= age) & (age < 30),
        (30 <= age) & (age < 40),
        (40 <= age) & (age < 50),
        (50 <= age) & (age < 60),
        (60 <= age) & (age < 70),
        (70 <= age) & (age < 80),
        (80 <= age)
    ]

    # Define corresponding values for each condition
    result_values = [
        "<20",
        "20-30",
        "30-40",
        "40-50",
        "50-60",
        "60-70",
        "70-80",
        "80+"
    ]

    # Apply conditions using numpy.select
    df['age_range'] = np.select(conditions, result_values, default=0)
    return df

def get_odi_score(df):
    """Uses the odi_ columns to compute the odi_score
    Returns the dataframe with the odi score
    """
    final_df = df.copy()
    odi_df = final_df.filter(regex='odi_\d+')
    odi_scores = (odi_df.sum(axis=1) - 1) / 50 * 100
    final_df['odi_final'] = odi_scores
    return final_df


def get_location_information(df, zipcode_col='zipcode'):
  """Using `zip_code` column in dataframe
  pulls 'city', 'state', 'state_code', 'province', 'province_code', 
  'latitude', 'longitude' using the zipcodebase API.

  Parameters
  ----------
  df : pd.DataFrame
      The raw normative ODI dataframe

  Returns
  -------
  pd.DataFrame
      A Pandas DataFrame with the extracted location information.
  """
  # Clean up the zipcode
  df[zipcode_col] = df[zipcode_col].astype(str)

  # Pad zipcodes with 0's in the front
  zip_code_padded = []
  for zip_code in df[zipcode_col]:
      if len(zip_code) <= 5:
          # Pad it
          zip_code = (5 - len(zip_code))*"0" + zip_code
          zip_code_padded.append(zip_code)
      else:
          zip_code_padded.append(zip_code)
  df[zipcode_col] = zip_code_padded
          

  load_dotenv()
  zipcode_key = os.getenv('ZIPCODE_API_KEY')

  # Extracting the state from the zipcodes
  headers = { 
    "apikey": zipcode_key
  }

#   pause_duration = 0.5
  all_results = []
  print('Extracting latitude and longitude information.')
  for code in tqdm(df[zipcode_col]):
    params = (
      ("codes",f"{code}"),
      ("country", "US")
    )

    response = requests.get('https://app.zipcodebase.com/api/v1/search', headers=headers, params=params).json()
    if not isinstance(response['results'], list):
        all_results.append(response['results'][code])
    else:
        print(f"Failed to extract zipcode for {code}")

    # Throttling the api
    # time.sleep(0.001)

  final_results = [result[0] for result in all_results]
  locations_df = pd.DataFrame(final_results)
  # reduce to only distinct rows
  locations_df = locations_df.drop_duplicates().reset_index().drop(columns='index')

  # joining dataframes
  relevant_cols = ['postal_code', 'city', 'state', 'state_code', 'province', 'province_code', 'latitude', 'longitude']
  odi_loc_df = df.merge(locations_df[relevant_cols], how='left', left_on=zipcode_col, right_on='postal_code')
  return odi_loc_df

dospert_registry = {
    "ethical": [6, 9, 10, 16, 29, 30],
    "financial": [12, 4, 18, 3, 14, 8],
    "health/safety": [5, 15, 17, 20, 23, 26],
    "recreational": [2, 11, 13, 19, 24, 25],
    "social": [1, 7, 21, 22, 27, 28]
    }

def get_dospert_scores(df: pd.DataFrame, idx_start: int) -> pd.DataFrame:
    """
    args:
        df (pd.DataFrame): dataframe of survey responses to the survey
        idx_start (int): index of the column where the DOSPERT questions start

    returns:
        pd.DataFrame - cleaned dataframe with the dospert subscale scores of each response
    """

    # obtain the sum for each dospert subscale
    for category, idx_list in dospert_registry.items():
        subscale_name = "dospert_" + category
        dospert_cols = ['dospert' + str(num) for num in dospert_registry[category]]
        df[subscale_name] = df[dospert_cols].sum(axis = 1)
                
    # drop the original dospert columns since we do not need them anymore
    result = df.drop(df.iloc[:, idx_start:idx_start + 30], axis = 1)
    return result
  
  
def get_fips_from_lat_lon(df):
    """
    Retrieves FIPS codes for given latitude and longitude coordinates using the FCC Geo API.

    Parameters:
    - df (pandas.DataFrame): DataFrame containing 'latitude' and 'longitude' columns.

    Returns:
    - List[str]: List of FIPS codes corresponding to the input coordinates.
    """
    all_results = []
    print('Extracting FIPS code.')
    for row in tqdm(df[['latitude', 'longitude']].iterrows()):
        params = (
            ("latitude", row[1]['latitude']),
            ("longitude", row[1]['longitude']),
            ("censusYear", "2020"),
            ("format", "json")
        )
        response = requests.get('https://geo.fcc.gov/api/census/block/find', params=params).json()

        if response['status'] == 'OK':
            all_results.append(response['Block']['FIPS'])
        else:
            all_results.append(None)
            print(f"Failed to extract FIPS")
    fips12 = []
    for result in all_results:
        if result is not None:
            result = result.strip()
            fips12.append(result[:-3])
        else:
            fips12.append('')
    return fips12

def get_adi_score(df):
    """
    Adds ADI (Area Deprivation Index) scores to a DataFrame based on FIPS codes.

    Parameters:
    - df (pandas.DataFrame): DataFrame containing 'latitude' and 'longitude' columns.

    Returns:
    - pandas.DataFrame: Original DataFrame with an additional 'adi' column.
    """
    df['fips'] = get_fips_from_lat_lon(df)
    df['fips'] = df['fips'].astype('string')

    adi_df = pd.read_csv('./data/adi-download/US_2021_ADI_Census_Block_Group_v4_0_1.csv', dtype='str')
    # Joining adi to df
    df = df.merge(adi_df, how='left', left_on='fips', right_on='FIPS')
    return df

def get_weights():
    with open('./data/complication_improvement_weights.json', 'r') as f:
        data = json.load(f)
    comp_weights = {'drop': data['drop_to_drop'], 'para': data['para_to_drop'], 'death': data['death_to_drop']}
    improv_weights = {'exer': data['exer_to_work'], 'work': data['work_to_work']}
    return comp_weights, improv_weights

def scale_spinal_risk_score(risk_scores, df):
    comp_weights, improv_weights = get_weights()
    all_combinations = {'comp_type':[], 'comp_level':[], 'improv_type':[], 'improv_level':[]}
    for col in df.columns:
        split_names = col.split("_")
        match_improv = re.search(r'^(\d+)', split_names[1])
        match_comp = re.search(r'^(\d+)(\w+)', split_names[2])
        
        all_combinations['comp_level'].append(match_comp.group(1))
        all_combinations['comp_type'].append(match_comp.group(2))

        all_combinations['improv_level'].append(match_improv.group(1))
        all_combinations['improv_type'].append(split_names[0])
    all_combos_df = pd.DataFrame(all_combinations)

    # risk_score = (comp_type_weight*comp_value - improv_type_weight*improv_value)/option)
    all_combos_df['comp_type_weight'] = \
        np.where(all_combos_df['comp_type'] == 'drop', comp_weights['drop'], 
            np.where(all_combos_df['comp_type'] =='para', comp_weights['para'], 
                    np.where(all_combos_df['comp_type'] == 'death', comp_weights['death'], np.nan)))

    all_combos_df['improv_type_weight'] = \
        np.where(all_combos_df['improv_type'] == 'exer', improv_weights['exer'], 
            np.where(all_combos_df['improv_type'] =='work', improv_weights['work'], np.nan))

    all_combos_df['comp_level'] = all_combos_df['comp_level'].astype(float)
    all_combos_df['improv_level'] = all_combos_df['improv_level'].astype(float)
    all_combos_df['multiplier'] = (all_combos_df['comp_type_weight'] * all_combos_df['comp_level']) - (all_combos_df['improv_type_weight'] * all_combos_df['improv_level'])

    # Computing the min and max possible values for that question, accounting for negative multiplier values
    all_combos_df['min_option_result'] = np.where(all_combos_df['multiplier'] < 0, all_combos_df['multiplier'] / 1, all_combos_df['multiplier'] / 6)
    all_combos_df['max_option_result'] = np.where(all_combos_df['multiplier'] < 0, all_combos_df['multiplier'] / 6, all_combos_df['multiplier'] / 1)

    # Computing the overall max and min risk scores
    risk_min, risk_max = all_combos_df[['min_option_result', 'max_option_result']].sum(axis=0).values
    spinal_risk_scores_scaled = (risk_scores - risk_min) / (risk_max - risk_min)
    return spinal_risk_scores_scaled


def get_spinal_risk_score(df, scale=True):
    comp_weights, improv_weights = get_weights()
    risk_df = df.filter(regex='work_|exer_')

    # Drop uncorrelated questions (Spearman < 0.5):
    # drop_cols = ['exer_50improv_50drop', 'exer_50improv_90drop', 'exer_90improv_90drop',
    #    'exer_50pain_10death', 'exer_50pain_50death', 'exer_90pain_50death',
    #    'work_50improv_50drop', 'work_50improv_90drop', 'work_90improv_50drop',
    #    'work_50improv_50para', 'work_50improv_90para', 'work_90improv_50para',
    #    'work_50improv_50death', 'work_90improv_50death']
    # risk_df = risk_df.drop(columns=drop_cols)

    spinal_risk_list = []
    split_names = risk_df.columns[0].split("_")
    improv_list = []
    comp_list = []
    comp_type = []
    improv_type = []

    for col in risk_df.columns:
        split_names = col.split("_")
        match_improv = re.search(r'^(\d+)', split_names[1])
        match_comp = re.search(r'^(\d+)(\w+)', split_names[2])
        improv_list.append(float(match_improv.group(1)))
        comp_list.append(float(match_comp.group(1)))
        if split_names[0] == 'exer':
            improv_type.append(improv_weights['exer'])
        elif split_names[0] == 'work':
            improv_type.append(improv_weights['work'])
        if match_comp.group(2) == 'drop':
            comp_type.append(comp_weights['drop'])
        elif match_comp.group(2) == 'para':
            comp_type.append(comp_weights['para'])
        else:
            comp_type.append(comp_weights['death'])

    for index, row in risk_df.iterrows():
        spinal_risk_sum = 0 
        for i in range(len(risk_df.columns)):
            # Inverting the options
            option = 6-row[i]
            col_risk = (comp_type[i] * comp_list[i]  - improv_type[i] * improv_list[i]) / option
            spinal_risk_sum += col_risk
        spinal_risk_list.append(spinal_risk_sum)
    
    spinal_risk_scores = np.array(spinal_risk_list)
    final_df = df.copy()
    if scale:
        final_df['spinal_risk_score'] = scale_spinal_risk_score(spinal_risk_scores, risk_df)
    else:
        final_df['spinal_risk_score'] = spinal_risk_scores
    return final_df

def manual_drop_records(df):
    """
    Remove records specified in '../data/manual_record_drop.json' from the DataFrame.

    Parameters
    ----------
    df : pandas.DataFrame
        Input DataFrame.

    Returns
    -------
    pandas.DataFrame
        DataFrame with specified records removed.
    """
    with open('./data/manual_record_drop.json', 'r') as f:
        data = json.load(f)

    df_reset = df.reset_index()
    final_df = df_reset[~df_reset['index'].isin(data['record_indices'])]
    final_df = final_df.reset_index().iloc[:, 2:]
    return final_df


def json_to_df():
    """Takes the json file and loads it into a pandas dataframe"""
    pass

def get_data_features(df):
    """This function expects a pandas dataframe with all of the data features"""
    features_df = get_odi_score(df)
    features_df = get_dospert_scores(df, 60)
    features_df['height_m'] = features_df.height.apply(lambda h: get_height_value(value=h, unit='metric'))/100
    features_df['weight_kg'] = features_df.weight.apply(lambda h: get_weight_value(value=h, unit='metric'))
    features_df['bmi'] = features_df[['height_m', 'weight_kg']].apply(lambda row: compute_bmi(row.height_m, row.weight_kg), axis=1)
    features_df = get_age_ranges(features_df, age_column='age')
    features_df = get_location_information(features_df)
    features_df = get_adi_score(features_df)
    return features_df

def choice_model_prep(df, ml_df):
    """
    df = dataframe of processed patient input
    ml_df = dataframe of processed ml data for risk score model
    """
    risk_df = df[['exer_50improv_1drop', 'exer_50improv_10drop', 'exer_50improv_50drop',
                  'exer_50improv_90drop', 'exer_90improv_1drop', 'exer_90improv_10drop',
                  'exer_90improv_50drop', 'exer_90improv_90drop', 'exer_50pain_1death',
                  'exer_50pain_10death', 'exer_50pain_50death', 'exer_90pain_1death',
                  'exer_90pain_10death', 'exer_90pain_50death', 'work_50improv_1drop',
                  'work_50improv_10drop', 'work_50improv_50drop', 'work_50improv_90drop',
                  'work_90improv_1drop', 'work_90improv_10drop', 'work_90improv_50drop',
                  'work_50improv_1para', 'work_50improv_10para', 'work_50improv_50para',
                  'work_50improv_90para', 'work_90improv_1para', 'work_90improv_10para',
                  'work_90improv_50para', 'work_50improv_1death', 'work_50improv_10death',
                  'work_50improv_50death', 'work_90improv_1death',
                  'work_90improv_10death', 'work_90improv_50death']].copy().reset_index(drop=True)

    data = pd.concat([ml_df, risk_df], axis=1)

    # Fix column names
    cols = list(data.columns)
    new_cols = [re.sub('^[A-z]{3}__', '', c) for c in cols]
    data.columns = new_cols

    # Drop spinal risk score
    data.drop(columns=['spinal_risk_score'], inplace=True, errors='ignore')

    # Reshape from wide to long
    data_long = pd.melt(data,
                        id_vars=['religion_10', 'sex', 'income', 'education', 'prior_surg', 'succ_surg',
                                 'age', 'odi_final', 'bmi', 'dospert_ethical', 'dospert_financial',
                                 'dospert_health/safety', 'dospert_recreational', 'dospert_social',
                                 'height_m', 'weight_kg', 'ADI_NATRANK', 'ADI_STATERNK'],
                        var_name='risk_question', value_name='choice')
    split_df = data_long['risk_question'].str.split('_', expand=True)
    # data_long['choice'] = data_long['choice'] + 1
    data_long['activity'] = split_df[0]
    data_long['pct_improv'] = split_df[1].str.extract(r'(\d{1,})', expand=False)
    data_long['comp'] = split_df[2].str.extract(r'(drop|para|death)', expand=False)
    data_long['pct_comp'] = split_df[2].str.extract(r'(\d{1,})', expand=False)
    for c in ['pct_improv', 'pct_comp']:
        data_long[c] = pd.to_numeric(data_long[c])
    
    ohe_cols = ['activity', 'comp']
    num_cols = ['pct_improv', 'pct_comp']
    
    with open('./data/ml_models/choice_model_preprocessor.pkl', 'rb') as f:
        preprocessor = pickle.load(f)

    preprocessor.fit(data_long)  # Fit the ColumnTransformer to your data
    transformed_columns = preprocessor.get_feature_names_out(input_features=data_long.columns)

    processed = preprocessor.fit_transform(data_long)
    processed_df = pd.DataFrame(processed, columns=transformed_columns)
    cols = list(processed_df.columns)
    new_cols = [re.sub('^[A-z]{3}__', '', c) for c in cols]
    processed_df.columns = new_cols

    drop_cols = ohe_cols + num_cols + ['risk_question']
    data_long.drop(columns=drop_cols, inplace=True)
    model_data = pd.concat([data_long, processed_df], axis=1)

    return model_data


def ml_model_prep(df, model_type):
    """Prepares the data for the ml models
    df = all_risk_processed pandas dataframe.
    """
    # Load the ML data processing pipeline
    with open('./data/ml_models/ml_pipeline.pkl', 'rb') as f:
        ml_data_processor = pickle.load(f)
    ml_df = ml_data_processor.fit(df)
    transformed_columns = ml_data_processor.get_feature_names_out(input_features=df.columns)
    ml_df = pd.DataFrame(ml_df, columns=transformed_columns)

    if model_type == 'choice_model':
        choice_ml_df = choice_model_prep(df, ml_df)
        return choice_ml_df

    # Additional polynomial transformations
    ml_df = PolynomialFeatures(degree=2).fit_transform(ml_df)
    return ml_df


def main():
    # Loading the data
    processed_df = pd.read_csv('./data/RiskFinal_DATA_2024-02-05_0017_combined.csv')
    # Transforming features
    # second argument may change based on how the data looks, respecify the index where the dospert questions start.
    processed_df = get_dospert_scores(processed_df, 60)
    processed_df['height_m'] = processed_df.height.apply(lambda h: get_height_value(value=h, unit='metric'))/100
    processed_df['weight_kg'] = processed_df.weight.apply(lambda h: get_weight_value(value=h, unit='metric'))
    processed_df['bmi'] = processed_df[['height_m', 'weight_kg']].apply(lambda row: compute_bmi(row.height_m, row.weight_kg), axis=1)
    processed_df = get_age_ranges(processed_df, age_column='age')
    processed_df = get_location_information(processed_df)
    processed_df = get_adi_score(processed_df)
    processed_df = get_spinal_risk_score(processed_df)

    # Dropping records based on low variance results
    processed_df = manual_drop_records(processed_df)

    # Write to csv
    processed_df.to_csv('./data/all_risk_processed.csv', index=False)

if __name__ == "__main__":
    main()