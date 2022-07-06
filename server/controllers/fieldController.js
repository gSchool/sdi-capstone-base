import knex from "../db/db.js";

const request = (req, res) => {
  knex("fields")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    });
};
const add = (req, res) => {


  res.status(200).send(`${req.method} - add`);
};
const remove = (req, res) => {
  res.status(200).send(`${req.method} - remove`);
};
const edit = (req, res) => {
  res.status(200).send(`${req.method} - edit`);
};

const favorite = (req, res) => {
  const targetId = req.params.field_id
  knex('fields').where({id: targetId}).update({
    favorite: knex.raw('NOT ??', ['favorite'])
  }).returning('*')
    .then(data => res.status(200).send("field favorite has flipped."))
};

const archive = (req, res) => {
  const targetId = req.params.field_id
  knex('fields').where({id: targetId}).update({
    archived: knex.raw('NOT ??', ['archived'])
  }).returning('*')
    .then(data => res.status(200).send("field archived has flipped."))
};

export { request, add, remove, edit, favorite, archive };
