/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("values", (table) => {
    table.increments();
    table.string("value");
    table.integer("field_id");
    table.foreign("field_id").references("fields.id");
    table.integer("entry_id");
    table.foreign("entry_id").references("entries.id");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .alterTable("values", (table) => {
      table.dropForeign("entry_id");
      table.dropForeign("field_id");
    })
    .then(() => {
      return knex.schema.dropTableIfExists("values");
    });
}
