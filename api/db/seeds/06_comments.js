/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('comments').insert([
    {
      task_id: 2, 
      body: "Snow on sidewalks and in parking has to be shoveled",
      user_id: 2,
    }
  ]);
};
