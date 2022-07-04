/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  await knex('posts').select('*')
    .then((rows) => {
      if (rows.length === 0) {
        return knex('posts').insert([
          {title: 'hi', content: 'some content', date: 'July 4, 2022', user_id: 1}
        ]);
      }
    })
}