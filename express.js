import express from 'express';
import bcrypt from 'bcrypt';
import sqlite3 from 'sqlite3';
import path from 'path';

const app = express();
const __dirname = path.resolve(); // To resolve __dirname for ES modules

app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from the root directory

const db = new sqlite3.Database('form.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Could not connect to database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Send index.html from the root directory
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            `INSERT INTO Users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`,
            [first_name, last_name, email, hashedPassword],
            function (err) {
                if (err) {
                    console.error("User registration failed:", err.message);
                    return res.status(500).json({ message: "User registration failed." });
                }
                res.status(201).json({ message: "Registration successful.", first_name });
            }
        );
    } catch (error) {
        console.error("Error processing request:", error.message);
        res.status(500).json({ message: "Error processing request." });
    }
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    // Logic to validate user credentials
    const user = await User.findOne({ email });

    if (user && user.password === password) {
        // If the user is found and the password matches
        return res.status(200).json({ email: user.email });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
});


// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
