import express, { json } from 'express';
import cors from 'cors';
import knex from 'knex';
import knexfile from '../knexfile';

const app = express();

var corsOptions = {
    origin: ["http://localhost:3000", "https://smartsheets-client.herokuapp.com/"],
    optionsSuccessStatus: 200,
    methods: ["GET","POST","DELETE","UPDATE", "PUT", "PATCH"],
    credentials: true,
}

app.use(cors(corsOptions));
app.use(json());

const env = process.env.NODE_ENV || 'development'
const config = knexfile[env]
const db = knex(config);


app.get('/', (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.status(200).send('App root route running');
})

app.get('/authors', (request, response) => {
    db('app_authors')
        .select('*')
        .then(authorRecords => {
            let responseData = authorRecords.map(author => ({ firstName: author.first_name, lastName: author.last_name}));
            response.status(200).send(responseData)
        })

})


export default app;

