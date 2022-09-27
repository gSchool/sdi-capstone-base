/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('certification').del()
  await knex('certification').insert([
    {name: 'Entry Controller'},
    {name: 'Patrol'},
    {name: 'Desk'},
    {name: 'Flight Sergeant'},
  ]);
};
