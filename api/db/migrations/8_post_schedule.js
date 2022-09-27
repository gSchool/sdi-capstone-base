/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('post_schedule', table => {
        table.integer('position_id');
        table.integer('user_id');
        table.foreign('user_id').references('id').inTable('user_table');
        table.foreign('position_id').references('id').inTable('position');
        table.string('date');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('post_schedule', table => {
        table.dropForeign('position_id');
        table.dropForeign('user_id');
    })
      .then(()=>{
        return knex.schema.dropTableIfExists('post_schedule');
      })
};
