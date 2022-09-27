/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('weapon').del()
  await knex('weapon').insert([
    {weapon: 'm4', type: 'rifle', ammo: '5.56X45mm'},
    {weapon: 'm18', type: 'pistol', ammo: '9mm'},
    {weapon: 'X26P', type: 'tazer', ammo: 'cartridge'},
    {weapon: 'm249', type: 'machine gun', ammo: '5.56X45mm'},
    {weapon: 'm240', type: 'machine gun', ammo: '7.62X51mm'},
    {weapon: 'm107', type: 'sniper rifle', ammo: '.50 Cal'},
    {weapon: 'm320', type: 'grenade launcher', ammo: '40mm'}

  ]);
};
