const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router
  .get('/', (request, response) => {
    db.select('*').from('awards')
      .then(data => {
        response.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  })
  .post('/', (request, response) => {
    db.insert(request.body).into('awards').returning('*')
      .then(data => {
        response.status(201).json(data);
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  })
  .patch('/:id', (request, response) => {
    db('awards').update(request.body).where('id', '=', request.params.id).returning('*')
    .then(data => {
      response.status(201).json(data);
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
  })
  .delete('/:id', (request, response) => {
    db('awards').where('id', '=', request.params.id).delete('*')
    .then(data => {
      response.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
  })

module.exports = router;