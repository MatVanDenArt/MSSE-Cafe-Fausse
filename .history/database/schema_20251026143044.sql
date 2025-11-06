-- Café Fausse Database Schema
-- PostgreSQL Database Setup

-- Create database (run this command separately)
-- CREATE DATABASE cafe_fausse;

-- Connect to the database
-- \c cafe_fausse;

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    phone VARCHAR(20),
    newsletter_signup BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    time_slot TIMESTAMP NOT NULL,
    table_number INTEGER NOT NULL CHECK (table_number >= 1 AND table_number <= 30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reservations_time_slot ON reservations(time_slot);
CREATE INDEX IF NOT EXISTS idx_reservations_customer_id ON reservations(customer_id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);

-- Insert sample data (optional)
INSERT INTO customers (name, email, phone, newsletter_signup) VALUES
('John Doe', 'john@example.com', '(202) 555-1234', true),
('Jane Smith', 'jane@example.com', '(202) 555-5678', false)
ON CONFLICT (email) DO NOTHING;

-- Sample reservations (optional)
INSERT INTO reservations (customer_id, time_slot, table_number) VALUES
(1, '2024-12-01 19:00:00', 5),
(2, '2024-12-01 20:30:00', 12)
ON CONFLICT DO NOTHING;
