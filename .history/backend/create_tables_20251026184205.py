#!/usr/bin/env python3
"""
Create database tables in PostgreSQL
"""
from app import app, db

def create_tables():
    with app.app_context():
        try:
            print("Creating database tables...")
            db.create_all()
            print("✅ Database tables created successfully!")
            
            # Verify tables were created
            from sqlalchemy import text
            result = db.session.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
                ORDER BY table_name;
            """))
            
            tables = result.fetchall()
            if tables:
                print("\n📋 Tables created:")
                for table in tables:
                    print(f"  - {table[0]}")
            else:
                print("❌ No tables found after creation")
                
        except Exception as e:
            print(f"❌ Error creating tables: {e}")

if __name__ == "__main__":
    create_tables()
