const knex = require("knex")(
    require("../knexfile.js")[process.env.NODE_ENV || "development"]
  );

  const getAllUsers = async (req, res) => {
    return knex('user_table').select('*')
  };

  const getAllUserData = async (req, res) => {
    return knex('user_table').select('*')
  };
  


  module.exports = {
    getAllUsers
  }

  