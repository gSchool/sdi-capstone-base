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
      .select('username').from('user').where('username', username)
    res.status(200).send(login)
  } catch (err) {
    console.log('Error fetching assets: '(err));
  }
})
