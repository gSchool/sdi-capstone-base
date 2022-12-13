const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router()
module.exports = router;
const PORT = process.env.PORT || 8082;

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
const sme_route = require('./crud/sme');
const cmd_route = require('./crud/cmd');
const cart_route = require('./crud/shoppingCart');

app.use('/approvals', approvals_route);
app.use('/assets', assets_route);
app.use('/checkout', checkout_route);
app.use('/homepage', homepage_route);
app.use('/login', login_route);
app.use('/sme', sme_route);
app.use('/cmd', cmd_route);
app.use('/cart', cart_route);

app.listen(PORT, () => {
    console.log(`Capstone application listening on ${PORT}`);
})

app.get('/', (req, res) => {
    res.status(200).send("It's working")
})