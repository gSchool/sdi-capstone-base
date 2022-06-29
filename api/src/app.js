const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)

//Create

app.post('/users', (req, res) => {
    knex('users')
    .insert(req.body)
    .then(()=> knex('users'))
    .then(data => res.status(200).json(data))
  });

  app.post('/posts', (req, res) => {
    knex('posts')
    .insert(req.body)
    .then(()=> knex('posts'))
    .then(data => res.status(200).json(data))
  });

//Read

app.get('/', (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.status(200).send('App root route running');
})

app.get('/users', (request, response) => {
    knex('users')
        .select('*')
        .then(userInfo => {
            let responseData = userInfo.map(user => ({ first_name: user.first_name, last_name: user.last_name, username: user.username, password: user.password}));
            response.status(200).send(responseData)
        })

})

app.get('/users/:id', (req, res) => {
    knex('users')
        .where('id', req.params.id)
        .then(data => res.status(200).json(data))
        .catch(() => res.status(404).send(`Could not retrieve user ${req.params.id} or user does not exist`))
})

app.get('/posts', (req, res) => {
    knex('posts')
        .select('*')
        .then(postInfo => {
            let postData = postInfo.map(post => ({title: post.title, content: post.content, user_id: post.user_id}));
            res.status(200).send(postData)
        })
})

app.get('/posts/:id', (req, res) => {
    knex('posts')
        .where('id', req.params.id)
        .then(data => res.status(200).json(data))
        .catch(() => res.status(404).send(`Could not retrieve post ${req.params.id} or post does not exist`))
})

//Update

//Delete

module.exports = app;

