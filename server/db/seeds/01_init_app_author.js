/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  await knex.schema.raw('TRUNCATE app_authors CASCADE')
  await knex('app_authors').del()
  await knex('app_authors').select('*')
    .then((rows) => {
      if (rows.length === 0) {
        return knex('app_authors').insert([
          {first_name: 'Dayan', last_name: 'Sauerbronn'},
          {first_name: 'Daniel', last_name: 'Salazar'},
          {first_name: 'Kyle', last_name: 'Dilick'},
          {first_name: 'Kevin', last_name: 'Wolfe'},
          {first_name: 'Levi', last_name: 'Fry'}
        ]);
      }
    })
}
