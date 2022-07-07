/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').insert([
    {
      title: "submission for NCO of the Quarter", 
      description: "1206 due to flt/cc for NCO of the Quarter award. 1206 should have 4 job bullets and 2 whole airman concept bullets", 
      priority: 3, 
      assigned_date: new Date("2022-07-05"), 
      suspense_date:new Date("2022-07-25"), 
      status: "to do", 
      org_id: 1,
      author_id: 3,
    },
    {
      title: "Base Cleanup", 
      description: "Clean ENT street", 
      priority: 2, 
      assigned_date: new Date("2022-07-06"), 
      suspense_date:new Date("2022-07-14"), 
      status: "in progress", 
      org_id: 1,
      author_id: 3,
    },
    {
      title: "Snow Duty", 
      description: "Complete by EOD", 
      priority: 3, 
      assigned_date: new Date('2022-01-08',), 
      suspense_date: new Date('2022-01-09'), 
      status: "in progress", 
      org_id: 3,
      author_id: 3,
    },
  ]);
};

/* 
  possible status:
  [
    "to do",
    "in progress",
    "finished"
  ]
*/
