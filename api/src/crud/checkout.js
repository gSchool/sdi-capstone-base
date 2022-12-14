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

router.post('/', async (req, res) => {
  try {

    await knex('request').insert({
      'date': req.body.date,
      'location': req.body.location,
      'mission_title': req.body.mission_title,
      'justification': req.body.justification,
      'sme_status': req.body.sme_status,
      'cmd_status': req.body.cmd_status,
      'user_id': req.body.user_id,
      'asset_id': req.body.asset_id,
      'sme_id': req.body.sme_id,
      'cmd_id': req.body.cmd_id
    })
    let responseString = 'New asset added'
    res.status(201).send(responseString).redirect('/home');
  } catch (e) {
    console.log('Error in adding unit:', e);
  }
})

