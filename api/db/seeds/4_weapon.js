/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('weapon').del()
  await knex('weapon').insert([
    {name: 'm4', type: 'rifle', ammo: '5.56X45mm'},
    {name: 'm18', type: 'pistol', ammo: '9mm'},
    {name: 'X26P', type: 'tazer', ammo: 'cartridge'},
    {name: 'm249', type: 'machine gun', ammo: '5.56X45mm'},
    {name: 'm240', type: 'machine gun', ammo: '7.62X51mm'},
    {name: 'm107', type: 'sniper rifle', ammo: '.50 Cal'},
    {name: 'm320', type: 'grenade launcher', ammo: '40mm'}

  ]);
};
