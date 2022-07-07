const env = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[env]
const knex = require('knex')(config)

const checkKeys = (validKeys, bodyKeys) => {
    console.log(validKeys)
    console.log(bodyKeys)
    return bodyKeys.every((element) => {
      return validKeys.includes(element);
    });
  };

const request = (req, res) => {
    console.log(`request for /orgs`)
    // {id, img_url, name, parent_id, parent_name}
    knex('organizations as org')
    .leftJoin('organizations as parent', 'parent.id', 'org.parent_id')
    .select(
        'org.id as org_id',
        'org.img_url as org_img_url',
        'org.name as org_name',
        'org.parent_id as org_parent_id',
        'parent.name as parent_name'
    )
    .then(data => {
        res.set("Access-Control-Allow-Origin", "*");
        res.status(200).send(data)
    })
}
const add = (req, res) => { //add is done, but not check
    let body = req.body

    if (body.parent_id) { //check for foriegn key of parent org
        (knex('organizations')
          .select('*')
          .where('id', '=', body.parent_id)
          .then(data => {
            console.log('data: ', data)

            if (data.length > 0) {
                knex('organizations')
                .insert({
                    img_url : body.img_url,
                    name : body.name,
                    parent_id : body.parent_id
                })
                .returning('*')
                .then((data) => {
                    res.status(200).send(data)
                })
            } else {
              res.status(301).send("invalid parent org")
            }
          }))
      }
}
const update = (req, res) => {

    let body = req.body
    if (body.parent_id) { //check for foriegn key of parent org
        (knex('organizations')
          .select('*')
          .where('id', '=', body.parent_id)
          .then(data => {
            console.log('data: ', data)

            if (data.length > 0 && checkKeys(["img_url", "name", "parent_id"], Object.keys(body))) {
                knex('organizations')
                .update(body)
                .returning('*')
                .then((data) => {
                    res.status(200).send(data)
                })
            } else {
              res.status(301).send("invalid parent org or keys")
            }
          }))
      }else{
        if (checkKeys(["img_url", "name", "parent_id"], Object.keys(body))) {
            knex('organizations')
            .update(body)
            .returning('*')
            .then((data) => {
                res.status(200).send(data)
            })
        } else {
          res.status(301).send("invalid parent org or keys")
        }
      }
}
const remove = (req, res) => {
    console.log(`working on delete for 'organizations/${req.params.id}'`)
  knex('users')
    .where('org_id', '=', req.params.id)
    .update({ org_id: null })
    .then(() => {
      knex('organizations')
        .where('parent_id', '=', req.params.id)
        .update({ parent_id: null })
        .then(() => {
          knex('organizations')
            .where('id', '=', parseInt(req.params.id))
            .del()
            .then(data => {
              res.status(200).json(`Number of records deleted: ${data}`);
            })

        })
    })
    
}

module.exports = { request, add, update, remove }