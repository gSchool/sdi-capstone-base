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
  let userList = await knex.select('*').from('all_users')
  res.status(200).send(userList)
})