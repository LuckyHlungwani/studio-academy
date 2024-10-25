// database.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./form_data.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the form_data database.');
});

// Create tables for sign up, enrollment, bookings, and contact us
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        email TEXT UNIQUE,
        password TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS enrollments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_name TEXT,
        first_name TEXT,
        last_name TEXT,
        email TEXT,
        phone TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT,
        email TEXT,
        phone TEXT,
        service TEXT,
        date TEXT,
        timeslot TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS contact_us (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        message TEXT
    )`);
});

module.exports = db;
