/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('weapon_user').del()
  await knex('weapon_user').insert([
    {weapon_id: 1, user_id: 1},
    {weapon_id: 2, user_id: 1},
    {weapon_id: 1, user_id: 2},
    {weapon_id: 2, user_id: 2},
    {weapon_id: 1, user_id: 3},
    {weapon_id: 2, user_id: 3},
    {weapon_id: 4, user_id: 3},
  ]);
};


