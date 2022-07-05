/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('comments', table =>{
        table.increments()
        table.string('body', 1000)
        table.integer('task_id')
        table.foreign('task_id').references('tasks.id')
        table.integer('parent_id')
        table.foreign('parent_id').references('comments.id')
        table.integer('user_id')
        table.foreign('user_id').references('users.id')
        table.timestamp('timestamp').defaultTo(knex.fn.now())
      }
)};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('comments', table => {
        table.dropForeign('task_id')
        table.dropForeign('parent_id')
        table.dropForeign('user_id')
    })
    .then(function () {
    return knex.schema.dropTableIfExists('comments');
    })
};
