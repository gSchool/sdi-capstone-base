/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("crew_positions", (table) => {
      table.increments("id").primary();
      table.string('name', 50).notNullable(); 
      table.string('description', 50).notNullable();
      table.timestamps(true, true); 
    }
  )};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('crew_positions');
};
