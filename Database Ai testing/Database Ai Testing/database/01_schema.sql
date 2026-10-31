-- ====================================================================
-- SMART CAMPUS COMPLAINT MANAGEMENT SYSTEM
-- MEMBER 3: COMPLETE RELATIONAL DATABASE SCHEMA (PART A)
-- ====================================================================

CREATE DATABASE IF NOT EXISTS campus_complaints;
USE campus_complaints;

-- 1. Departments Table
CREATE TABLE IF NOT EXISTS departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    contact_email VARCHAR(150),
    contact_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    department_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_category_department 
        FOREIGN KEY (department_id) REFERENCES departments(department_id) 
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 3. Users Table (Students, Admins, Maintenance Staff)
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'ADMIN', 'STAFF') NOT NULL DEFAULT 'STUDENT',
    department_id INT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_department 
        FOREIGN KEY (department_id) REFERENCES departments(department_id) 
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 4. Complaints Table
CREATE TABLE IF NOT EXISTS complaints (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    student_name VARCHAR(100) NOT NULL,
    student_email VARCHAR(150) NOT NULL,
    title VARCHAR(120) NOT NULL,
    description VARCHAR(2000) NOT NULL,
    category ENUM('CLASSROOM','WIFI','ELECTRICITY','WATER','CLEANLINESS','HOSTEL','OTHER') NOT NULL,
    category_id INT NULL,
    location VARCHAR(180) NOT NULL,
    priority ENUM('LOW','MEDIUM','HIGH','URGENT') NOT NULL DEFAULT 'MEDIUM',
    status ENUM('PENDING','IN_PROGRESS','RESOLVED') NOT NULL DEFAULT 'PENDING',
    assigned_staff VARCHAR(100) NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    resolved_at DATETIME(6) NULL,
    CONSTRAINT fk_complaint_user 
        FOREIGN KEY (user_id) REFERENCES users(user_id) 
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_complaint_category 
        FOREIGN KEY (category_id) REFERENCES categories(category_id) 
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 5. Assignments Table (Staff Task Assignments)
CREATE TABLE IF NOT EXISTS assignments (
    assignment_id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id BIGINT NOT NULL,
    staff_id INT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    CONSTRAINT fk_assignment_complaint 
        FOREIGN KEY (complaint_id) REFERENCES complaints(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_assignment_staff 
        FOREIGN KEY (staff_id) REFERENCES users(user_id) 
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 6. Complaint History Table (Audit Trail)
CREATE TABLE IF NOT EXISTS complaint_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id BIGINT NOT NULL,
    changed_by_user_id INT NULL,
    old_status VARCHAR(30),
    new_status VARCHAR(30) NOT NULL,
    remarks VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_history_complaint 
        FOREIGN KEY (complaint_id) REFERENCES complaints(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_history_user 
        FOREIGN KEY (changed_by_user_id) REFERENCES users(user_id) 
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Helpful Indexes for Fast Query Performance
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_priority ON complaints(priority);
CREATE INDEX idx_complaints_category ON complaints(category);
CREATE INDEX idx_complaints_created ON complaints(created_at);
