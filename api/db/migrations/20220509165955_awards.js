/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('awards', table => {
    table.increments('id');
    table.string('title', 250);
    table.text('description');
    table.integer('requirements_id');
    table.foreign('requirements_id').references('requirements.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('awards', table => {
    table.dropForeign('requirements_id')
  })
  .then(function() {
    return knex.schema.dropTableIfExists('awards');
  })
};
