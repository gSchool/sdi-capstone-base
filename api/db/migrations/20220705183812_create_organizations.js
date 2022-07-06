/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('organizations', table =>{
    table.increments();
    table.string('name', 250)
    table.string('img_url', 250)
    table.integer('parent_id')
    table.foreign('parent_id').references('organizations.id')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('organizations', table => {
    table.dropForeign('parent_id')
   
})
.then(function () {
return knex.schema.dropTableIfExists('organizations');
})
};
