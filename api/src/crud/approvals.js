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
    let requestList = await knex
      .select('request.id as Request_ID', 'date', 'location', 'mission_title', 'justification', 'status', 'all_users.first_name as User_first', 'all_users.last_name as User_last', 'sme_approver.first_name as SME_first', 'sme_approver.last_name as SME_last', 'cmd_approver.first_name as CMD_first', 'cmd_approver.last_name as CMD_last', 'sme_approver.id AS SME_ID', 'cmd_approver.id as CMD_ID', 'all_users.id as USER_ID')
      .from('request')
      .innerJoin('all_users', 'request.user_id', 'all_users.id')
      .innerJoin('sme_approver', 'sme_approver.id', 'request.sme_id')
      .innerJoin('cmd_approver', 'cmd_approver.id', 'request.cmd_id')
    res.status(200).send(requestList)
  } catch (err) {
    console.log('Error fetching requests: '(err));
  }
})




router.patch('/:id', async (req, res) => {
  const updatedId = parseInt(req.params.id);
  try {
    let updatedRequest = {
      'status': req.body.status
    }
    let updatedRequestKnex = await knex('request').where('id', updatedId).update(updatedRequest);
    res.status(200).send('Request Updated')
  }
  catch (e) {
    console.log('Error in patching unit:', e);
  }
})