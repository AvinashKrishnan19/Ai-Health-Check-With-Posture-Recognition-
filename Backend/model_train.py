import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier

import os

# Load dataset
base_dir = os.path.dirname(os.path.abspath(__file__))
dataset_path = os.path.join(base_dir, "..", "dataset", "health_data.csv")
data = pd.read_csv(dataset_path)

X = data[['sleep','activity','water','screen','mood','bmi','posture_score']]
y = data[['obesity','cardio','hypertension']]

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train model
model = MultiOutputClassifier(
    RandomForestClassifier(n_estimators=200, random_state=42)
)
model.fit(X_scaled, y)

# Save model & scaler
pickle.dump(model, open("health_model.pkl", "wb"))
pickle.dump(scaler, open("scaler.pkl", "wb"))

print(" Model trained & saved successfully")
