/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('weapon_position').del()
  await knex('weapon_position').insert([
    {weapon_id: 1, position_id: 1},
  ]);
};
