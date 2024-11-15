const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to MySQL database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test the database connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Question 1
// retrieve all patients
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving patients:', err);
            return;
        }
        res.json(results);
    });
});

// Question 2
// retrieves all providers
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving providers:', err);
            return;
        }
        res.json(results);
    });
});

// Question 3
// Filter patients by first name
app.get('/patients/:first_name', (req, res) => {
    const firstName = req.params.first_name;
    const query = 'SELECT * FROM patients WHERE first_name = ?';
    db.query(query, [firstName], (err, results) => {
        if (err) {
            console.error('Error retrieving patients:', err);
            return;
        }
        res.json(results);
    });
});

// Question 4
// Retrieve all providers by thier specialty
app.get('/providers/:specialty', (req, res) => {
    const specialty = req.params.specialty;
    const query = 'SELECT * FROM providers WHERE provider_specialty = ?';
    db.query(query, [specialty], (err, results) => {
        if (err) {
            console.error('Error retrieving providers:', err);
            return;
        }
        res.json(results);
    });
});

// Listen to the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
