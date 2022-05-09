/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('requirements').del()
  await knex('requirements').insert([
    {sfscs_code: '5C0X1-K', rank_category: 'Junior Enlisted', demographic: 'Age'},
    {sfscs_code: '5C0X1-C', rank_category: 'NCO', demographic: 'Religion'},
    {sfscs_code: '5C0X1-S', rank_category: 'SNCO', demographic: 'Ethnicity'},
    {sfscs_code: '17S', rank_category: 'CGO', demographic: 'Gender'},
    {sfscs_code: '17D', rank_category: 'FGO', demographic: 'Gender'}
  ]);
};
