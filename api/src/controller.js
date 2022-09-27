const knex = require("knex")(
    require("../knexfile.js")[process.env.NODE_ENV || "development"]
  );

  const getAllUsers = async (req, res) => {
    return knex('user_table').select('*')
  };

//select * from user_table full outer join certification  on cert_id = certification.id;
//select * from weapon_user full join user_table on user_id = user_table.id full join weapon on weapon_id = weapon.id;

  const getAllUserDataT = async (req, res) => {
    return knex('user_table').select('*')
    .join("certification", 'cert_id', '=', 'certification.id')
    // .join("weapon", { weapon_id: "weapon.id" })
    .join("weapon_user", 'user_id', '=', 'user_table.id')
    // .join("weapon", 'id', '=', 'weapon_user.weapon_id')
  };

  const getAllUserData = async (req, res) => {
    return knex('weapon_user').select('*')
    .fullOuterJoin("user_table", 'user_id', '=', 'user_table.id')
    .fullOuterJoin("weapon", 'weapon_id', '=', 'weapon.id')
    .fullOuterJoin("certification", 'cert_id', '=', 'certification.id')
  };
  

  module.exports = {
    getAllUsers,
    getAllUserData
  }

  