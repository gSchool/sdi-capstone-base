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
 .from('sme_approver')
 .then(data => {
    res.status(200).json(data);
 })
})

router.post('/', async (req, res) => {
   try {
 
     let newUser = await knex('sme_approver').insert({
       'first_name': req.body.first_name,
       'last_name': req.body.last_name,
       'username': req.body.username,
       'unit': req.body.unit,
       'position': req.body.position,
       'password': req.body.password,
       'phone_number': req.body.phone_number,
       'email': req.body.email,
       'type' : req.body.type
     })

     let responseString = 'New SME Added: ' + req.body.first_name + ' ' + req.body.last_name;
     res.status(201).send(responseString);
   } catch (e) {
     console.log('Error in adding unit:', e);
   }
 })
 

