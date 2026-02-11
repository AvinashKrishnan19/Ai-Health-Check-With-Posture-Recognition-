import pymysql

def check_db():
    print("Attempting to connect to MySQL...")
    try:
        conn = pymysql.connect(
            host="localhost",
            user="root",
            password="Your Password", # Testing with the password the user set
            connect_timeout=2
        )
        print("Success: Connected to MySQL server.")
        
        cur = conn.cursor()
        cur.execute("SHOW DATABASES")
        databases = [db[0] for db in cur.fetchall()]
        print(f"Available databases: {databases}")
        
        if "ai_health" in databases:
            print("Found 'ai_health' database.")
            conn.select_db("ai_health")
            cur.execute("SHOW TABLES")
            tables = [t[0] for t in cur.fetchall()]
            print(f"Tables in 'ai_health': {tables}")
        else:
            print("Error: 'ai_health' database not found. Please run schema.sql.")
            
        conn.close()
    except Exception as e:
        print(f"Connection Failed: {e}")
        print("\nPossible reasons:")
        print("1. MySQL service is not running.")
        print("2. 'root' user password is not 'PASSWORD'.")
        print("3. Database 'ai_health' has not been created.")

if __name__ == "__main__":
    check_db()
