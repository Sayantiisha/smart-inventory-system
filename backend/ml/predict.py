
import joblib
import pandas as pd

# Load Model & Encoder
model = joblib.load("saved_models/inventory_prediction_model.pkl")
encoder = joblib.load("saved_models/category_encoder.pkl")

print("Model Loaded Successfully.")

CATEGORY_ALIASES = {
    "stationary": "stationery",
}


def resolve_category_name(category: str):
    normalized = category.strip().lower()
    normalized = CATEGORY_ALIASES.get(normalized, normalized)

    category_map = {cls.lower(): cls for cls in encoder.classes_}
    if normalized not in category_map:
        return None

    return category_map[normalized]


def predict_sales():

    # User Input
    category = input("Enter Category: ").strip()
    unit_price = float(input("Enter Unit Price: "))
    quantity = int(input("Enter Quantity: "))
    month = int(input("Enter Month (1-12): "))

    # Input Validation
    if unit_price <= 0:
        print("Price must be greater than 0.")
        return

    if quantity < 0:
        print("Quantity cannot be negative.")
        return

    if month < 1 or month > 12:
        print("Month must be between 1 and 12.")
        return

    # Encode Category
    resolved_category = resolve_category_name(category)
    if resolved_category is None:
        print("\nInvalid Category!")
        print("Available Categories:", list(encoder.classes_))
        return

    try:
        category_encoded = encoder.transform([resolved_category])[0]
    except ValueError:
        print("\nInvalid Category!")
        print("Available Categories:", list(encoder.classes_))
        return

    # Create DataFrame
    input_data = pd.DataFrame({
        "category": [category_encoded],
        "unit_price": [unit_price],
        "quantity": [quantity],
        "month": [month]
    })

    # Prediction
    prediction = model.predict(input_data)
    predicted_sales = round(prediction[0])

    print("\n==== Prediction Result ====")
    print(f"Predicted Sales: {predicted_sales} Units")

    # Recommendation
    if predicted_sales >= 15:
        print("Recommendation: High Demand")
        print("Increase Inventory Stock")

    elif predicted_sales >= 8:
        print("Recommendation: Medium Demand")
        print("Maintain Current Stock")

    else:
        print("Recommendation: Low Demand")
        print("Avoid Overstocking")


if __name__ == "__main__":
    predict_sales()