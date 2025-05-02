const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '123456789',
  database: 'contact_book'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes
// Contacts CRUD
app.get('/api/contacts', (req, res) => {
  db.query('SELECT * FROM contacts', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/api/contacts', (req, res) => {
  const { first_name, last_name, email } = req.body;
  db.query(
    'INSERT INTO contacts (first_name, last_name, email) VALUES (?, ?, ?)',
    [first_name, last_name, email],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: result.insertId, first_name, last_name, email });
    }
  );
});

app.put('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email } = req.body;
  db.query(
    'UPDATE contacts SET first_name = ?, last_name = ?, email = ? WHERE id = ?',
    [first_name, last_name, email, id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id, first_name, last_name, email });
    }
  );
});

app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM contacts WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Contact deleted successfully' });
  });
});

// Phone Numbers CRUD
app.get('/api/contacts/:contactId/phones', (req, res) => {
  const { contactId } = req.params;
  db.query('SELECT * FROM phone_numbers WHERE contact_id = ?', [contactId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/api/contacts/:contactId/phones', (req, res) => {
  const { contactId } = req.params;
  const { phone_type, phone_number } = req.body;
  db.query(
    'INSERT INTO phone_numbers (contact_id, phone_type, phone_number) VALUES (?, ?, ?)',
    [contactId, phone_type, phone_number],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: result.insertId, contact_id: contactId, phone_type, phone_number });
    }
  );
});

app.put('/api/phones/:id', (req, res) => {
  const { id } = req.params;
  const { phone_type, phone_number } = req.body;
  db.query(
    'UPDATE phone_numbers SET phone_type = ?, phone_number = ? WHERE id = ?',
    [phone_type, phone_number, id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id, phone_type, phone_number });
    }
  );
});

app.delete('/api/phones/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM phone_numbers WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Phone number deleted successfully' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});