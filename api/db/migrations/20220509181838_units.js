/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('units', table => {
    table.increments('id');
    table.string('office_symbol', 10);
    table.string('name', 100);
    table.string('street_address', 250);
    table.string('base', 50);
    table.string('state', 2);
    table.integer('zipcode');
    table.integer('cc_user_id');
    table.foreign('cc_user_id').references('users.id')
  })
  .then(function() {
    return knex.schema.alterTable('users', table => {
      table.foreign('unit_id').references('units.id');
    })
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('units', table => {
    table.dropForeign('cc_user_id')
  })
  .then(function() {
    return knex.schema.dropTableIfExists('units')
  })
};
