#!/usr/bin/env python3
"""
Script to view data from the Café Fausse PostgreSQL database
"""

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql+pg8000://postgres:Cr3ativ3@localhost/Cafe_Fousse_Database')

def view_database_data():
    print("🍽️  Café Fausse Database Data Viewer")
    print("=" * 50)
    
    try:
        engine = create_engine(DATABASE_URL)
        
        with engine.connect() as connection:
            # View Customers table
            print("\n📋 CUSTOMERS TABLE:")
            print("-" * 30)
            result = connection.execute(text("SELECT * FROM customers ORDER BY created_at DESC"))
            customers = result.fetchall()
            
            if customers:
                for customer in customers:
                    print(f"ID: {customer[0]}")
                    print(f"Name: {customer[1]}")
                    print(f"Email: {customer[2]}")
                    print(f"Phone: {customer[3] or 'Not provided'}")
                    print(f"Newsletter: {'Yes' if customer[4] else 'No'}")
                    print(f"Created: {customer[5]}")
                    print("-" * 30)
            else:
                print("No customers found.")
            
            # View Reservations table
            print("\n📅 RESERVATIONS TABLE:")
            print("-" * 30)
            result = connection.execute(text("""
                SELECT r.id, r.time_slot, r.table_number, r.created_at, c.name, c.email
                FROM reservations r
                JOIN customers c ON r.customer_id = c.id
                ORDER BY r.time_slot DESC
            """))
            reservations = result.fetchall()
            
            if reservations:
                for reservation in reservations:
                    print(f"Reservation ID: {reservation[0]}")
                    print(f"Customer: {reservation[4]} ({reservation[5]})")
                    print(f"Date & Time: {reservation[1]}")
                    print(f"Table Number: {reservation[2]}")
                    print(f"Created: {reservation[3]}")
                    print("-" * 30)
            else:
                print("No reservations found.")
            
            # Summary statistics
            print("\n📊 SUMMARY:")
            print("-" * 30)
            
            # Count customers
            result = connection.execute(text("SELECT COUNT(*) FROM customers"))
            customer_count = result.scalar()
            print(f"Total Customers: {customer_count}")
            
            # Count reservations
            result = connection.execute(text("SELECT COUNT(*) FROM reservations"))
            reservation_count = result.scalar()
            print(f"Total Reservations: {reservation_count}")
            
            # Count newsletter subscribers
            result = connection.execute(text("SELECT COUNT(*) FROM customers WHERE newsletter_signup = true"))
            newsletter_count = result.scalar()
            print(f"Newsletter Subscribers: {newsletter_count}")
            
            # Next upcoming reservation
            result = connection.execute(text("""
                SELECT r.time_slot, c.name, r.table_number
                FROM reservations r
                JOIN customers c ON r.customer_id = c.id
                WHERE r.time_slot > NOW()
                ORDER BY r.time_slot ASC
                LIMIT 1
            """))
            next_reservation = result.fetchone()
            
            if next_reservation:
                print(f"Next Reservation: {next_reservation[1]} on {next_reservation[0]} (Table {next_reservation[2]})")
            else:
                print("No upcoming reservations.")
                
    except OperationalError as e:
        print(f"❌ Database connection failed: {e.orig.args[0]}")
    except Exception as e:
        print(f"❌ An error occurred: {e}")

if __name__ == "__main__":
    view_database_data()
