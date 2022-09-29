/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('position').del()
  await knex('position').insert([
    {name: 'Golf_1', man_req: 2 },
    {name: 'Golf_2', man_req: 2 },
    {name: 'Golf_3', man_req: 2 },
    {name: 'Security_1', man_req: 1 },
    {name: 'Security_2', man_req: 1 },
    {name: 'Security_3', man_req: 1 },
    {name: 'Security_4', man_req: 1 },
    {name: 'BDOC', man_req: 1 },
    {name: 'Flight Chief', man_req: 1 },
  ]);
};
