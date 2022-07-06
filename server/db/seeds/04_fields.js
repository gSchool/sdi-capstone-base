/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("fields").del();
  await knex("fields").insert([
    { type: "string", sheet_id: 1, name: "columnOne" },
    { type: "string", sheet_id: 1, name: "columnTwo" },
    { type: "string", sheet_id: 1, name: "columnThree" },
  ]);
}
