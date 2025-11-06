-- Create database for Cafe Fausse
CREATE DATABASE cafe_fausse;

-- Create a user for the application
CREATE USER cafe_user WITH PASSWORD 'cafe_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE cafe_fausse TO cafe_user;

-- Connect to the new database
\c cafe_fausse;

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO cafe_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO cafe_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO cafe_user;

