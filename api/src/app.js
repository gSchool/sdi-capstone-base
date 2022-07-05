const express = require('express');
const cors = require('cors');
const app = express();

const { tasksRoutes, usersRoutes } = require("./routes/index.js");
const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)

app.use(cors());
app.options('*', cors());

app.use(express.json())
app.use('/', tasksRoutes)
app.use('/', usersRoutes)

module.exports = app;

