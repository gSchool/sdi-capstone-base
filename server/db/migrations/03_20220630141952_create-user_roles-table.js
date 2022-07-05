/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("user_roles", (table) => {
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
    table.string("role_name", 255);
    table.integer("sheet_id");
    table.foreign("sheet_id").references("sheets.id");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .alterTable("user_roles", (table) => {
      table.dropForeign("user_id");
      table.dropForeign("sheet_id");
    })
    .then(() => {
      return knex.schema.dropTableIfExists("user_roles");
    });
}
