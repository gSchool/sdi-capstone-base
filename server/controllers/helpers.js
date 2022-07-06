import knex from "../db/db.js";

const requestCurrentUser = async (id) => {
  let returnData = await knex("users")
    .select("*")
    .where({ firebase_uuid: id })
    .then((data) => data);
     return returnData
  }


export {requestCurrentUser}