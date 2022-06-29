import express, { json } from 'express';
import cors from 'cors';
import knex from "../db/db.js";

const server = express();

var opts = {
  origin: ["http://localhost:3000", "https://smartsheets-client.herokuapp.com/"],
  credentials: true,
}

server.use(cors(opts));
server.use(json());

server.get('/api/', (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.status(200).send('Api root route running');
})

server.get('/api/authors', (request, response) => {
  knex('app_authors')
    .select('*')
    .then(authorRecords => {
      let responseData = authorRecords.map(author => ({ firstName: author.first_name, lastName: author.last_name}));
      response.status(200).send(responseData)
    })

})


export default server;

