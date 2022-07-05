import knex from "../db/db.js";

const request = (req, res) => {
  console.log(req.body)
  knex("sheets")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    });
};
const add = (req, res) => {
  let newSheet = req.body;

  knex('sheets')
    .insert(newSheet)
    .then(() => res.status(200).send(`New sheet has been added`))
  
};
const remove = (req, res) => {
  res.status(200).send(`${req.method} - remove`);
};
const edit = (req, res) => {
  res.status(200).send(`${req.method} - edit`);
};

export { request, add, remove, edit };
