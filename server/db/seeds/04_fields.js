/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("fields").del();
  await knex("fields").insert([
    { field_type: "string", sheet_id: 1, value: "columnOne" },
  ]);
}
