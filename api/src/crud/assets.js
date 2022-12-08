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
      .select('*').from('asset')
    res.status(200).send(assetList)
  } catch (err) {
    console.log('Error fetching assets: '(err));
  }
})

router.get('/:type', async (req, res) => {
  let type = req.params.type;
  try {
    let assetList = await knex
      .select('*').from('asset').whereILike('type', type)
    res.status(200).send(assetList)
  } catch (err) {
    console.log('Error fetching assets: '(err));
  }
})