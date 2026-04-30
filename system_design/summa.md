# Navigate to backend (if not already there)
cd app\backend

# Activate
.venv\Scripts\activate

# Install
uv pip install -r requirements.txt

# Run Backend
fastapi dev main.py

# Run Tests (from root folder)
cd ../..
python -m pytest app/testing/test_api.py
