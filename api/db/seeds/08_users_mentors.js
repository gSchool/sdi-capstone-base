/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users_mentors').del()
  await knex('users_mentors').insert([
    {user_id: 1, mentor_id: 1},
    {user_id: 2, mentor_id: 2},
    {user_id: 3, mentor_id: 3}, 
    {user_id: 4, mentor_id: 4}, 
    {user_id: 5, mentor_id: 5} 
  ]);
};
