from sklearn.base import BaseEstimator, TransformerMixin
import pandas as pd
import numpy as np

class DropUnbalancedFeatures(BaseEstimator, TransformerMixin):
  """
  Custom scikit-learn transformer to remove features with unbalanced distribution.
  Author: Evan Yip

  Parameters
  ----------
  threshold : float, optional
      The threshold for feature unbalance. Features with a dominant class percentage
      exceeding this threshold will be dropped. Default is 0.9.
  verbose : bool, optional
      If True, print information about the features being removed during fit and
      transformation. Default is True.

  Attributes
  ----------
  threshold : float
      The specified threshold for feature unbalance.
  verbose : bool
      Flag indicating whether to print information during fit and transform.
  columns : list or None
      List of feature names if input data is a DataFrame, otherwise None.
  features_kept : list
      Indices of features kept after applying the unbalance threshold.
  features_dropped : list
      Indices of features dropped after applying the unbalance threshold.

  Methods
  -------
  fit(X, y=None)
      Fit the transformer to the input data, identifying unbalanced features.
  transform(X)
      Transform the input data by keeping only the balanced features.
  get_feature_names_out(input_features=None)
      Return the names of the output features.

  Notes
  -----
  - The transformer identifies features with a dominant class percentage exceeding
    the specified threshold and drops them.
  - The fit method prints information about the removed features if verbose is True.

  Examples
  --------
  >>> transformer = DropUnbalancedFeatures(threshold=0.85, verbose=True)
  >>> X_balanced = transformer.fit_transform(X_unbalanced)
  """
  def __init__(self, threshold=0.9, verbose=True):
    self.threshold = threshold
    self.verbose = verbose
    self.columns = None
    self.features_kept = []
    self.features_dropped = []

  def fit(self, X, y=None):
    if self.verbose:
      print(f"Removing unbalanced features with (threshold={self.threshold})")
    X = X.copy()
    if isinstance(X, pd.DataFrame):
      self.columns = list(X.columns)
    else:
      self.columns = None
    self.features_dropped = []
    for col_idx in range(X.shape[1]):
      counts = np.unique(X.iloc[:, col_idx] if isinstance(X, pd.DataFrame) else X[:, col_idx], return_counts=True)[1]
      percent = counts / counts.sum()

      if (percent > self.threshold).any():
          self.features_dropped.append(col_idx)
      else:
          self.features_kept.append(col_idx)
    if self.verbose:
      print("Parsing complete")
    return self

  def transform(self, X):
    if self.verbose:
      if len(self.features_dropped) > 0:
        print(f"Removed: {self.features_dropped}")
      else:
        print("No features removed")
    return X.iloc[:, self.features_kept] if isinstance(X, pd.DataFrame) else X[:, self.features_kept]

  def get_feature_names_out(self, input_features=None):
    if self.columns is not None:
      output_features = [self.columns[i] for i in self.features_kept]
      return output_features
    else:
      output_features = [input_features[i] for i in self.features_kept]
      return output_features