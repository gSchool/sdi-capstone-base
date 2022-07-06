/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("sheets").del();
  await knex("sheets").insert([{ name: "Sheet1", short_name: 'sht', templates: "none" }]);
}
