/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('asset').insert([
    { id: 1, asset_name: 'Satellite', description: 'Powered by on-board processing and resilient connectivity, this tactical ISR satellite line enables in-theater, low-latency sensor tasking, on-orbit processing of mission data, protected communications and direct downlink of situational awareness and targeting information, increasingly essential to shortening the sensor-to-shooter timeline against fleeting targets.', type: 'ISR', image_url: 'https://wallpapercave.com/wp/wp3261494.jpg' },
    { id: 2, asset_name: 'Aerial', description: 'ISR and EW platforms provide modern and advanced integration techniques fusing on-board and off-board collection and targeting data into customized airborne mission system solutions.', type: 'ISR', image_url: 'https://static.dw.com/image/54071362_1006.jpg' },
    { id: 3, asset_name: 'Satcom', description: '', type: 'Communications', image_url: 'https://www.getsat.com/wp-content/uploads/2020/05/HBH_5422_resize-768x509.jpg' },
    { id: 4, asset_name: 'Networking', description: '', type: 'Communications', image_url: 'https://api.army.mil/e2/c/images/2017/10/17/495732/size0-full.jpg' },
    { id: 5, asset_name: 'Mobile Device', description: '', type: 'Communications', image_url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTIf_obnebJ2Hu7jakchxUp8TMAV0lP-fU_zBNXTX0-qu8WlvNn' },
    { id: 6, asset_name: 'Desktop', description: '', type: 'Communications', image_url: 'https://www.stealth.com/wp-content/uploads/2020/07/SBXI-173-front1-web.jpg' },
    { id: 7, asset_name: 'CSfC', description: '', type: 'Communications', image_url: '' },
    { id: 8, asset_name: 'Fixed Wing', description: '', type: 'Transportation', image_url: '' },
    { id: 9, asset_name: 'Rotary Wing', description: '', type: 'Transportation', image_url: '' },
    { id: 10, asset_name: 'Sea', description: '', type: 'Transportation', image_url: '' },
    { id: 11, asset_name: 'Ground', description: '', type: 'Transportation', image_url: '' },
    { id: 12, asset_name: 'SRT', description: '', type: 'Medical', image_url: '' },
    { id: 13, asset_name: 'Medic', description: '', type: 'Medical', image_url: '' },
    { id: 14, asset_name: 'Medical Equipment', description: '', type: 'Medical', image_url: '' },
    { id: 15, asset_name: 'Fixed Wing', description: '', type: 'Fires', image_url: '' },
    { id: 16, asset_name: 'Artillery', description: '', type: 'Fires', image_url: '' },
    { id: 17, asset_name: 'Rotary', description: '', type: 'Fires', image_url: '' },
    { id: 18, asset_name: 'Mortars', description: '', type: 'Fires', image_url: '' },
    { id: 19, asset_name: 'Naval', description: '', type: 'Fires', image_url: '' },
    { id: 20, asset_name: 'Cooks', description: '', type: 'Personnel', image_url: '' },
    { id: 21, asset_name: 'Maintenance', description: '', type: 'Personnel', image_url: '' },
    { id: 22, asset_name: 'QRF', description: '', type: 'Personnel', image_url: '' },
    { id: 23, asset_name: 'Recon', description: '', type: 'Personnel', image_url: '' },
  ]);
};
