import knex from "../db/db.js";

const request = (req, res) => {
  if (req.params.id) {
    requestUser(req.params.id, res);
    return;
  }

  knex("users")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    });
};

const requestUser = (id, res) => {
  knex("users")
    .select("*")
    .where({ id: id })
    .then((data) => {
      res.status(200).json(data[0].name);
    });
};

const add = (req, res) => {
  console.log("start")
  const { user_id, name } = req.user
  console.log(user_id, name)

  knex("users")
    .select("*")
    .where({ name: name })
    .then((data) => {
      if (data.length === 0) {
        return knex("users")
          .insert({ name: name, firebase_uuid: user_id })
          .then(() => {
            res.status(200).send(`${name} has been added.`);
          });
      } else {
        res.status(400).send(`${name} already exists.`);
      }
    });

};

const remove = (req, res) => {
  res.status(200).send(`${req.method} - remove`);
};
const edit = (req, res) => {
  res.status(200).send(`${req.method} - edit`);
};


export { request, add, remove, edit };
