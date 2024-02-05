import os
import time
import requests

import numpy as np
import pandas as pd
from tqdm import tqdm
import json

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

odi_questions = [
    'pain_intensity',
    'personal_care_e_g_washing', 'lifting', 'walking', 'sitting',
    'standing', 'sleeping', 'social_life', 'travelling',
    'employment_homemaking'
]
def get_odi_score(df, odi_cols=odi_questions):
    df = df.copy()
    final_df = df[np.all(df[odi_cols] >= 1, axis=1) & np.all(df[odi_cols] <= 5, axis=1)].copy()
    final_df['odi_score'] = np.sum(final_df[odi_cols], axis=1)
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
        df[subscale_name] = df.iloc[:, [_+idx_start-1 for _ in idx_list]].sum(axis = 1)
                
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

    # Dropping records based on low variance results
    processed_df = manual_drop_records(processed_df)

    # Renaming columns
    processed_df.to_csv('./data/all_risk_processed.csv', index=False)

if __name__ == "__main__":
    main()