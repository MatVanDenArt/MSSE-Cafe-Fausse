@echo off
echo Starting Café Fausse Development Environment...

echo.
echo Starting Flask Backend Server...
cd /d "%~dp0..\backend"
start "Flask Backend" cmd /k "python app.py"

echo.
echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting React Frontend Server...
cd /d "%~dp0..\frontend"
start "React Frontend" cmd /k "npm start"

echo.
echo Development servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
