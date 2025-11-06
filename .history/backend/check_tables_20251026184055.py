#!/usr/bin/env python3
"""
Check if database tables exist in PostgreSQL
"""
import pg8000
from sqlalchemy import create_engine, text

def check_tables():
    try:
        # Create connection string
        connection_string = "postgresql+pg8000://postgres:Cr3ativ3@localhost/Cafe_Fousse_Database"
        
        # Create engine
        engine = create_engine(connection_string)
        
        # Connect and check tables
        with engine.connect() as conn:
            # Check if tables exist
            result = conn.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
                ORDER BY table_name;
            """))
            
            tables = result.fetchall()
            
            if tables:
                print("✅ Database tables found:")
                for table in tables:
                    print(f"  - {table[0]}")
            else:
                print("❌ No tables found in the database")
                
            # Check table structure for each table
            for table in tables:
                table_name = table[0]
                print(f"\n📋 Structure of table '{table_name}':")
                
                columns_result = conn.execute(text(f"""
                    SELECT column_name, data_type, is_nullable, column_default
                    FROM information_schema.columns 
                    WHERE table_name = '{table_name}'
                    ORDER BY ordinal_position;
                """))
                
                columns = columns_result.fetchall()
                for col in columns:
                    nullable = "NULL" if col[2] == "YES" else "NOT NULL"
                    default = f" DEFAULT {col[3]}" if col[3] else ""
                    print(f"  - {col[0]}: {col[1]} {nullable}{default}")
                    
    except Exception as e:
        print(f"❌ Error checking tables: {e}")

if __name__ == "__main__":
    print("Checking PostgreSQL database tables...")
    print("=" * 50)
    check_tables()
