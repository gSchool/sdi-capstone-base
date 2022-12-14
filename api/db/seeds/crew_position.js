/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('crew_positions').del()
  await knex('crew_positions').insert([
    { name: 'commander', description: 'Crew Commander', created_at:knex.fn.now() , updated_at:knex.fn.now() }
    
  ]);
};
