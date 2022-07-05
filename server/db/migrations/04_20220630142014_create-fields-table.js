/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("fields", (table) => {
    table.increments();
    table.string("field_type", 255);
    table.integer("sheet_id");
    table.foreign("sheet_id").references("sheets.id");
    table.boolean("archived").defaultTo(false);
    table.boolean("favorite").defaultTo(false);
    table.string("value", 255);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .alterTable("fields", (table) => {
      table.dropForeign("sheet_id");
    })
    .then(() => {
      return knex.schema.dropTableIfExists("fields");
    });
}
