/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  await knex('posts').select('*')
    .then((rows) => {
      if (rows.length === 0) {
        return knex('posts').insert([
          {title: 'hi', content: 'some content', user_id: 1}
        ]);
      }
    })
}