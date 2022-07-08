import knex from "../db/db.js";
import { requestCurrentUser } from "./helpers.js"

const requestSheetData = async (req, res) => {
  const reqId = req.params.sheet_id
  if (reqId) {
    const returning = {}

    returning.sheet_id = reqId;
    returning.sheet = await knex.raw(`select name, short_name, templates from sheets where id = ${reqId}`).then(data => data.rows[0])


    // All fields for the sheet asked for
    returning.fields = await knex.raw(`select json_agg(fields) as fields from ( select * from fields where sheet_id = ${reqId}) as fields`).then(data => {
      if (data.rows[0].fields !== null) {
        console.log(data.rows[0].fields)
        return data.rows[0].fields.map(field => {
          field.field_id = field.id
          delete field.id
          return field
        })
      } else {
        return null;
      }
    }
    )

    // All values for the sheet asked for
    const values = await knex.raw(`select json_agg(values) as values from ( select * from values where entry_id in (select id from entries where sheet_id = ${reqId})) as values`).then(data => {
      if (data.rows[0].values !== null) {
        return data.rows[0].values.map(value => {
          value.value_id = value.id
          delete value.id
          return value
        })
      } else {
        return null;
      }
    }
    )
    console.log(returning);

    // All entries for requested sheet
    returning.entries = await knex.raw(`select json_agg(entries) as entries from (select * from entries where sheet_id = ${reqId}) as entries`).then(data => {
      if (data.rows[0].entries === null) {
        res.status(400).send(`there is no data here in entries for ${reqId}`)
        return null
      }

      return data.rows[0].entries.map(entry => {
        entry.values = []
        entry.entry_id = entry.id
        delete entry.id
        return entry
      })
    })

    if (returning.entries !== null) {
      values.forEach(value => {
        returning.entries.map((entry) => {
          if (value.entry_id === entry.entry_id) {
            entry.values.push(value)
          }
        })

      });
    } else {
      return
    }
    res.status(200).json(returning);
  } else {
    res.status(400).send(`request Error: reqId = ${reqId}, is not found or is not an sheet id`)
  }
};

const requestAllSheet = (req, res) => {
  knex("sheets")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    });
}

const requestUserSheets = async (req, res) => {
  let currentUser = await requestCurrentUser(req.user.user_id)
  if (currentUser.length !== 0) {
    let { id } = currentUser[0]

    knex('user_roles')
      .join('sheets', 'user_roles.sheet_id', 'sheets.id')
      .select('user_roles.sheet_id', 'sheets.name', 'sheets.short_name')
      .where({ user_id: id })
      .then(data => {
        res.status(200).send(data)
      })
  } else {
    res.status(200).send(`No user`)
  }
}

const add = async (req, res) => {
  let newSheet = req.body;
  let currentUser = await requestCurrentUser(req.user.user_id)
  if (currentUser.length !== 0) {
    let { id } = currentUser[0]

    knex('sheets')
      .insert(newSheet)
      .returning('id')
      .then((newSheetId) => {
        return knex('user_roles')
          .insert({ user_id: parseInt(id), role_name: "admin", sheet_id: newSheetId[0].id })
          .then(() => res.status(200).send(`New sheet has been added`))
      })
  } else {
    res.status(200).send(`No user`)
  }

};

// TODO make work
const addUserRole = async (req, res) => {
  const targetId = req.params.sheet_id;
  const { users } = req.body;
  let flag = false;
  let results = [];

  await users.forEach(user => {
    knex('users')
      .select('id')
      .where({ id: user.user_id })
      .then(data => {
        if (data.length > 0) {
          knex('user_roles')
            .select('*')
            .where({ user_id: user.user_id, sheet_id: targetId })
            .then(data => {
              if (data.length === 0) {
                return knex('user_roles')
                  .insert({ user_id: user.user_id, role_name: user.role_name, sheet_id: targetId })
                  .then(() => {
                    flag = true;
                    results.push(flag);
                  })
              } else {
                flag = false;
                results.push(flag);
              }
              return flag
            })
            .then(data => console.log(data))
        }
      })
  })
 

  res.status(201).json(`user role has been added`)

};

const remove = (req, res) => {
  res.status(200).send(`${req.method} - remove`);
};
const edit = async (req, res) => {
  const targetId = req.params.sheet_id

  const { name, short_name } = req.body
  let flag = false

  if (name) {
    await knex('sheets')
      .select('*')
      .where({ id: targetId })
      .update({ name: name })
      .then(() => flag = true)

  }

  if (short_name) {
    await knex('sheets')
      .select('*')
      .where({ id: targetId })
      .update({ short_name: short_name })
      .then(() => flag = true)
  }

  await knex('sheets')
    .select('id')
    .where({ id: targetId })
    .then((data) => {
      if (data.length === 0) {
        flag = false;
      }
    })

  if (flag) {
    res.status(200).json('Sheet has been updated')
  } else {
    res.status(400).send('error')
  }

};

export { requestAllSheet, requestSheetData, requestUserSheets, add, remove, edit, addUserRole };