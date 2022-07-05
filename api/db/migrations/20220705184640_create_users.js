/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table =>{
    table.increments();
    table.string('name', 250)
    table.string('rank', 250)
    table.string('email', 250)
    table.integer('org_id')
    table.foreign('org_id').references('organizations.id')
    table.integer('position_id')
    table.foreign('position_id').references('positions.id')
    table.string('password', 250)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('users', table => {
    table.dropForeign('org_id')
    table.dropForeign('position_id')
  })
  .then(function () {
    return knex.schema.dropTableIfExists('users');
  })
};


/* return knex.schema.alterTable('organizations', table => {
    table.dropForeign('id_commander')
    table.dropForeign('parent_id')
  })
  .then(function () {
    return knex.schema.dropTableIfExists('organizations');
  })
   */