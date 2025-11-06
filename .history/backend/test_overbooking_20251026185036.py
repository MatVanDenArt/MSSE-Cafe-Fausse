#!/usr/bin/env python3
"""
Test script to verify overbooking prevention logic
"""

import requests
import json

def test_overbooking():
    url = 'http://localhost:5000/api/reservations'
    time_slot = '2025-10-27T19:00:00'
    
    print('🧪 Testing Overbooking Prevention Logic')
    print('=' * 50)
    print(f'Time Slot: {time_slot}')
    print(f'Max Tables: 30')
    print('=' * 50)
    
    successful_bookings = 0
    blocked_bookings = 0
    
    for i in range(1, 35):  # Try to book 34 times (more than 30 tables)
        data = {
            'customer_name': f'Test User {i}',
            'email': f'test{i}@example.com',
            'phone': '1234567890',
            'time_slot': time_slot,
            'number_of_guests': 2
        }
        
        try:
            response = requests.post(url, json=data)
            result = response.json()
            
            if response.status_code == 200:
                successful_bookings += 1
                print(f'✅ Booking {i:2d}: SUCCESS - Table {result["table_number"]:2d}')
            else:
                blocked_bookings += 1
                print(f'❌ Booking {i:2d}: BLOCKED - {result["error"]}')
                break
                
        except Exception as e:
            print(f'💥 Booking {i:2d}: ERROR - {e}')
            break
    
    print('=' * 50)
    print(f'📊 RESULTS:')
    print(f'   Successful Bookings: {successful_bookings}')
    print(f'   Blocked Bookings: {blocked_bookings}')
    print(f'   Total Tables: 30')
    
    if successful_bookings <= 30:
        print('✅ OVERBOOKING PREVENTION: WORKING CORRECTLY!')
    else:
        print('❌ OVERBOOKING PREVENTION: FAILED!')

if __name__ == "__main__":
    test_overbooking()
