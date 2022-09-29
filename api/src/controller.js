const knex = require("knex")(
    require("../knexfile.js")[process.env.NODE_ENV || "development"]
  );

  const getAllUsers = () => {
    return knex('user_table').select('*')
  };


  const getAllUserData =  () => {
    return knex('weapon_user').select(
      'user_table.id',
      'first_name',
      'last_name',
      'rank',
      'cert',
      'weapon',
      'flight',
      'weapon_arming',
      'admin'
      
      )
    .fullOuterJoin("user_table", 'user_id', '=', 'user_table.id')
    .fullOuterJoin("weapon", 'weapon_id', '=', 'weapon.id')
    .fullOuterJoin("certification", 'cert_id', '=', 'certification.id')
  };

  const individualUser = (id) => {
    return knex('user_table')
    .where({id : id})
  }
  
  const getUsersAndCerts = () => {
    return knex .select(
      'user_table.id',
      'first_name',
      'last_name',
      'cert'
    )
    .from('user_table')
    .join('certification', 'cert_id', '=', 'certification.id')
  }

  const postUsers = (body) => {
    return knex('user_table').insert(body)
  }

  const postWeaponUser = (body) => {
    return knex('weapon_user').insert(body)
  }

  const allWeapons = () => {
    return knex('weapon').select('*')
  }

  const weaponUsers = () => {
    return knex .select(
      
      'first_name',
      'last_name',
      'weapon',
      'type',
      
    
    )
    .from('weapon_user')
    .join('user_table', 'user_table.id', '=', 'weapon_user.user_id')
    .join('weapon', 'weapon.id', '=', 'weapon_user.weapon_id')
  
  }

  const onlyWeaponUserTable = () => {
    return knex('weapon_user').select('*')
  }

  const updateUser = (req) => {
    knex.raw("TRUNCATE users_table CASCADE");
    return knex ('user_table')
    .where({id : req.params.id})
    .update(req.body)
  }

  const updateWeaponUser = (req) => {
    knex.raw("TRUNCATE weapon_user CASCADE");
    return knex ('weapon_user')
    .where({id : req.params.id})
    .update(req.body)
  }

  const deleteWeaponUser = (id) => {
    return knex('weapon_user')
    .where({id : id})
    .delete()
    
  }

  const deleteUser = (id) => {
    return knex('user_table')
    .where({id : id})
    .delete()
    
  }
  

  module.exports = {
    getAllUsers,
    getAllUserData,
    postUsers,
    individualUser,
    postWeaponUser,
    weaponUsers,
    deleteUser,
    updateUser,
    updateWeaponUser,
    allWeapons,
    deleteWeaponUser,
    onlyWeaponUserTable,
    getUsersAndCerts
  }

  