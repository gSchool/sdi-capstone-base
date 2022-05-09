/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users_mentors', table => {
    table.integer('user_id');
    table.foreign('user_id').references('users.id');
    table.integer('mentor_id');
    table.foreign('mentor_id').references('users.id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('users_mentors', table => {
    table.dropForeign('user_id');
    table.dropForeign('mentor_id');
  })
  .then(function() {
    return knex.schema.dropTableIfExists('users_mentors')
  })
};
