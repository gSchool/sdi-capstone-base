const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router()
module.exports = router;

app.use(express.json());
app.use(cors());

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)

const approvals_route = require('./crud/approvals');
const assets_route = require('./crud/assets');
const checkout_route = require('./crud/checkout');
const homepage_route = require('./crud/homepage');
const login_route = require('./crud/login');

app.use('/approval', approvals_route);
app.use('/assets', assets_route);
app.use('/checkout', checkout_route);
app.use('/homepage', homepage_route);
app.use('/login', login_route);


app.get('/', (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.status(200).send('App root route running');
})

app.get('/user', (request, response) => {
    knex('user')
        .select('*')
        .then(authorRecords => {
            let responseData = authorRecords.map(author => ({ firstName: author.first_name, lastName: author.last_name }));
            response.status(200).send(responseData)
        })

})

module.exports = app;

