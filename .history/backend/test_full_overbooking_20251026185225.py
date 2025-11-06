#!/usr/bin/env python3
"""
Comprehensive test to verify overbooking prevention by booking all 30 tables
"""

import requests
import json
import time

def test_full_overbooking():
    url = 'http://localhost:5000/api/reservations'
    time_slot = '2025-10-27T20:00:00'  # Use a different time slot
    
    print('🧪 Comprehensive Overbooking Test')
    print('=' * 50)
    print(f'Time Slot: {time_slot}')
    print(f'Target: Book all 30 tables')
    print('=' * 50)
    
    successful_bookings = 0
    blocked_bookings = 0
    
    for i in range(1, 35):  # Try to book 34 times
        data = {
            'customer_name': f'Table Test {i}',
            'email': f'table{i}@test.com',
            'phone': '1234567890',
            'time_slot': time_slot,
            'number_of_guests': 2
        }
        
        try:
            response = requests.post(url, json=data)
            
            if response.status_code in [200, 201]:
                result = response.json()
                successful_bookings += 1
                print(f'✅ Booking {i:2d}: SUCCESS - Table {result["table_number"]:2d}')
            elif response.status_code == 400:
                result = response.json()
                blocked_bookings += 1
                print(f'❌ Booking {i:2d}: BLOCKED - {result["error"]}')
                break
            else:
                print(f'⚠️  Booking {i:2d}: Unexpected status {response.status_code}')
                print(f'    Response: {response.text}')
                break
                
        except Exception as e:
            print(f'💥 Booking {i:2d}: ERROR - {e}')
            break
        
        # Small delay to avoid overwhelming the server
        time.sleep(0.1)
    
    print('=' * 50)
    print(f'📊 FINAL RESULTS:')
    print(f'   Successful Bookings: {successful_bookings}')
    print(f'   Blocked Bookings: {blocked_bookings}')
    print(f'   Total Tables: 30')
    
    if successful_bookings == 30 and blocked_bookings > 0:
        print('✅ OVERBOOKING PREVENTION: WORKING PERFECTLY!')
        print('   ✅ All 30 tables were booked successfully')
        print('   ✅ Additional bookings were blocked')
    elif successful_bookings < 30 and blocked_bookings > 0:
        print('✅ OVERBOOKING PREVENTION: WORKING!')
        print('   ✅ Bookings were blocked at the right time')
    else:
        print('❌ OVERBOOKING PREVENTION: NEEDS INVESTIGATION')
        print(f'   Expected: 30 successful + some blocked')
        print(f'   Actual: {successful_bookings} successful + {blocked_bookings} blocked')

if __name__ == "__main__":
    test_full_overbooking()
