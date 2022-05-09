/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('award_packages', table => {
    table.increments('id');
    table.integer('user_id');
    table.foreign('user_id').references('users.id');
    table.integer('award_id');
    table.foreign('award_id').references('awards.id');
    table.text('award_text');
    table.text('comments');
    table.boolean('is_completed');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('award_packages', table => {
    table.dropForeign('user_id')
    table.dropForeign('award_id');
  })
  .then(function() {
    return knex.schema.dropTableIfExists('award_packages');
  })
};
