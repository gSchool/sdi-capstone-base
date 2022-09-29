/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('weapon_user', table => {
        table.increments('id');
        table.integer('weapon_id');
        table.integer('user_id');
        table.foreign('weapon_id').references('id').inTable('weapon')
        table.foreign('user_id').references('id').inTable('user_table')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('weapon_user', table => {
        table.dropForeign('weapon_id');
        table.dropForeign('user_id');
    })
      .then(()=>{
        return knex.schema.dropTableIfExists('weapon_user');
      })
};
