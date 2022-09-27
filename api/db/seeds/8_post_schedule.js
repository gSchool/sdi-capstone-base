/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('post_schedule').del()
  await knex('post_schedule').insert([
    {position_id: 1, user_id: 1, date: "31oct22"},
  ]);
};
