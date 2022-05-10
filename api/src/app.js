const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./dbConnection');

app.use(cors());

app.get('/users', (req, res) => {
    db
    .select('*')
    .from('users')
    .then(() => res.status(200).json('Hello'))
})

module.exports = app;

