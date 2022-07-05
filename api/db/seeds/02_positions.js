/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('positions').insert([
    {name: "member"},
    {name: "supervisor"},
    {name: "admin"},
  ]);
};
