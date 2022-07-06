const env = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[env]
const knex = require('knex')(config)
const bcrypt = require('bcryptjs');

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
  console.log(`working on post for /users/orgs/${req.params.id}`)
  knex('users')
  .join('organizations as org', 'org.id', '=', 'users.org_id')
  .join('positions', 'positions.id', '=', 'users.position_id')
  .select(
    'users.id as user_id',
    'users.name as user_name',
    'users.rank as user_rank',
    'org.id as org_id',
    'org.name as org_name',
    'users.email as user_email',
    'positions.id as position_id',
    'positions.name as position_name'
  )
  .where('users.org_id', '=', req.params.id)
  .then(data => {
    console.log(data)
    res.set("Access-Control-Allow-Origin", "*");
    res.status(200).send(data);
  })

}

//returns 200 on success, 400 on invalid email, returns 404 on other invalid request
const register = (req, res, next) => {
  console.log(`working on post for /register`)

  let keys = ['name', 'rank', 'email', 'position_id', 'password']

  if(req.body[keys[0]] && req.body[keys[1]] && req.body[keys[2]] && req.body[keys[3]] && req.body[keys[4]]) {
    userNamePromise = knex('users')
      .where('email', '=', req.body.email)
      .select('*')
      .then(data => {
        if(data.length < 1) {
          bcrypt.hash(req.body.password, 10)
            .then(hashedPassword => {
              return knex("users").insert({
                  name: req.body.name,
                  rank: req.body.rank,
                  email: req.body.email,
                  position_id: req.body.position_id,
                  password: hashedPassword
              })
              .returning(["id", "email"])
              .then(users => {
                  res.json(users[0])
              })
              .catch(error => next(error))
            })
        } else {
          res.status(400).send()
        }
      })

  } else {
    res.status(404).send();
  }
}
const login = (req, res) => {
  console.log(`working on post for /login`)
  let keys = ['email', 'password']

  if(req.body[keys[0]] && req.body[keys[1]]){
    knex("users")
    .where({email: req.body.email})
    .then(user => {
      if(!user) {
        res.status(400).json({
          error: "No user by that email"
        })
      } else{
        return bcrypt
        .compare(req.body.password, user[0].password)
        .then(isAuthenticated => {
           if(!isAuthenticated){
              res.status(401).send("Unsuccessful login")
           }else{
                // return the id back to the ui to know where to go
                 res.status(200).send("Success")
                 //response.json(user)
           }
        })
      }
    })
  }

}
const update = (req, res) => {
  console.log(`working on patch for /users/${req.params.userid}`)
}
const remove = (req, res) => {
  console.log(`working on delete for /users/${req.params.userid}`)
}

module.exports = { profile, all, byOrg, register, login, update, remove }
