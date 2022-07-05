/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("values").del();
  await knex("values").insert([{ value: "this", field_id: 1, entry_id: 1 }]);
}
