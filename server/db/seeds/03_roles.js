/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("user_roles").del();
  await knex("user_roles").insert([
    { user_id: 1, role_name: "admin", sheet_id: 1 },
  ]);
}
