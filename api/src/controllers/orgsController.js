const env = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[env]
const knex = require('knex')(config)

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
const add = (req, res) => {
    
}
const update = (req, res) => {
    
}
const remove = (req, res) => {
    
}

module.exports = { request, add, update, remove }