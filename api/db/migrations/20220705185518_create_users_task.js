/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users_tasks', table =>{
    table.integer('user_id')
    table.foreign('user_id').references('users.id')
    table.integer('task_id')
    table.foreign('task_id').references('tasks.id')
  }
)};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('users_tasks', table => {
    table.dropForeign('user_id')
    table.dropForeign('task_id')
    })
    .then(function () {
    return knex.schema.dropTableIfExists('users_tasks');
    })
};
