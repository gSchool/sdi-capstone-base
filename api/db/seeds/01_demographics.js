/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('demographics').del()
  await knex('demographics').insert([
    {name: 'Age'},
    {name: 'Gender'},
    {name: 'Ethnicity'},
    {name: 'Religion'}
  ]);
};
