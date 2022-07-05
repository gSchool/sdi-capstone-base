const bcrypt = require('bcryptjs')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  let pw1 = 'mybeardisawesome';
  let hashedpw1 = await bcrypt.hash(pw1, 10);
  let pw2 = 'armyrules';
  let hashedpw2 = await bcrypt.hash(pw2, 10);
  let pw3 = 'myhairisawesome';
  let hashedpw3 = await bcrypt.hash(pw3, 10);
  await knex('users').insert([
    { 
      org_id: 1, 
      name: "Jeff Haddock", 
      rank: "CIV", 
      email: "jeff.haddock@gmail.com",
      position_id: 1,
      password: hashedpw1
    },
    { 
      org_id: 2, 
      name: "Dave Clay", 
      rank: "CIV", 
      email: "dave.clay@gmail.com",
      position_id: 3,
      password: hashedpw2
    },
    { 
      org_id: 3, 
      name: "James Kelley", 
      rank: "CIV", 
      email: "james.kelley@gmail.com",
      position_id: 2,
      password: hashedpw3
    },

  ]);
};
