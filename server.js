// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database'); // Import the database module

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint for sign up
app.post('/signup', (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    db.run(`INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`, 
        [first_name, last_name, email, password], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error saving user', error: err });
        }
        res.status(201).json({ id: this.lastID, message: 'User created successfully' });
    });
});

// Endpoint for enrollment
app.post('/enroll', (req, res) => {
    const { course_name, first_name, last_name, email, phone } = req.body;
    db.run(`INSERT INTO enrollments (course_name, first_name, last_name, email, phone) VALUES (?, ?, ?, ?, ?)`, 
        [course_name, first_name, last_name, email, phone], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error enrolling', error: err });
        }
        res.status(201).json({ id: this.lastID, message: 'Enrollment successful' });
    });
});

// Endpoint for bookings
app.post('/book', (req, res) => {
    const { full_name, email, phone, service, date, timeslot } = req.body;
    db.run(`INSERT INTO bookings (full_name, email, phone, service, date, timeslot) VALUES (?, ?, ?, ?, ?, ?)`, 
        [full_name, email, phone, service, date, timeslot], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error booking', error: err });
        }
        res.status(201).json({ id: this.lastID, message: 'Booking successful' });
    });
});

// Endpoint for contact us
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    db.run(`INSERT INTO contact_us (name, email, message) VALUES (?, ?, ?)`, 
        [name, email, message], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error sending message', error: err });
        }
        res.status(201).json({ id: this.lastID, message: 'Message sent successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
