import requests
import json

def test_backend():
    url = "http://127.0.0.1:5000"
    print(f"Testing backend at {url}...")
    
    try:
        # Test signup
        signup_data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "password123"
        }
        print("Testing /signup...")
        resp = requests.post(f"{url}/signup", json=signup_data)
        print(f"Signup response: {resp.status_code} - {resp.text}")
        
        # Test login
        login_data = {
            "email": "test@example.com",
            "password": "password123"
        }
        print("Testing /login...")
        resp = requests.post(f"{url}/login", json=login_data)
        print(f"Login response: {resp.status_code} - {resp.text}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_backend()
