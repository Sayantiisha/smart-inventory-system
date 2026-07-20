from sklearn.model_selection import train_test_split
from feature_engeneering import X, Y

# print(X.head())
# print(Y.head())

# Train-Test Split
X_train, X_test, Y_train, Y_test = train_test_split(
    X,
    Y,
    test_size=0.2,
    random_state=42
)

# Check Shape
print("X Train:", X_train.shape)
print("X Test :", X_test.shape)

print("Y Train:", Y_train.shape)
print("Y Test :", Y_test.shape)

print(X_train.head())
print(Y_train.head())