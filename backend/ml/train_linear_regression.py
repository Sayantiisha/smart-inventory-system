# import pandas as pd
# import numpy as np

# from sklearn.preprocessing import LabelEncoder
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LinearRegression
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


# # Linear Regression #
# model = LinearRegression()
# model.fit(X_train, Y_train)
# predictions = model.predict(X_test)


# # Result
# print("First 10 Predictions.")
# print(predictions[:10])

# # Actual vs Predicted
# result = pd.DataFrame({
#     "Actual" : Y_test.values,
#     "Predicted" : predictions
# })
# print(result.head(10))


# # MAE
# mae = mean_absolute_error(Y_test, predictions)
# print("MAE :", mae)

# # MSE 
# mse = mean_squared_error(Y_test, predictions)
# print("MSE :" ,mse)

# # RMSE
# rmse = np.sqrt(mse)
# print("RMSE :", rmse )

# # R2 Score
# r2 = r2_score(Y_test, predictions)
# print("R2 Score :" , r2)


from sklearn.linear_model import LinearRegression
from sklearn.metrics import *
import numpy as np

from train_test_split_demo import (
    X_train,
    X_test,
    Y_train,
    Y_test
)



def train_linear_regression():

    lr_model = LinearRegression()

    lr_model.fit(X_train, Y_train)

    predictions = lr_model.predict(X_test)

    lr_mae = mean_absolute_error(Y_test, predictions)
    lr_mse = mean_squared_error(Y_test, predictions)
    lr_rmse = np.sqrt(lr_mse)
    lr_r2 = r2_score(Y_test, predictions)

    print("\n==== Linear Regression Evaluation ====")
    print(f"MAE : {lr_mae:.2f}")
    print(f"MSE : {lr_mse:.2f}")
    print(f"RMSE : {lr_rmse:.2f}")
    print(f"R2 Score : {lr_r2:.2f}")

    return lr_model, lr_r2


if __name__ == "__main__":
    train_linear_regression()