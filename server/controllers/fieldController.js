import knex from "../db/db.js";

const request = (req, res) => {
  knex("fields")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    });
};

const handleField = (req, res) => {
  const targetId = req.params.sheet_id;
  let { fields } = req.body;

  fields.forEach(field =>{
    if (field.field_id !== 'new') {
      console.log(field)
      knex('fields')
        .select('*')
        .where({id: field.field_id})
        .update({name: field.name, id: field.field_id})
        .then((data => console.log(data)))
    } else {
      knex('fields')
        .insert({type: field.type, sheet_id: targetId, name: field.name})
        .then((data => console.log(data)))
    }
  })

  knex('fields')
    .select('*')
    .where({sheet_id: targetId})
    .then(data => res.status(200).json(data))
};

const flipChecked = (req, res) => {
  const targetId = req.params.field_id;

  knex('values')
    .where({field_id: targetId}).update({
      checked: knex.raw('NOT ??', ['checked'])
    }).returning('*')
      .then(data => res.status(200).send("field checked has flipped."))
}

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

export { request, handleField, favorite, archive, flipChecked };
