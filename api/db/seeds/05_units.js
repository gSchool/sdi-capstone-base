/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('units').del()
  await knex('units').insert([
    {office_symbol: 'DOO-A', name: '61 CYS', street_address: '210 Falcon Pkwy', base: 'Schreiver SFB', state: 'CO', zipcode: 80912, cc_user_id: null},
    {office_symbol: 'CYC', name: '65 CYS', street_address: '816 13th St', base: 'Vandenberg SFB', state: 'CA', zipcode: 93437, cc_user_id: null},
    {office_symbol: 'DAU', name: '45 CYS', street_address: '180 W Skid Strip Rd. Patrick AFB, Florida 32925, US', base: 'Patrick AFB', state: 'FL', zipcode: 32925, cc_user_id: null},
    {office_symbol: 'IDK', name: '62 CYS', street_address: '', base: 'Buckley SFB', state: 'CO', zipcode: 80011, cc_user_id: null}
  ]);
};
