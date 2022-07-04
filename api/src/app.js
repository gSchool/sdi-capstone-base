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

app.get('/', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.status(200).send('App root route running');
})

app.get('/users', (req, res) => {
    knex('users')
        .select('*')
        .then(userInfo => {
            let responseData = userInfo.map(user => ({id: user.id, first_name: user.first_name, last_name: user.last_name, username: user.username, password: user.password}));
            res.status(200).send(responseData)
        })

})

app.get('/users/:id', (req, res) => {
    knex('users')
        .where({id: req.params.id})
        .then(data => res.status(200).json(data))
        .catch(() => res.status(404).send(`Could not retrieve user ${req.params.id} or user does not exist`))
})

app.get('/posts', (req, res) => {
    knex('posts')
        .select('*')
        .then(postInfo => {
            let postData = postInfo.map(post => ({id: post.id, title: post.title, content: post.content, date: post.date, user_id: post.user_id}));
            res.status(200).send(postData)
        })
})

app.get('/posts/:id', (req, res) => {
    knex('posts')
        .where({id: req.params.id})
        .then(data => res.status(200).json(data))
        .catch(() => res.status(404).send(`Could not retrieve post ${req.params.id} or post does not exist`))
})

//Update

app.patch('/users/:id', (req, res) => {
    knex('users')
    .where({id: req.params.id})
    .update(req.body)  
    .then(()=> knex('users'))
    .then(data => res.status(200).json(data))
})

app.patch('/posts/:id', (req, res) => {
    knex('posts')
    .where({id: req.params.id})
    .update(req.body)  
    .then(()=> knex('posts'))
    .then(data => res.status(200).json(data))
})

//Delete

app.delete('/users/:id', (req, res) => {
    knex('users')
    .delete()
    .where({id: req.params.id})
    .then(()=> knex('posts'))
    .then(data => res.status(200).json(data))
})

app.delete('/posts/:id', (req, res) => {
    knex('posts')
    .delete()
    .where({id: req.params.id})
    .then(()=> knex('posts'))
    .then(data => res.status(200).json(data))
  })

module.exports = app;

