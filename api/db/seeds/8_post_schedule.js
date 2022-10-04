/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('post_schedule').del()
  await knex('post_schedule').insert([
    {position_id: 1, user_id: 1, date: "2022-10-22", time: '06:00'},
    {position_id: 1, user_id: 2, date: "2022-10-22", time: '06:00'},
    {position_id: 2, user_id: 3, date: "2022-10-22", time: '18:00'},
    {position_id: 2, user_id: 4, date: "2022-10-22", time: '18:00'},
    {position_id: 3, user_id: 5, date: "2022-10-23", time: '06:00'},
    {position_id: 3, user_id: 6, date: "2022-10-23", time: '06:00'},
    {position_id: 4, user_id: 7, date: "2022-10-23", time: '18:00'},
    {position_id: 4, user_id: 8, date: "2022-10-23", time: '18:00'},
  ]);
};

// table.date('date');
// table.time('shift');