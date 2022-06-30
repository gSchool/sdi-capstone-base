/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("entries").del();
  await knex("entries").insert([{ sheet_id: 1 }]);
}
