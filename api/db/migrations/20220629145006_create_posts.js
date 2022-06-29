/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('posts', table => {
      table.increments();
      table.string('title', 250);
      table.string('content', 250);
      table.integer('user_id');
      table.foreign('user_id').references('users.id');

  })
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};
