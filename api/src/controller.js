const knex = require("knex")(
    require("../knexfile.js")[process.env.NODE_ENV || "development"]
  );

const addWeapon = async users => {
  
  let modifiedUsers = users
  for (let user of modifiedUsers) {
    let newWeapons = await knex('weapon_user').select(
      'weapon',
      'weapon.*'
    )
    .where('user_id', user.id)
    .fullOuterJoin("weapon", 'weapon_id', '=', 'weapon.id')
    user.weapons = newWeapons
    //if this throws us for a loop on the front end, write
    //function to empty weapons array null values
  }
  return modifiedUsers
}

const addCerts = async users => {
  let modifiedUsers = users
  for (let user of modifiedUsers) {
    let newCerts = await knex('certification').select('*').where('id', user.cert_id)
    user.certs = newCerts
  }
  return modifiedUsers
}

const getAllUsers = async () => {
  let users = await knex('user_table').select('*').orderBy('last_name', 'asc')
  let wepUsers = await addWeapon(users);
  let certUsers = await addCerts(wepUsers);
  return certUsers;
};

const searchUsers = async (searchInput) => {
  searchInput = searchInput.toLowerCase();
  console.log("search input: ", searchInput)
  let users = await knex('user_table').select('*').whereILike('first_name', `%${searchInput}%`).orWhereILike('last_name', `%${searchInput}%`)
  let wepUsers = await addWeapon(users);
  let certUsers = await addCerts(wepUsers);
  return certUsers;
};

const getAllSchedule = async () => {
  let schedules = await knex('post_schedule').select('*');
  return schedules;
}

const getScheduleByDate = async props => {
  // convert to date object to look up //////////////////////////////////
  //    let dateInfo = new Date(year, monthIndex, day)
  let dateInfo = `${props.year}-${props.month}-${props.day}`
  console.log('before knex date', dateInfo)
  let schedules = await knex('post_schedule').select('*').whereILike('date', `${dateInfo}%`);
  return schedules;
}


const individualUser = async (id) => {
  let users = await knex('user_table').where({id : id})
  let wepUsers = await addWeapon(users);
  let certUsers = await addCerts(wepUsers);
  return certUsers;
  
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


const updateUser = (req) => {
  console.log("this is req.body for update user: ", req.body)
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
  };


module.exports = {
  getAllUsers,
  postUsers,
  individualUser,
  postWeaponUser,
  deleteUser,
  updateUser,
  updateWeaponUser,
  allWeapons,
  deleteWeaponUser,
  getAllSchedule,
  getScheduleByDate,
  searchUsers,
}