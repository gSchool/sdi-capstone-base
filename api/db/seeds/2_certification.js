/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('certification').del()
  await knex('certification').insert([
    {cert: 'Entry Controller'},
    {cert: 'Patrol'},
    {cert: 'Desk'},
    {cert: 'Flight Sergeant'},
  ]);
};
