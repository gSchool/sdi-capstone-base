const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.get('/:id', (request, response) => {
  db.select('*').from('users_mentors').where('user_id', '=', request.params.id)
    .then(data => {
      response.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
});

module.exports = router;