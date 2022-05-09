/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('awards').del()
  await knex('awards').insert([
    {title: 'Junior Enlisted - Guardian of the Quarter', description: 'A quarterly award presented to a single outstanding guardian in the junior enlisted tier.', requirements_id: 1},
    {title: 'Junior Enlisted - Guardian of the Year', description: 'An annual award presented to a single outstanding guardian in the junior enlisted tier.', requirements_id: 1},
    {title: 'NCO - Guadian of the Quarter', description: 'A quarterly award presented to a single outstanding guardian in the NCO tier.', requirements_id: 2},
    {title: 'NCO - Guadian of the Year', description: 'An annual award presented to a single outstanding guardian in the NCO tier.', requirements_id: 2},
    {title: 'SNCO - Guardian of the Quarter', description: 'A quarterly award presented to a single outstanding guardian in the SNCO tier.', requirements_id: 3},
    {title: 'SNCO - Guardian of the Year', description: 'An annual award presented to a single outstanding guardian in the SNCO tier.', requirements_id: 3},
    {title: 'CGO - Guardian of the Quarter', description: 'A quarterly award presented to a single outstanding guardian in the CGO tier.', requirements_id: 4},
    {title: 'CGO - Guardian of the Year', description: 'An annual award presented to a single outstanding guardian in the CGO tier.', requirements_id: 4},
    {title: 'FGO - Guardian of the Quarter', description: 'A quarterly award presented to a single outstanding guardian in the FGO tier.', requirements_id: 5},
    {title: 'FGO - Guardian of the Year', description: 'An annual award presented to a single outstanding guardian in the FGO tier.', requirements_id: 5}
  ]);
};
