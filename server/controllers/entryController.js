import knex from "../db/db.js";

const request = (req, res) => {
  knex("entries")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    });
};

const add = (req, res) => {
  const sheet_id = req.params.sheet_id
  const { values } = req.body

  knex('sheets')
    .select('id')
    .where({id: sheet_id})
    .then(data => {
      if (data.length) {
        if (values.every((elm) => ValidataField(elm.field_id))) {
          knex('entries')
            .insert({sheet_id})
            .returning('id')
            .then((entry_id) => {
              values.forEach(value => {
                value.entry_id = entry_id[0].id
              })
              return knex('values')
                .insert(values)
                .then(() => res.status(201).json(`entry added to sheet ${sheet_id}.`))
            })
       } else {
        res.status(400).send("User Error, Check body and please try again.")
       }
      } else {
        res.status(400).send("User Error, Check body and please try again.")
       }
    })
  
};

const archive = (req, res) => {
  const targetId = req.params.entry_id

  knex('entries')
    .select('id')
    .where({id: targetId})
    .then(data => {
      if (data.length) {
        knex('entries').where({id: targetId}).update({
          archived: knex.raw('NOT ??', ['archived'])
        }).returning('*')
          .then(data => res.status(200).send("entry archived has flipped."))
      } else {
        res.status(402).send("invalid entry.")
      }
    })
};

const edit = (req, res) => {
  const targetId = req.params.entry_id;
  let { values } = req.body;

  values.forEach(value => {
    if (value.id !== 'new') {
      knex('values')
      .select('*')
      .where({id: value.id})
      .update({ value: value.value })
      .then(data => console.log('current',data) )
    } else {
      console.log(value)
      knex('values')
      .insert({ value: value.value, field_id: value.field_id, entry_id: targetId})
      .then(data => console.log('new',data))
    }
  })

  knex('values')
    .select('*')
    .then(data => res.status(201).json(data))
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
export { request, add, edit, archive };
