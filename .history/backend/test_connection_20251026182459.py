#!/usr/bin/env python3
"""
Test PostgreSQL connection with different credentials
"""
import pg8000

def test_connection(host, port, database, user, password):
    try:
        conn = pg8000.connect(
            host=host,
            port=port,
            database=database,
            user=user,
            password=password
        )
        print(f"✅ Successfully connected to {database} as {user}")
        
        # Test a simple query
        cursor = conn.cursor()
        cursor.execute("SELECT current_database(), current_user;")
        result = cursor.fetchone()
        print(f"Database: {result[0]}, User: {result[1]}")
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return False

if __name__ == "__main__":
    print("Testing PostgreSQL connection...")
    print("=" * 50)
    
    # Test with your credentials
    test_connection(
        host="localhost",
        port=5432,
        database="Cafe_Fausse_Database", 
        user="postgres",
        password="C3eativ3"
    )
