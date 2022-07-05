import knex from "../db/db.js";

const request = (req, res) => {
  knex("entries")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    });
};

const add = (req, res) => {
  const {sheet_id, values} = req.body
  
  if (ValidataSheet(sheet_id) && values.every((elm) => ValidataField(elm.field_id))) {
    knex('entries')
      .insert({sheet_id})
      .returning('id')
      .then((entry_id) => {
        values.forEach(value => value.entry_id = entry_id[0].id)
        return knex('values')
          .insert(values)
          .then(() => res.status(201).json(`entry added to sheet ${sheet_id}.`))
      })
 } else {
  res.status(400).send("User Error, Check body and please try again.")
 }
};

const remove = (req, res) => {
  res.status(200).send(`${req.method} - remove`);
};
const edit = (req, res) => {
  res.status(200).send(`${req.method} - edit`);
};

const ValidataField = async (id) => {
  await knex('fields')
    .select('*')
    .where({sheet_id: parseInt(id)})
    .then((data) => {

      return true;
    }).catch(() => {
      return false;
    })
}

const ValidataSheet = async (check_id) => {
  await knex('sheets')
    .select('*')
    .where({id: parseInt(check_id)})
    .then(() => {
      return true;
    }).catch(() => {
      return false;
    })
}

const ValidataEntry = async (id) => {
  await knex('entries')
    .select('*')
    .where({sheet_id: parseInt(id)})
    .then(() => {
      return true;
    }).catch(() => {
      return false;
    })
}

export { request, add, remove, edit };
