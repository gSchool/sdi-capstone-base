/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("time_slots", (table) => {
      table.increments('id').primary();
      table.datetime('start_datetime').notNullable();  
      table.datetime('end_datetime').notNullable();
      table.enu('type', ['shift', 'replacement_needed', 'absent', 'unavailable'], { useNative: true, enumName: 'type' }).notNullable();
      table.string('description', 500).notNullable();
      table.integer('user_id').notNullable();
      table.foreign('user_id').references('users.id').onDelete('SET NULL');
      table.integer('crew_position_id').notNullable();
      table.foreign('crew_position_id').references('crew_positions.id').onDelete('SET NULL');
      table.timestamps(true, true); 
    }
  )};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('time_slots', table => {
    table.dropForeign('user_id');
    table.dropForeign('crew_position_id');
    })
    .then(() => {
        return knex.schema.dropTableIfExists('time_slots');
    });
};
