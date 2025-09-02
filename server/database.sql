-- Vitali BMI Health App Database Schema

CREATE DATABASE IF NOT EXISTS vitali;
USE vitali;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bmi_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    height FLOAT NOT NULL,
    weight FLOAT NOT NULL,
    bmi FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert a test user for hackathon demo (password: test123)
INSERT INTO users (full_name, email, password) VALUES 
('Demo User', 'demo@vitali.com', '$2b$10$rQZ8K9mN2pL1vX3yW6tA7uB4cD5eF8gH9iJ0kL1mN2oP3qR4sT5uV6wX7yZ8');
