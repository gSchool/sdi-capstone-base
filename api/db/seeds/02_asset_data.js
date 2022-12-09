/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('asset').insert([
    { asset_name: 'Satellite', description: 'Powered by on-board processing and resilient connectivity, this tactical ISR satellite line enables in-theater, low-latency sensor tasking, on-orbit processing of mission data, protected communications and direct downlink of situational awareness and targeting information, increasingly essential to shortening the sensor-to-shooter timeline against fleeting targets.', type: 'ISR', image_url: 'https://wallpapercave.com/wp/wp3261494.jpg' },
    { asset_name: 'Aerial', description: 'ISR and EW platforms provide modern and advanced integration techniques fusing on-board and off-board collection and targeting data into customized airborne mission system solutions.', type: 'ISR', image_url: 'https://static.dw.com/image/54071362_1006.jpg' },
    { asset_name: 'Satcom', description: '', type: 'Communications', image_url: 'https://www.getsat.com/wp-content/uploads/2020/05/HBH_5422_resize-768x509.jpg' },
    { asset_name: 'Networking', description: '', type: 'Communications', image_url: 'https://api.army.mil/e2/c/images/2017/10/17/495732/size0-full.jpg' },
    { asset_name: 'Mobile Device', description: '', type: 'Communications', image_url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTIf_obnebJ2Hu7jakchxUp8TMAV0lP-fU_zBNXTX0-qu8WlvNn' },
    { asset_name: 'Desktop', description: '', type: 'Communications', image_url: 'https://www.stealth.com/wp-content/uploads/2020/07/SBXI-173-front1-web.jpg' },
    { asset_name: 'CSfC', description: '', type: 'Communications', image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnJxHCzfTPLCkWOH2GSFhYyEk8_rDyo_paV9gdJgVGSyaew6iM8Z7vqKKwdl3bIW3G69A&usqp=CAU' },
    { asset_name: 'Fixed Wing', description: '', type: 'Transportation', image_url: 'https://www.ngaus.org/sites/default/files/styles/cover_image/public/2020-02/C-130.jpg?itok=BQ2eQJga' },
    { asset_name: 'Rotary Wing', description: '', type: 'Transportation', image_url: 'https://www.usnews.com/dims4/USNEWS/e0b7dfd/2147483647/thumbnail/970x647/quality/85/?url=https%3A%2F%2Fwww.usnews.com%2Fcmsmedia%2Fdb%2F76c915a8f3bd84992195c774818888%2Ftag%3Areuters.com%2C2022%3Anewsml_LYNXNPEI4P0WA%3A12022-05-26T193116Z_1_LYNXNPEI4P0WA_RTROPTP_3_UKRAINE-CRISIS-POLAND-USA-TROOPS.JPG' },
    { asset_name: 'Sea', description: '', type: 'Transportation', image_url: 'https://i.insider.com/61ddcebf1025b20018bb3372?width=1136&format=jpeg' },
    { asset_name: 'Ground', description: '', type: 'Transportation', image_url: 'https://images02.military.com/sites/default/files/styles/full/public/defensetech-thumbnails/2016/05/polaris-mrzr-1-777x437.jpg' },
    { asset_name: 'SRT', description: '', type: 'Medical', image_url: 'https://i0.wp.com/cms.sofrep.com/wp-content/uploads/2017/10/161130-F-XE708-002.jpg?fit=888%2C554&ssl=1&w=800' },
    { asset_name: 'Medic', description: '', type: 'Medical', image_url: 'https://mwi.usma.edu/wp-content/uploads/2019/10/5675605-1200x640.jpg' },
    { asset_name: 'Medical Equipment', description: '', type: 'Medical', image_url: 'https://rampartcorp.com/wp-content/uploads/2020/01/MED-2022.png' },
    { asset_name: 'Fixed Wing', description: '', type: 'Fires', image_url: 'https://images4.alphacoders.com/414/thumb-1920-41416.jpg' },
    { asset_name: 'Artillery', description: '', type: 'Fires', image_url: 'https://www.armytimes.com/resizer/xPdZEjz9BfXE1C_o7cT9KWJbafw=/1024x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/archetype/J6IZPIEDJ5CSHDZ3OTJHL36PWM.jpg' },
    { asset_name: 'Rotary', description: '', type: 'Fires', image_url: 'https://images.squarespace-cdn.com/content/v1/5c2ac227f8370a65dababbb1/c23812bb-8c89-4657-93f6-1e136a57c23d/what-you-need-to-know-about-the-ah-64-apache-helicopter.png?format=1000w' },
    { asset_name: 'Mortars', description: '', type: 'Fires', image_url: 'https://i.insider.com/5e4c31f24b661b0dbf6b6682?width=1000&format=jpeg&auto=webp' },
    { asset_name: 'Naval', description: '', type: 'Fires', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Uss_iowa_bb-61_pr.jpg/1200px-Uss_iowa_bb-61_pr.jpg' },
    { asset_name: 'Cooks', description: '', type: 'Personnel', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/U.S._Army_Spc._Michael_Royster%2C_a_cook_assigned_to_the_46th_Aviation_Support_Battalion_%28ASB%29%2C_serves_food_inside_the_16th_Combat_Aviation_Brigade_containerized_kitchen_to_46th_ASB_Soldiers_during_the_field_130625-A-XP915-006.jpg/1024px-thumbnail.jpg' },
    { asset_name: 'Maintenance', description: '', type: 'Personnel', image_url: 'https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/1803/4223807/1000w_q95.jpg' },
    { asset_name: 'QRF', description: '', type: 'Personnel', image_url: 'https://store.kwausa.com/wp-content/uploads/2019/08/QRF-MOD-LOGO-PNG.png' },
    { asset_name: 'Recon', description: '', type: 'Personnel', image_url: 'https://s.yimg.com/aah/militarybest/us-army-recon-tab-sticker-decal-33.gif' },
  ]);
};
