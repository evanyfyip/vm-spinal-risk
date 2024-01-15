from IPython.display import HTML
import pandas as pd

def side_by_side(objects):
  """Plot objects side by side"""
  html = '<div style="display:flex">'
  for obj in objects:
    if isinstance(obj, pd.DataFrame):
      obj_html = obj.to_html()
    elif isinstance(obj, str):
      obj_html = obj
    html += '<div style="margin-right: 2em">'
    html += obj_html
    html += '</div>'
  html += '</div>'
  display(HTML(html))

def check_df_unique_vals(df, idx='auto_id', limit=10):
  """Use this method to display side by side
  dataframes of the unique values in the dataframe with counts"""
  if idx == '':
    print("Please provide and index column")
    return
  columns = list(df.columns)
  columns.remove(idx)
  df_list = []
  for col in columns:
    group_df = pd.DataFrame(df[[col, idx]].groupby(col, dropna=False).count())
    group_df = group_df.reset_index()
    group_df.columns = [col, 'count']
    group_df = group_df.sort_values('count', ascending=False).head(limit)
    df_list.append(group_df)
  side_by_side(df_list)

def check_df_missing_vals(df, idx='subject_id', limit=10):
  """
  Use this method to display side by side dataframes of the
  missing and non missing values in each column
  """
  df = df.copy()
  columns = list(df.columns)
  columns.remove(idx)
  df_list = []
  for col in columns:
    df[col] = df[col].replace('', np.nan)
    nan_count = df[col].isna().sum()
    non_nan_count = df[col].isna().count() - nan_count
    nan_df = pd.DataFrame({col:['NaN', 'non-NaN'], 'count':[nan_count, non_nan_count]})
    df_list.append(nan_df)
  side_by_side(df_list)

def convert_cols_to_numeric(df, exclude_cols):
  """Converts columns to numeric. If there is an error
  the value is NaN"""
  df_numeric = df.copy()
  cols = [x for x in list(df.columns) if x not in exclude_cols]
  for col in cols:
    df_numeric[col] = pd.to_numeric(df[col], errors='coerce')
  return df_numeric
