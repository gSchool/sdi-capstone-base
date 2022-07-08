import knex from "../db/db.js";
import { requestCurrentUser } from "./helpers.js";

const request = async (req, res) => {
  const { user_id, name } = req.user

  if (user_id) {
    const data = await requestCurrentUser(user_id)
    res.status(200).send(data[0]);
    return;
  } 
};

const requestAllUsers = async (req, res) => {
  knex('users')
    .select('*')
    .then(data => res.status(200).json(data))
}


const getAllSheetUsers = (req, res) => {
  const reqId = req.params.sheet_id
  if(!reqId) {
    res.status(400).send("Need a sheet to get the users")
    return
  }

  knex('user_roles')
    .join('users', 'user_roles.user_id', 'users.id')
    .select('user_id', 'role_name', 'name', 'picture', 'email')
    .where({sheet_id: reqId})
    .then(data => res.status(200).json(data))

}

const editUserRoles = (req, res) => {
  const targetId = req.params.sheet_id;
  const { users } = req.body;

  users.forEach(user => {
    knex('user_roles')
    .select('*')
    .where({user_id: user.user_id, sheet_id: targetId})
    .update({role_name: user.role_name})
    .then((data) => console.log(data) )
  })
  res.status(200).json(`user roles updated`)
}

const removeUserRoles = (req, res) => {
  const targetId = req.params.sheet_id;
  const { users } = req.body;

  users.forEach(user => {
    knex('user_roles')
    .select('*')
      .where({user_id: user.user_id, sheet_id: targetId})
      .del()
      .then(data => res.status(201).json(`${data} records deleted`))
  })
}

const add = (req, res) => {
  const { user_id, name, picture, email } = req.user
  console.log(req.user);

  knex("users")
    .select("*")
    .where({ name: name })
    .then((data) => {
      if (data.length === 0) {
        return knex("users")
          .insert({ name: name, firebase_uuid: user_id, picture: picture, email: email })
          .then(() => {
            res.status(201).send(`${name} has been added.`);
          });
      } else {
        res.status(202).send(`${name} already exists.`);
      }
    });
};

const remove = (req, res) => {
  res.status(200).send(`${req.method} - remove`);
};
const edit = (req, res) => {
  res.status(200).send(`${req.method} - edit`);
};


export { request, add, remove, edit, getAllSheetUsers, requestAllUsers, editUserRoles, removeUserRoles};
