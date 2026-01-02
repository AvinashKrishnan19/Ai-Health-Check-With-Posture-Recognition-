import pymysql

def check_data():
    try:
        conn = pymysql.connect(
            host="localhost",
            user="root",
            password="PASSWORD",
            database="ai_health"
        )
        cur = conn.cursor(pymysql.cursors.DictCursor)
        
        print("--- Users Table ---")
        cur.execute("SELECT id, username, email FROM user")
        users = cur.fetchall()
        for u in users:
            print(u)
            
        print("\n--- User Data Table ---")
        cur.execute("SELECT * FROM user_data")
        data = cur.fetchall()
        for d in data:
            print(d)
            
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_data()
