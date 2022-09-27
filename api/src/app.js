const express = require('express');
const cors = require('cors');
const app = express();

const {
    getAllUsers
} = require('./controller.js');

app.use(cors());

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)

app.get('/', (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.status(200).send('Welcome to the API');
})

app.get('/users', (request, response) => {
    getAllUsers()
    .then(data => response.status(200).send(data))
    .catch(err => response.status(500).send(err))
    response.set("Access-Control-Allow-Origin", "*");
});

app.get('/authors', (request, response) => {
    knex('app_authors')
        .select('*')
        .then(authorRecords => {
            response.status(200).send(responseData)
        })
})

// app.get('*', (request, response) => {
//     response.set("Access-Control-Allow-Origin", "*");
//     response.status(200).send('Not a valid endpoint');
// })


module.exports = app;

