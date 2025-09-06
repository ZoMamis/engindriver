-- docker/mysql/init.sql
-- Script d'initialisation de la base de données

-- Création de la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS symfony_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Utilisation de la base de données
USE symfony_db;

-- Exemple de table pour tester
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(180) NOT NULL UNIQUE,
    roles JSON NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertion de données de test
INSERT IGNORE INTO users (email, roles, password) VALUES 
('admin@example.com', '["ROLE_ADMIN"]', '$2y$13$abc123def456ghi789jkl'),
('user@example.com', '["ROLE_USER"]', '$2y$13$xyz789uvw456rst123opq');