#!/usr/bin/env python3
"""
Simple test to verify overbooking prevention
"""

import requests
import json

def test_overbooking_simple():
    url = 'http://localhost:5000/api/reservations'
    time_slot = '2025-10-27T19:00:00'
    
    print('🧪 Testing Overbooking Prevention')
    print('=' * 40)
    
    # Try to book 5 more times (we already have 3)
    for i in range(1, 6):
        data = {
            'customer_name': f'Overbook Test {i}',
            'email': f'overbook{i}@test.com',
            'phone': '1234567890',
            'time_slot': time_slot,
            'number_of_guests': 2
        }
        
        try:
            response = requests.post(url, json=data)
            result = response.json()
            
            if response.status_code == 200:
                print(f'✅ Booking {i}: SUCCESS - Table {result["table_number"]}')
            else:
                print(f'❌ Booking {i}: BLOCKED - {result["error"]}')
                break
                
        except Exception as e:
            print(f'💥 Booking {i}: ERROR - {e}')
            break
    
    print('=' * 40)
    print('Test completed!')

if __name__ == "__main__":
    test_overbooking_simple()
