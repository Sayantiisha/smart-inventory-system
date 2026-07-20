# import joblib
# import os
# from sklearn.preprocessing import LabelEncoder

# encoder = LabelEncoder()

# from train_linear_regression import train_linear_regression
# from train_decision_tree import train_decision_tree
# from train_random_forest import train_random_forest


# print("=" * 50)
# print("Inventory Sales Prediction Training")
# print("=" * 50)


# lr_model, linear_r2 = train_linear_regression()
# dt_model, dt_r2 = train_decision_tree()
# rf_model, rf_r2 = train_random_forest()

# scores = {
#     "Linear Regression": linear_r2,
#     "Decision Tree": dt_r2,
#     "Random Forest": rf_r2,
    
# }

# best_model = max(scores, key=scores.get)

# print("========== Model Comparison ==========")

# for name, score in scores.items():
#     print(f"{name:25} R² = {score:.4f}")

# print("Best Model :", best_model)
# print("Best R² Score :", scores[best_model])



# os.makedirs("Saved_models", exist_ok=True)

# joblib.dump(
#     dt_model,
#     "saved_models/inventory_prediction_model.pkl"
# )

# #Save Encoder
# joblib.dump(
#     encoder,
#     "saved_models/category_encoder.pkl"

# )

# print("Best Model Saved Successfully.")
# print("Encoder Saved Successfully.")


from feature_engeneering import encoder

from train_linear_regression import train_linear_regression
from train_decision_tree import train_decision_tree
from train_random_forest import train_random_forest

import joblib
import os

print("=" * 50)
print("Inventory Sales Prediction Training")
print("=" * 50)

lr_model, linear_r2 = train_linear_regression()
dt_model, dt_r2 = train_decision_tree()
rf_model, rf_r2 = train_random_forest()

scores = {
    "Linear Regression": linear_r2,
    "Decision Tree": dt_r2,
    "Random Forest": rf_r2,
}

best_model = max(scores, key=scores.get)

print("========== Model Comparison ==========")

for name, score in scores.items():
    print(f"{name:25} R² = {score:.4f}")

print(f"\nBest Model : {best_model}")
print(f"Best R² Score : {scores[best_model]:.4f}")

if best_model == "Linear Regression":
    model_to_save = lr_model
elif best_model == "Decision Tree":
    model_to_save = dt_model
else:
    model_to_save = rf_model

os.makedirs("saved_models", exist_ok=True)

joblib.dump(model_to_save, "saved_models/inventory_prediction_model.pkl")
joblib.dump(encoder, "saved_models/category_encoder.pkl")

print("Best Model Saved Successfully.")
print("Encoder Saved Successfully.")