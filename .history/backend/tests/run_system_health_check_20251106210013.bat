@echo off
echo ========================================
echo  Cafe Fausse - System Health Check Test
echo ========================================
echo.
echo This will run comprehensive tests to verify:
echo - API functionality
echo - Database connectivity
echo - Reservation system
echo - Overbooking prevention
echo.
echo Make sure the Flask backend is running first!
echo.
pause

cd backend\tests
python test._system_health_check.py

echo.
echo ========================================
echo  Test completed!
echo ========================================
pause

