/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('tasks', table =>{
    table.increments();
    table.string('title', 250)
    table.string('description', 1000)
    table.integer('priority')
    table.timestamp('assigned_date').defaultTo(knex.fn.now())
    table.timestamp('suspense_date')
    table.timestamp('completed_date')
    table.string('status', 250)
    table.integer('org_id')
    table.foreign('org_id').references('organizations.id')
    table.integer('author_id')
    table.foreign('author_id').references('users.id')
  })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.alterTable('tasks', table => {
        table.dropForeign('org_id')
        table.dropForeign('author_id')
      })
      .then(function () {
        return knex.schema.dropTableIfExists('tasks');
      })
  };
  