const env = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[env]
const knex = require('knex')(config)

const profile = (req, res) => {
  console.log(`working on get for /users/${req.params.userid}`)
  //{id, name, rank, organization, email}
  knex('users')
  .join('organizations', 'organizations.id', '=', 'users.org_id')
  .select(
    'users.id as user_id',
    'users.name as user_name',
    'users.rank as user_rank',
    'organizations.id as org_id',
    'organizations.name as org_name',
    'users.email as user_email'
    )
  .where('users.id', '=', req.params.userid)
  .then(data => {
    res.set("Access-Control-Allow-Origin", "*");
    res.status(200).send(data)
  })
}
const all = (req, res) => {
  console.log(`working on post for /users`)
  knex('users')
  .join('organizations', 'organizations.id', '=', 'users.org_id')
  .join('positions', 'positions.id', '=', 'users.position_id')
  .select(
    'users.id as user_id',
    'users.name as user_name',
    'users.rank as user_rank',
    'organizations.id as org_id',
    'organizations.name as org_name',
    'users.email as user_email',
    'positions.id as position_id',
    'positions.name as position_name'
  )
  .then(data => {
    res.set("Access-Control-Allow-Origin", "*");
    res.status(200).send(data);
  })
}

const byOrg = (req, res) => {
  console.log(`working on post for /users`)

}
const add = (req, res) => {
  console.log(`working on post for /users`)
}
const update = (req, res) => {
  console.log(`working on patch for /users/${req.params.userid}`)
}
const remove = (req, res) => {
  console.log(`working on delete for /users/${req.params.userid}`)
}

module.exports = { profile, all, byOrg, add, update, remove }