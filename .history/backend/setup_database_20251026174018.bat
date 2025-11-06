@echo off
echo Setting up PostgreSQL database for Cafe Fausse...
echo.
echo Please enter the postgres user password when prompted.
echo.

"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -f create_db.sql

echo.
echo Database setup complete!
echo.
echo Connection details:
echo - Database: cafe_fausse
echo - User: cafe_user
echo - Password: cafe_password
echo - Host: localhost
echo - Port: 5432
echo.
pause
