@echo off
echo ========================================
echo  Cafe Fausse - Demo Test Suite
echo ========================================
echo.
echo This will run comprehensive tests to demonstrate:
echo - API functionality
echo - Database connectivity
echo - Reservation system
echo - Overbooking prevention
echo.
echo Make sure the Flask backend is running first!
echo.
pause

cd backend
python demo_tests.py

echo.
echo ========================================
echo  Demo completed!
echo ========================================
pause
