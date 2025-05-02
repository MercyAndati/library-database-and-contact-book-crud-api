# library-database-and-contact-book-crud-api
# 1 Library Management System - MySQL Database

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

# Contact Book Application

A full-stack contact management system with MySQL database, Node.js/Express backend, and vanilla JavaScript frontend.

## Features

- **Contact Management**:
  - Create, read, update, and delete contacts
  - Store first name, last name, and email
- **Phone Number Management**:
  - Add multiple phone numbers per contact
  - Categorize numbers (home, work, mobile, other)
  - Full CRUD operations for phone numbers
- **User-Friendly Interface**:
  - Clean, responsive design
  - Forms with validation
  - Instant updates

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MySQL
- **Frontend**:
  - Vanilla JavaScript
  - HTML5
  - CSS3
- **Database**:
  - MySQL with relational tables
  - Foreign key constraints
  - Timestamp tracking

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- Git (optional)

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/your-username/contact-book-app.git](https://github.com/MercyAndati/library-database-and-contact-book-crud-api.git)
   cd contact-book-app
   #configure backed
   cd backend
   npm install
   npm run dev
   #frontend
   npx serve frontend
### Project structure
contact-book-app/
├── backend/
│   ├── server.js           # Express server and API routes
│   ├── package.json        # Backend dependencies
│   └── contact_book.sql    # Database schema
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Stylesheet
│   └── app.js              # Frontend JavaScript
└── README.md               # This file
   
##Usage
1.Add a Contact:

-Fill in the contact form with name and email

-Click "Add Contact"

2.Add Phone Numbers:

-Select a contact from the dropdown

-Choose phone type and enter number

-Click "Add Phone"

3.Edit/Delete:

-Use the Edit/Delete buttons next to each contact or phone number

-Make changes and click "Update" or confirm deletion

##API Endpoints
-Method	Endpoint	Description
-GET	/api/contacts	Get all contacts
-POST	/api/contacts	Create new contact
-PUT	/api/contacts/:id	Update contact
-DELETE	/api/contacts/:id	Delete contact
-GET	/api/contacts/:contactId/phones	Get phone numbers for contact
-POST	/api/contacts/:contactId/phones	Add phone number to contact
-PUT	/api/phones/:id	Update phone number
-DELETE	/api/phones/:id	Delete phone number
