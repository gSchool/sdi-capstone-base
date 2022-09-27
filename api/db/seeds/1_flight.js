/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('flight').del()
  await knex('flight').insert([
    {flight: 'alpha-1'},
    {flight: 'alpha-2'},
    {flight: 'bravo-1'},
    {flight: 'bravo-2'},
    {flight: 'charlie-1'},
    {flight: 'charlie-2'},
  ]);
};
