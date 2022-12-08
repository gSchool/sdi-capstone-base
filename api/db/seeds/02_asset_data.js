/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { faker } = require('@faker-js/faker');

const createFakeAssets = () => {
  return faker.commerce.description;
}


exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('asset').insert([
    { id: 1, asset_name: 'Satellite', description: createFakeAssets(), type: 'ISR', image_url: '' },
    { id: 2, asset_name: 'Aerial', description: createFakeAssets(), type: 'ISR', image_url: '' },
    { id: 3, asset_name: 'Satcom', description: createFakeAssets(), type: 'Communications', image_url: '' },
    { id: 4, asset_name: 'Networking', description: createFakeAssets(), type: 'Communications', image_url: '' },
    { id: 5, asset_name: 'Mobile Device', description: createFakeAssets(), type: 'Communications', image_url: '' },
    { id: 6, asset_name: 'Desktop', description: createFakeAssets(), type: 'Communications', image_url: '' },
    { id: 7, asset_name: 'CSfC', description: createFakeAssets(), type: 'Communications', image_url: '' },
    { id: 8, asset_name: 'Fixed Wing', description: createFakeAssets(), type: 'Transportation', image_url: '' },
    { id: 9, asset_name: 'Rotary Wing', description: createFakeAssets(), type: 'Transportation', image_url: '' },
    { id: 10, asset_name: 'Sea', description: createFakeAssets(), type: 'Transportation', image_url: '' },
    { id: 11, asset_name: 'Ground', description: createFakeAssets(), type: 'Transportation', image_url: '' },
    { id: 12, asset_name: 'SRT', description: createFakeAssets(), type: 'Medical', image_url: '' },
    { id: 13, asset_name: 'Medic', description: createFakeAssets(), type: 'Medical', image_url: '' },
    { id: 14, asset_name: 'Medical Equipment', description: createFakeAssets(), type: 'Medical', image_url: '' },
    { id: 15, asset_name: 'Fixed Wing', description: createFakeAssets(), type: 'Fires', image_url: '' },
    { id: 16, asset_name: 'Artillery', description: createFakeAssets(), type: 'Fires', image_url: '' },
    { id: 17, asset_name: 'Rotary', description: createFakeAssets(), type: 'Fires', image_url: '' },
    { id: 18, asset_name: 'Mortars', description: createFakeAssets(), type: 'Fires', image_url: '' },
    { id: 19, asset_name: 'Naval', description: createFakeAssets(), type: 'Fires', image_url: '' },
    { id: 20, asset_name: 'Cooks', description: createFakeAssets(), type: 'Personnel', image_url: '' },
    { id: 21, asset_name: 'Maintenance', description: createFakeAssets(), type: 'Personnel', image_url: '' },
    { id: 22, asset_name: 'QRF', description: createFakeAssets(), type: 'Personnel', image_url: '' },
    { id: 23, asset_name: 'Recon', description: createFakeAssets(), type: 'Personnel', image_url: '' },
  ]);
};
