/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string('first_name', 50).notNullable(); 
    table.string('last_name', 50).notNullable();
    table.string('email', 50).notNullable();
    table.integer('phone_number').notNullable();
    table.enu('role', ['member', 'leader'], { useNative: true, enumName: 'role' }).notNullable();
    table.string('rank', 10).notNullable();
    table.string('username', 20).unique().notNullable();
    table.string('passwordHash', 250).notNullable(); 
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
  return knex.schema.alterTable('users', table => {
    table.dropForeign('crew_position_id');
    })
    .then(() => {
        return knex.schema.dropTableIfExists('users');
    });
};
