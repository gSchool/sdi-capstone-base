const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router()
module.exports = router;

app.use(express.json());
app.use(cors());

const env = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[env]
const knex = require('knex')(config)

router.get('/', async (req, res) => {
  let username = req.body.username;
  try {
    let login = await knex
      .select('username').from('all_users').where('username', username)
    res.status(200).send(login)
  } catch (err) {
    console.log('Error fetching assets: '(err));
  }
})


router.post('/', async (req, res) => {
  try {

    let newUser = await knex('all_users').insert({
      'first_name': req.body.first_name,
      'last_name': req.body.last_name,
      'username': req.body.username,
      'unit': req.body.unit,
      'position': req.body.position,
      'password': req.body.password,
      'phone_number': req.body.phone_number,
      'email': req.body.email
    })
    let responseString = 'New User Added: ' + req.body.first_name + ' ' + req.body.last_name;
    res.status(201).send(responseString);
  } catch (e) {
    console.log('Error in adding unit:', e);
  }
})


