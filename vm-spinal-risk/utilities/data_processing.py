import os
import time
import requests

from dotenv import load_dotenv
import numpy as np
import pandas as pd


def filter_df_by_attention_check(data, col_start, col_end, tol):
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
    return subset[result]


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


def get_location_information(df):
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
  df['zip_code'] = df['zip_code'].astype(str).apply(lambda code: code[:-2])

  load_dotenv()
  zipcode_key = os.getenv('ZIPCODE_API_KEY')

  # Extracting the state from the zipcodes
  headers = { 
    "apikey": zipcode_key
  }

  pause_duration = 0.5
  all_results = []
  for code in df['zip_code']:
    params = (
      ("codes",f"{code}"),
      ("country", "US")
    );

    response = requests.get('https://app.zipcodebase.com/api/v1/search', headers=headers, params=params).json()
    if not isinstance(response['results'], list):
      all_results.append(response['results'][code])
    else:
      print(f"Failed to extract zipcode for {code}")

    # Throttling the api
    time.sleep(0.001)

  final_results = [result[0] for result in all_results]
  locations_df = pd.DataFrame(final_results)
  # reduce to only distinct rows
  locations_df = locations_df.drop_duplicates().reset_index().drop(columns='index')

  # joining dataframes
  relevant_cols = ['postal_code', 'city', 'state', 'state_code', 'province', 'province_code', 'latitude', 'longitude']
  odi_loc_df = df.merge(locations_df[relevant_cols], how='left', left_on='zip_code', right_on='postal_code')
  return odi_loc_df


def main():
    # Loading the data
    odi_df = pd.read_csv('./data/NormativeODI_DATA_2024-01-04_1611.csv')

    # Transforming features
    odi_df['height_m'] = odi_df.height.apply(lambda h: get_height_value(value=h, unit='metric'))/100
    odi_df['weight_kg'] = odi_df.weight_in_pounds.apply(lambda h: get_weight_value(value=h, unit='metric'))
    odi_df['bmi'] = odi_df[['height_m', 'weight_kg']].apply(lambda row: compute_bmi(row.height_m, row.weight_kg), axis=1)
    odi_df = get_age_ranges(odi_df, age_column='age')
    odi_df = get_odi_score(odi_df)
    odi_df = get_location_information(odi_df)

    # Renaming columns
    odi_df = odi_df.rename(columns={"how_physically_demanding_i": "occupation_demands", "have_you_ever_experienced": "lbp", "how_have_you_addressed_add": "lbp_treatment"})
    odi_df = odi_df.drop(columns=['redcap_survey_identifier', 'assessment_of_back_pain_in_people_who_never_had_sp_timestamp'])
    odi_df.to_csv('./data/normative_odi_processed.csv', index=False)

if __name__ == "__main__":
    main()