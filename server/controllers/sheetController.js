import knex from "../db/db.js";

const request = (req, res) => {
  knex("sheets")
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

export { request, add, remove, edit };
