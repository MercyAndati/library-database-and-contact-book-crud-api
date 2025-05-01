-- Library Management System Database
-- Created by [Mercy Andati]
-- Date: [1/05/2025]
-- CREATE DATABASE library_db;
-- USE library_db;
use library_db;
-- Members table - stores library patrons
CREATE TABLE members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(200),
    membership_date DATE NOT NULL,
    membership_type ENUM('Basic', 'Premium', 'Student') DEFAULT 'Basic',
    is_active BOOLEAN DEFAULT TRUE
);

-- Publishers table
CREATE TABLE publishers (
    publisher_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    contact_email VARCHAR(100),
    website VARCHAR(100)
);

-- Categories table
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Authors table
CREATE TABLE authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE,
    nationality VARCHAR(50),
    biography TEXT
);

-- Books table
CREATE TABLE books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    publisher_id INT,
    publication_year INT,
    edition INT,
    category_id INT,
    total_copies INT NOT NULL DEFAULT 1,
    available_copies INT NOT NULL DEFAULT 1,
    shelf_location VARCHAR(20),
    description TEXT,
    FOREIGN KEY (publisher_id) REFERENCES publishers(publisher_id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
);

-- Book-Authors junction table (many-to-many relationship)
CREATE TABLE book_authors (
    book_id INT NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE
);

-- Staff table
CREATE TABLE staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    position VARCHAR(50) NOT NULL,
    hire_date DATE NOT NULL,
    salary DECIMAL(10, 2),
    is_active BOOLEAN DEFAULT TRUE
);

-- Loans table
CREATE TABLE loans (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    member_id INT NOT NULL,
    staff_id INT NOT NULL,
    loan_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
    status ENUM('Active', 'Returned', 'Overdue') DEFAULT 'Active',
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (member_id) REFERENCES members(member_id),
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);

-- Fines table
CREATE TABLE fines (
    fine_id INT AUTO_INCREMENT PRIMARY KEY,
    loan_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    issue_date DATE NOT NULL,
    payment_date DATE,
    status ENUM('Pending', 'Paid', 'Waived') DEFAULT 'Pending',
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id)
);

-- Insert sample data into publishers
INSERT INTO publishers (name, address, contact_email, website) VALUES
('Penguin Random House', '1745 Broadway, New York, NY', 'contact@penguinrandomhouse.com', 'www.penguinrandomhouse.com'),
('HarperCollins', '195 Broadway, New York, NY', 'info@harpercollins.com', 'www.harpercollins.com'),
('Simon & Schuster', '1230 Avenue of the Americas, New York, NY', 'contact@simonandschuster.com', 'www.simonandschuster.com');

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Fiction', 'Imaginary stories and narratives'),
('Science Fiction', 'Fiction dealing with futuristic concepts'),
('Biography', 'Non-fiction accounts of people\'s lives'),
('History', 'Records of past events'),
('Technology', 'Books about computers and technology');

-- Insert sample authors
INSERT INTO authors (first_name, last_name, birth_date, nationality, biography) VALUES
('George', 'Orwell', '1903-06-25', 'British', 'English novelist, essayist, journalist, and critic'),
('J.K.', 'Rowling', '1965-07-31', 'British', 'Author of the Harry Potter fantasy series'),
('Isaac', 'Asimov', '1920-01-02', 'American', 'American writer and professor of biochemistry'),
('Walter', 'Isaacson', '1952-05-20', 'American', 'American author, journalist, and professor');

-- Insert sample books
INSERT INTO books (isbn, title, publisher_id, publication_year, edition, category_id, total_copies, available_copies, shelf_location, description) VALUES
('9780451524935', '1984', 1, 1949, 1, 1, 5, 5, 'A12', 'Dystopian social science fiction novel'),
('9780439554930', 'Harry Potter and the Philosopher\'s Stone', 2, 1997, 1, 1, 3, 3, 'B34', 'First novel in the Harry Potter series'),
('9780553293357', 'Foundation', 3, 1951, 1, 2, 4, 4, 'C56', 'First book in the Foundation series'),
('9781501127625', 'Steve Jobs', 1, 2011, 1, 3, 2, 2, 'D78', 'Biography of Apple co-founder Steve Jobs');

-- Link books to authors
INSERT INTO book_authors (book_id, author_id) VALUES
(1, 1), -- 1984 by George Orwell
(2, 2), -- Harry Potter by J.K. Rowling
(3, 3), -- Foundation by Isaac Asimov
(4, 4); -- Steve Jobs by Walter Isaacson

-- Insert sample members
INSERT INTO members (first_name, last_name, email, phone, address, membership_date, membership_type, is_active) VALUES
('John', 'Doe', 'john.doe@email.com', '555-1234', '123 Main St, Anytown', '2022-01-15', 'Premium', TRUE),
('Jane', 'Smith', 'jane.smith@email.com', '555-5678', '456 Oak Ave, Somewhere', '2022-03-22', 'Student', TRUE),
('Robert', 'Johnson', 'robert.j@email.com', '555-9012', '789 Pine Rd, Nowhere', '2021-11-05', 'Basic', TRUE);

-- Insert sample staff
INSERT INTO staff (first_name, last_name, email, phone, position, hire_date, salary, is_active) VALUES
('Sarah', 'Williams', 'sarah.w@library.org', '555-3456', 'Librarian', '2020-05-10', 55000.00, TRUE),
('Michael', 'Brown', 'michael.b@library.org', '555-7890', 'Assistant Librarian', '2021-02-15', 45000.00, TRUE);

-- Insert sample loans
INSERT INTO loans (book_id, member_id, staff_id, loan_date, due_date, return_date, status) VALUES
(1, 1, 1, '2023-01-10', '2023-01-24', '2023-01-22', 'Returned'),
(2, 2, 2, '2023-02-05', '2023-02-19', NULL, 'Overdue'),
(3, 3, 1, '2023-02-15', '2023-03-01', NULL, 'Active');

-- Insert sample fines
INSERT INTO fines (loan_id, amount, issue_date, payment_date, status) VALUES
(2, 5.50, '2023-02-20', NULL, 'Pending');