import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)

app.get('/', (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.status(200).send('App root route running');
})

app.get('/authors', (request, response) => {
    knex('app_authors')
        .select('*')
        .then(authorRecords => {
            let responseData = authorRecords.map(author => ({ firstName: author.first_name, lastName: author.last_name}));
            response.status(200).send(responseData)
        })

})

export default app;

