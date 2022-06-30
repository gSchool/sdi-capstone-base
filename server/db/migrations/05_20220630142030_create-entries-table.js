/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("entries", (table) => {
    table.increments();
    table.integer("sheet_id");
    table.foreign("sheet_id").references("sheets.id");
    table.boolean("archived").defaultTo(false);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .alterTable("entries", (table) => {
      table.dropForeign("sheet_id");
    })
    .then(() => {
      return knex.schema.dropTableIfExists("entries");
    });
}
