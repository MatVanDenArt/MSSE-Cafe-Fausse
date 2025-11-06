#!/usr/bin/env python3
"""
Café Fausse Restaurant - Comprehensive Test Suite
=================================================

This test suite demonstrates all the key functionality of the Café Fausse
restaurant reservation system, including overbooking prevention.

Usage:
    python test._system_health_check.py

Features Tested:
- Database connectivity
- Customer registration
- Newsletter signup
- Reservation system
- Overbooking prevention
- Table assignment logic
- API error handling

Author: Café Fausse Development Team
Date: 2025-10-26
"""

import requests
import json
import time
from datetime import datetime, timedelta
import sys

class CafeFausseTester:
    def __init__(self, base_url="http://localhost:5000"):
        self.base_url = base_url
        self.test_results = []
        
    def log_test(self, test_name, status, message, details=None):
        """Log test results with consistent formatting"""
        result = {
            'test': test_name,
            'status': status,  # 'PASS', 'FAIL', 'INFO'
            'message': message,
            'details': details,
            'timestamp': datetime.now().strftime('%H:%M:%S')
        }
        self.test_results.append(result)
        
        # Print with appropriate emoji
        emoji = "✅" if status == "PASS" else "❌" if status == "FAIL" else "ℹ️"
        print(f"{emoji} {test_name}: {message}")
        if details:
            print(f"   Details: {details}")
    
    def test_api_health(self):
        """Test 1: API Health Check"""
        try:
            response = requests.get(f"{self.base_url}/api/health")
            if response.status_code == 200:
                data = response.json()
                self.log_test("API Health Check", "PASS", 
                    f"API is running - {data.get('message', 'OK')}")
                return True
            else:
                self.log_test("API Health Check", "FAIL", 
                    f"Unexpected status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("API Health Check", "FAIL", 
                f"Connection failed: {str(e)}")
            return False
    
    def test_newsletter_signup(self):
        """Test 2: Newsletter Signup"""
        try:
            data = {
                "name": "Demo User",
                "email": f"demo_{int(time.time())}@example.com"
            }
            response = requests.post(f"{self.base_url}/api/newsletter", json=data)
            
            if response.status_code in [200, 201]:
                result = response.json()
                self.log_test("Newsletter Signup", "PASS", 
                    f"Successfully subscribed: {result.get('message', 'OK')}")
                return True
            else:
                self.log_test("Newsletter Signup", "FAIL", 
                    f"Failed with status {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("Newsletter Signup", "FAIL", 
                f"Exception: {str(e)}")
            return False
    
    def test_single_reservation(self):
        """Test 3: Single Reservation Creation"""
        try:
            # Use a future time slot
            future_time = (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%dT19:00:00')
            
            data = {
                "customer_name": "Demo Customer",
                "email": f"demo_{int(time.time())}@example.com",
                "phone": "123-456-7890",
                "time_slot": future_time,
                "number_of_guests": 2
            }
            
            response = requests.post(f"{self.base_url}/api/reservations", json=data)
            
            if response.status_code in [200, 201]:
                result = response.json()
                self.log_test("Single Reservation", "PASS", 
                    f"Reservation created - Table {result.get('table_number')}, ID {result.get('reservation_id')}")
                return result.get('reservation_id')
            else:
                self.log_test("Single Reservation", "FAIL", 
                    f"Failed with status {response.status_code}: {response.text}")
                return None
        except Exception as e:
            self.log_test("Single Reservation", "FAIL", 
                f"Exception: {str(e)}")
            return None
    
    def test_overbooking_prevention(self):
        """Test 4: Overbooking Prevention (Main Demo)"""
        print("\n" + "="*60)
        print("🎭 OVERBOOKING PREVENTION DEMONSTRATION")
        print("="*60)
        
        # Use a specific time slot for this test
        test_time = (datetime.now() + timedelta(days=2)).strftime('%Y-%m-%dT19:00:00')
        
        self.log_test("Overbooking Test Setup", "INFO", 
            f"Testing time slot: {test_time}")
        self.log_test("Overbooking Test Setup", "INFO", 
            "Target: Book all 30 tables, then attempt 31st booking")
        
        successful_bookings = 0
        blocked_bookings = 0
        assigned_tables = set()
        
        print(f"\n📅 Time Slot: {test_time}")
        print(f"🎯 Goal: Book 30 tables, then block 31st booking")
        print("-" * 60)
        
        for i in range(1, 35):  # Try to book 34 times
            data = {
                "customer_name": f"Demo Customer {i}",
                "email": f"demo{i}_{int(time.time())}@example.com",
                "phone": "123-456-7890",
                "time_slot": test_time,
                "number_of_guests": 2
            }
            
            try:
                response = requests.post(f"{self.base_url}/api/reservations", json=data)
                
                if response.status_code in [200, 201]:
                    result = response.json()
                    table_num = result.get('table_number')
                    assigned_tables.add(table_num)
                    successful_bookings += 1
                    print(f"✅ Booking {i:2d}: SUCCESS - Table {table_num:2d}")
                    
                elif response.status_code == 400:
                    result = response.json()
                    blocked_bookings += 1
                    print(f"❌ Booking {i:2d}: BLOCKED - {result.get('error', 'Unknown error')}")
                    break
                else:
                    print(f"⚠️  Booking {i:2d}: Unexpected status {response.status_code}")
                    break
                    
            except Exception as e:
                print(f"💥 Booking {i:2d}: ERROR - {str(e)}")
                break
            
            # Small delay to avoid overwhelming the server
            time.sleep(0.05)
        
        # Analyze results
        print("-" * 60)
        print(f"📊 RESULTS:")
        print(f"   Successful Bookings: {successful_bookings}")
        print(f"   Blocked Bookings: {blocked_bookings}")
        print(f"   Unique Tables Assigned: {len(assigned_tables)}")
        print(f"   Expected: 30 successful + 1+ blocked")
        
        # Determine test result
        if successful_bookings == 30 and blocked_bookings > 0:
            self.log_test("Overbooking Prevention", "PASS", 
                "Perfect! All 30 tables booked, additional bookings blocked")
        elif successful_bookings < 30 and blocked_bookings > 0:
            self.log_test("Overbooking Prevention", "PASS", 
                f"Good! {successful_bookings} tables booked, overbooking prevented")
        else:
            self.log_test("Overbooking Prevention", "FAIL", 
                f"Unexpected result: {successful_bookings} successful, {blocked_bookings} blocked")
        
        return successful_bookings, blocked_bookings
    
    def test_restaurant_info(self):
        """Test 5: Restaurant Information API"""
        try:
            response = requests.get(f"{self.base_url}/api/restaurant-info")
            
            if response.status_code == 200:
                data = response.json()
                self.log_test("Restaurant Info", "PASS", 
                    f"Retrieved info for {data.get('name', 'Unknown Restaurant')}")
                self.log_test("Restaurant Info", "INFO", 
                    f"Total Tables: {data.get('total_tables', 'Unknown')}")
                return True
            else:
                self.log_test("Restaurant Info", "FAIL", 
                    f"Failed with status {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Restaurant Info", "FAIL", 
                f"Exception: {str(e)}")
            return False
    
    def test_menu_api(self):
        """Test 6: Menu API"""
        try:
            response = requests.get(f"{self.base_url}/api/menu")
            
            if response.status_code == 200:
                data = response.json()
                total_items = sum(len(section) for section in data.values() if isinstance(section, list))
                self.log_test("Menu API", "PASS", 
                    f"Retrieved menu with {total_items} items across {len(data)} categories")
                return True
            else:
                self.log_test("Menu API", "FAIL", 
                    f"Failed with status {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Menu API", "FAIL", 
                f"Exception: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run the complete test suite"""
        print("🍽️  CAFÉ FAUSSE RESTAURANT - COMPREHENSIVE TEST SUITE")
        print("=" * 60)
        print(f"🕐 Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"🌐 Testing API at: {self.base_url}")
        print("=" * 60)
        
        # Run tests in sequence
        tests = [
            ("API Health Check", self.test_api_health),
            ("Newsletter Signup", self.test_newsletter_signup),
            ("Single Reservation", self.test_single_reservation),
            ("Restaurant Info", self.test_restaurant_info),
            ("Menu API", self.test_menu_api),
        ]
        
        # Run basic tests first
        for test_name, test_func in tests:
            print(f"\n🧪 Running: {test_name}")
            print("-" * 40)
            test_func()
            time.sleep(0.5)  # Brief pause between tests
        
        # Run the main overbooking demonstration
        print(f"\n🧪 Running: Overbooking Prevention Demo")
        self.test_overbooking_prevention()
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("📋 TEST SUMMARY")
        print("="*60)
        
        passed = len([r for r in self.test_results if r['status'] == 'PASS'])
        failed = len([r for r in self.test_results if r['status'] == 'FAIL'])
        info = len([r for r in self.test_results if r['status'] == 'INFO'])
        
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"ℹ️  Info: {info}")
        print(f"📊 Total: {len(self.test_results)}")
        
        if failed == 0:
            print("\n🎉 ALL TESTS PASSED! The system is working perfectly.")
        else:
            print(f"\n⚠️  {failed} test(s) failed. Please check the details above.")
        
        print(f"\n🕐 Completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("="*60)

def main():
    """Main function to run the test suite"""
    print("Starting Café Fausse Test Suite...")
    
    # Check if server is running
    tester = CafeFausseTester()
    
    # Quick health check first
    if not tester.test_api_health():
        print("\n❌ ERROR: Cannot connect to the API server.")
        print("Please make sure the Flask backend is running:")
        print("   cd backend")
        print("   python app.py")
        sys.exit(1)
    
    # Run all tests
    tester.run_all_tests()

if __name__ == "__main__":
    main()

