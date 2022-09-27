/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('weapon_position', table => {
        table.integer('weapon_id');
        table.integer('position_id');
        table.foreign('weapon_id').references('id').inTable('weapon');
        table.foreign('position_id').references('id').inTable('position');

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('weapon_position', table => {
        table.dropForeign('weapon_id');
        table.dropForeign('position_id');
    })
      .then(()=>{
        return knex.schema.dropTableIfExists('weapon_position');
      })

    // return knex.schema.dropTableIfExists('weapon_position');
};
