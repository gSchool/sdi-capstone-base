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
  try {
    let assetList = await knex
      .select('date', 'location', 'mission_title', 'justification', 'status', 'user.first_name', 'user.last_name').from('request')
      .innerJoin('all_users', 'all_users.id', 'request.user_id')
    res.status(200).send(assetList)
  } catch (err) {
    console.log('Error fetching checkout: '(err));
  }
})
