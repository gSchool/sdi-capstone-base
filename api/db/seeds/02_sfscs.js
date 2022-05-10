/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('award_packages').del()
  await knex('users_mentors').del()
  await knex('users').del()
  await knex('awards').del()
  await knex('requirements').del()
  await knex('sfscs').del()
  await knex('sfscs').insert([
    {code: '5C0X1-K', title: 'Cybersecurity Analyst'},
    {code: '5C0X1-C', title: 'Cyber Operations'},
    {code: '5C0X1-S', title: 'Systems Administrator'},
    {code: '17S', title: 'Cyberspace Effects'},
    {code: '17D', title: 'Cyberspace Operations'}
  ]);
};
