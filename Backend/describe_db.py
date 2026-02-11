import pymysql

def describe_tables():
    try:
        conn = pymysql.connect(
            host="localhost",
            user="root",
            password="Your Password",
            database="ai_health"
        )
        cur = conn.cursor()
        
        for table in ['user', 'user_data']:
            print(f"\n--- Description of table '{table}' ---")
            cur.execute(f"DESCRIBE {table}")
            for col in cur.fetchall():
                print(col)
                
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    describe_tables()
