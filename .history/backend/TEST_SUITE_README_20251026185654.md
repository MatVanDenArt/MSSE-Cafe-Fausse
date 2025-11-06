# Café Fausse - Test Suite Documentation

## Overview
This test suite provides comprehensive testing and demonstration capabilities for the Café Fausse restaurant reservation system.

## Files
- `demo_tests.py` - Main test suite with comprehensive functionality tests
- `run_demo_tests.bat` - Windows batch file to easily run the tests
- `view_data.py` - Script to view current database contents
- `test_overbooking.py` - Simple overbooking prevention test

## Quick Start

### Prerequisites
1. **Flask Backend Running**: Make sure the Flask server is running
   ```bash
   cd backend
   python app.py
   ```

2. **PostgreSQL Database**: Ensure PostgreSQL is running and accessible

### Running the Tests

#### Option 1: Using the Batch File (Windows)
```bash
# From the project root directory
run_demo_tests.bat
```

#### Option 2: Direct Python Execution
```bash
cd backend
python demo_tests.py
```

## Test Coverage

### 1. API Health Check
- Verifies the Flask API is running and responding
- Tests the `/api/health` endpoint

### 2. Newsletter Signup
- Tests customer newsletter subscription
- Verifies database storage of customer data

### 3. Single Reservation
- Creates a test reservation
- Verifies table assignment logic
- Tests database persistence

### 4. Overbooking Prevention (Main Demo)
- **This is the key demonstration feature**
- Attempts to book 34 reservations for the same time slot
- Should successfully book exactly 30 tables
- Should block the 31st+ booking attempts
- Shows table assignment without conflicts

### 5. Restaurant Information
- Tests the `/api/restaurant-info` endpoint
- Verifies restaurant details are returned

### 6. Menu API
- Tests the `/api/menu` endpoint
- Verifies menu data structure

## Expected Results

### Successful Test Run
```
🍽️  CAFÉ FAUSSE RESTAURANT - COMPREHENSIVE TEST SUITE
============================================================
✅ API Health Check: API is running - Café Fausse API is running
✅ Newsletter Signup: Successfully subscribed: Successfully subscribed to newsletter
✅ Single Reservation: Reservation created - Table 15, ID 123
✅ Restaurant Info: Retrieved info for Café Fausse
✅ Menu API: Retrieved menu with 12 items across 4 categories
✅ Overbooking Prevention: Perfect! All 30 tables booked, additional bookings blocked

📋 TEST SUMMARY
============================================================
✅ Passed: 6
❌ Failed: 0
ℹ️  Info: 2
📊 Total: 8

🎉 ALL TESTS PASSED! The system is working perfectly.
```

### Overbooking Prevention Demo
The most impressive part of the demo shows:
- 30 successful table bookings
- 1+ blocked booking attempts
- Clear error message: "This time slot is fully booked. Please choose another time."
- All 30 tables (1-30) assigned without duplicates

## Troubleshooting

### Common Issues

1. **"Cannot connect to API server"**
   - Make sure Flask backend is running: `cd backend && python app.py`
   - Check that port 5000 is not blocked

2. **Database connection errors**
   - Verify PostgreSQL is running
   - Check database credentials in `.env` file
   - Ensure database exists: `Cafe_Fousse_Database`

3. **Tests fail unexpectedly**
   - Check that no other processes are using the same time slots
   - Clear browser cache if testing through the web interface
   - Restart the Flask server if needed

## Customization

### Changing Test Parameters
Edit `demo_tests.py` to modify:
- Test time slots (currently uses future dates)
- Number of overbooking attempts
- Test data (names, emails, etc.)
- API base URL

### Adding New Tests
Add new test methods to the `CafeFausseTester` class:
```python
def test_your_feature(self):
    """Test description"""
    try:
        # Your test code here
        self.log_test("Your Test", "PASS", "Success message")
        return True
    except Exception as e:
        self.log_test("Your Test", "FAIL", f"Error: {str(e)}")
        return False
```

## Database Verification

After running tests, you can verify the data was stored correctly:

```bash
cd backend
python view_data.py
```

This will show:
- All customers in the database
- All reservations with details
- Summary statistics
- Next upcoming reservation

## Performance Notes

- The overbooking test books 30+ reservations quickly
- Small delays (0.05s) are added between requests to avoid overwhelming the server
- Each test uses unique email addresses to avoid conflicts
- Tests use future dates to avoid conflicts with real reservations

## Support

For issues or questions about the test suite:
1. Check the troubleshooting section above
2. Verify all prerequisites are met
3. Check the Flask server logs for errors
4. Ensure PostgreSQL is accessible and has the correct database

---

**Last Updated**: 2025-10-26  
**Version**: 1.0  
**Author**: Café Fausse Development Team
