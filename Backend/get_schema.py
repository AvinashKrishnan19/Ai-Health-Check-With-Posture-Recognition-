import pymysql
import os

def get_schema():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    output_file = os.path.join(base_dir, "db_schema_output.txt")
    
    try:
        conn = pymysql.connect(
            host="localhost",
            user="root",
            password="PASSWORD",
            database="ai_health"
        )
        cur = conn.cursor()
        
        with open(output_file, "w") as f:
            for table in ['user', 'user_data']:
                f.write(f"\n--- Table: {table} ---\n")
                cur.execute(f"DESCRIBE {table}")
                for col in cur.fetchall():
                    f.write(f"{col}\n")
                    
        conn.close()
        print(f"Schema saved to {output_file}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    get_schema()
