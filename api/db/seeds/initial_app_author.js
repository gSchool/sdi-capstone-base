/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').select('*')
    .then((rows) => {
      if (rows.length === 0) {
        return knex('users').insert([
          {first_name: 'Cybyl', last_name: 'Hancock', username: 'cjhanc15', password: '12345'}
        ]);
      }
    })
};
