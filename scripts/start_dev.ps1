# PowerShell script to start Café Fausse Development Environment
Write-Host "Starting Café Fausse Development Environment..." -ForegroundColor Cyan
Write-Host ""

# Start Flask Backend Server
Write-Host "Starting Flask Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\..\backend'; python app.py" -WindowStyle Normal

# Wait for backend to start
Write-Host "Waiting 3 seconds for backend to start..." -ForegroundColor Gray
Start-Sleep -Seconds 3

# Start React Frontend Server
Write-Host "Starting React Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\..\frontend'; npm start" -WindowStyle Normal

Write-Host ""
Write-Host "Development servers are starting..." -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

