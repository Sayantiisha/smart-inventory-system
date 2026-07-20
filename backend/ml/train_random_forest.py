# import pandas as pd
# import numpy as np

# from sklearn.preprocessing import LabelEncoder
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import  RandomForestRegressor
# from feature_engeneering import df
# from sklearn.metrics import (mean_absolute_error, mean_squared_error, r2_score)


# #  convert sale_date
# df['sale_date'] = pd.to_datetime(df["sale_date"])

# # add new feature
# df["month"] = df["sale_date"].dt.month

# # category Encode
# encoder = LabelEncoder()
# df["category"] = encoder.fit_transform(df ["category"])

# # Final features
# X = df [
#     [
#         "category",
#         "unit_price",
#         "quantity",
#         "month"
#     ]
# ]

# Y = df["quantity_sold"]

# # Train-Test Split
# X_train, X_test, Y_train, Y_test = train_test_split(
#     X,
#     Y,
#     test_size=0.2,
#     random_state=42
# )


# # Random Forest Regressor #

# rf_model = RandomForestRegressor(
#     n_estimators=100,
#     random_state=42
# )


# rf_model.fit(X_train, Y_train)
# rf_predictions = rf_model.predict(X_test)

# rf_mae = mean_absolute_error(Y_test, rf_predictions)
# rf_mse = mean_squared_error(Y_test, rf_predictions)
# rf_rmse = np.sqrt(rf_mse)
# rf_r2 = r2_score(Y_test, rf_predictions)

# print("/n ==== Random Forest Evaluation ====")
# print(f"MAE : {rf_mae:.2f}")
# print(f"MsE : {rf_mse:.2f}")
# print(f"RMSE : {rf_rmse:.2f}")
# print(f"R2 Score : {rf_r2:.2f}")


from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

from train_test_split_demo import (
    X_train,
    X_test,
    Y_train,
    Y_test
)


def train_random_forest():

    rf_model = RandomForestRegressor(
        n_estimators=100,
        random_state=42
    )

    rf_model.fit(X_train, Y_train)

    predictions = rf_model.predict(X_test)

    rf_mae = mean_absolute_error(Y_test, predictions)
    rf_mse = mean_squared_error(Y_test, predictions)
    rf_rmse = np.sqrt(rf_mse)
    rf_r2 = r2_score(Y_test, predictions)

    print("/n==== Random Forest Evaluation ====")
    print(f"MAE : {rf_mae:.2f}")
    print(f"MSE : {rf_mse:.2f}")
    print(f"RMSE : {rf_rmse:.2f}")
    print(f"R2 Score : {rf_r2:.2f}")

    return rf_model, rf_r2

train_random_forest()