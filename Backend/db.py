import pymysql

def get_connection():
    try:
        return pymysql.connect(
            host="localhost",
            user="root",
            password="PASSWORD", # <-- UPDATE THIS with your MySQL password
            database="ai_health",
            connect_timeout=2
        )
    except Exception as e:
        print(f"Database connection failed: {e}")
        return None
