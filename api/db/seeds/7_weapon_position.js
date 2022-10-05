/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('weapon_position').del()
  await knex('weapon_position').insert([
    {weapon_id: 1, position_id: 1},
    {weapon_id: 2, position_id: 1},
    {weapon_id: 1, position_id: 2},
    {weapon_id: 2, position_id: 2},
    {weapon_id: 1, position_id: 3},
    {weapon_id: 2, position_id: 3},
    {weapon_id: 1, position_id: 4},
    {weapon_id: 1, position_id: 5},
    {weapon_id: 2, position_id: 5},
    {weapon_id: 1, position_id: 6},
    {weapon_id: 2, position_id: 6},
    {weapon_id: 1, position_id: 7},
    {weapon_id: 2, position_id: 7},
    {weapon_id: 1, position_id: 8},
    {weapon_id: 1, position_id: 9},
  ]);
};
