const env = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[env]
const knex = require('knex')(config)

const profile = (req, res) => {
  console.log(`working on get for /users/${req.params.userid}`)
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

module.exports = { profile, add, update, remove }