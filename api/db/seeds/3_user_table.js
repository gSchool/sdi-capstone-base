/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('user_table').select('*')
    .then((rows) => {
      if (rows.length === 0) {
        return knex('user_table').insert([
          {first_name: 'John', last_name: 'Doe', rank: 'e5', flight: 'alpha-1',cert_id: 4, weapon_arming: true, admin: true },
          {first_name: 'Jane', last_name: 'Doe', rank: 'e3', flight: 'alpha-1', cert_id: 3 , weapon_arming: false, admin: false},
          {first_name: 'Greg', last_name: 'Smith', rank: 'e6', flight: 'alpha-2' ,cert_id: 2, weapon_arming: true, admin: false },
          {first_name: 'Macy', last_name: 'Jones', rank: 'e4', flight: 'alpha-2' ,cert_id: 4, weapon_arming: true, admin: false },
          {first_name: 'George', last_name: 'Gigi', rank: 'e4', flight: 'bravo-1' , cert_id: 2, weapon_arming: true, admin: false },
          {first_name: 'Nick', last_name: 'Swartson', rank: 'e5', flight: 'bravo-1' , cert_id: 3, weapon_arming: true, admin: false },
          {first_name: 'Jermiah', last_name: 'Lastname', rank: 'e5', flight: 'bravo-2', cert_id: 4, weapon_arming: true, admin: false },
          {first_name: 'Logan', last_name: 'Paul', rank: 'e6', flight: 'bravo-2' , cert_id: 1 ,weapon_arming: true, admin: false },

        ]);
      }
    })
};
