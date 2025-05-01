# library-database-and-contact-book-crud-api
**1 Library Management System - MySQL Database**
# Library Management System - MySQL Database

## 📖 Project Description
A complete relational database for managing library operations including:
- Book catalog management
- Member registrations
- Loan tracking
- Fine calculations

## 🛠️ Database Schema
### Core Tables
*members* - Library patrons/members

*books* - Book inventory

*authors* - Book authors

*book_authors* - junction table that implements Many-to-many relationship between books and authors

*categories* - Book categories/genres

*publishers* - Book publishers

*loans* - Book borrowing records

*fines* - Fine records for overdue books

*staff* - Library staff members

### Key Relationships
-Books to Publishers: Many-to-One (Many books can be published by one publisher)

-Books to Categories: Many-to-One (Many books can belong to one category)

-Books to Authors: Many-to-Many (via book_authors junction table)

-Members to Loans: One-to-Many (One member can have many loans)

-Books to Loans: One-to-Many (One book can be loaned many times)

-Staff to Loans: One-to-Many (One staff member can process many loans)

-Loans to Fines: One-to-One (One loan can have one fine record)

### ERD DIAGRAM
https://lucid.app/lucidchart/c85eb450-a399-49bf-a340-f086510fc6b8/edit?viewport_loc=-82%2C-16%2C1430%2C592%2C0_0&invitationId=inv_98261df6-19c1-4934-913a-a27fad3e8374
