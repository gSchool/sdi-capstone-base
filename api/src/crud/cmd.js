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
  await knex
    .select('*')
    .from('cmd_approver')
    .then(data => {
      res.status(200).json(data);
    })
})

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  await knex
    .select('*')
    .from('request')
    .innerJoin('cmd_approver', 'cmd_approver.id', 'cmd_id')
    .innerJoin('asset', 'asset.id', 'request.asset_id')
    .where('request.cmd_id', userId)
    .whereILike('sme_status', 'approved')
    .then(data => {
      res.status(200).json(data);
    })
})

router.post('/', async (req, res) => {
  try {
    await knex('cmd_approver').insert({
      'first_name': req.body.first_name,
      'last_name': req.body.last_name,
      'username': req.body.username,
      'unit': req.body.unit,
      'position': req.body.position,
      'password': req.body.password,
      'phone_number': req.body.phone_number,
      'email': req.body.email,
      'type': req.body.type
    })
    let responseString = 'New User Added: ' + req.body.first_name + ' ' + req.body.last_name;
    res.status(201).send(responseString);
  } catch (e) {
    console.log('Error in adding unit:', e);
  }
})

