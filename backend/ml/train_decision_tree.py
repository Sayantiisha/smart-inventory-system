# from sklearn.tree import DecisionTreeRegressor
# import pandas as pd
# import numpy as np
# from sklearn.preprocessing import LabelEncoder
# from sklearn.model_selection import train_test_split
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


# dt = DecisionTreeRegressor(random_state=42)

# dt.fit(X_train, Y_train)

# Y_pred = dt.predict(X_test)

# print("\n=== Decision Tree ===")

# print("dt_MAE :", mean_absolute_error(Y_test, Y_pred))
# print("dt_MSE :", mean_squared_error(Y_test, Y_pred))
# print("dt_RMSE :", np.sqrt(mean_squared_error(Y_test, Y_pred)))
# print("dt_R2 :", r2_score(Y_test, Y_pred))


from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

from train_test_split_demo import (
    X_train,
    X_test,
    Y_train,
    Y_test
)


def train_decision_tree():

    dt_model = DecisionTreeRegressor(
        random_state=42
    )

    dt_model.fit(X_train, Y_train)

    predictions = dt_model.predict(X_test)

    dt_mae = mean_absolute_error(Y_test, predictions)
    dt_mse = mean_squared_error(Y_test, predictions)
    dt_rmse = np.sqrt(dt_mse)
    dt_r2 = r2_score(Y_test, predictions)

    print("\n==== Decision Tree Evaluation ====")
    print(f"MAE : {dt_mae:.2f}")
    print(f"MSE : {dt_mse:.2f}")
    print(f"RMSE : {dt_rmse:.2f}")
    print(f"R2 Score : {dt_r2:.2f}")

    return dt_model, dt_r2


train_decision_tree()