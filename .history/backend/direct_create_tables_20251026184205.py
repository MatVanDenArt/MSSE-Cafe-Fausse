#!/usr/bin/env python3
"""
Directly create tables using SQLAlchemy
"""
import pg8000
from sqlalchemy import create_engine, text

def create_tables_directly():
    try:
        # Create connection string
        connection_string = "postgresql+pg8000://postgres:Cr3ativ3@localhost/Cafe_Fousse_Database"
        
        # Create engine
        engine = create_engine(connection_string)
        
        # Create tables using raw SQL
        with engine.connect() as conn:
            # Start a transaction
            trans = conn.begin()
            
            try:
                # Create customers table
                conn.execute(text("""
                    CREATE TABLE IF NOT EXISTS customers (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(100) NOT NULL,
                        email VARCHAR(120) UNIQUE NOT NULL,
                        phone VARCHAR(20),
                        newsletter_signup BOOLEAN DEFAULT FALSE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );
                """))
                
                # Create reservations table
                conn.execute(text("""
                    CREATE TABLE IF NOT EXISTS reservations (
                        id SERIAL PRIMARY KEY,
                        customer_id INTEGER NOT NULL,
                        time_slot TIMESTAMP NOT NULL,
                        table_number INTEGER NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (customer_id) REFERENCES customers(id)
                    );
                """))
                
                # Commit the transaction
                trans.commit()
                print("✅ Tables created successfully!")
                
                # Verify tables exist
                result = conn.execute(text("""
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public'
                    ORDER BY table_name;
                """))
                
                tables = result.fetchall()
                if tables:
                    print("\n📋 Tables in database:")
                    for table in tables:
                        print(f"  - {table[0]}")
                else:
                    print("❌ No tables found after creation")
                    
            except Exception as e:
                trans.rollback()
                print(f"❌ Error creating tables: {e}")
                raise
                
    except Exception as e:
        print(f"❌ Connection error: {e}")

if __name__ == "__main__":
    print("Creating PostgreSQL tables directly...")
    print("=" * 50)
    create_tables_directly()
