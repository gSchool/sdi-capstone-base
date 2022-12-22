/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { faker } = require('@faker-js/faker');

const createFakeUsers = () => {
  const fakeUsers = [];

  for (let i = 0; i < 10; i++) {
    const user = {

      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      username: faker.internet.userName(),
      unit: faker.helpers.arrayElement(['A Co', 'B Co', 'C Co', 'D Co']),
      position: faker.name.jobTitle(),
      password: faker.internet.password(),
      phone_number: faker.phone.number('813-###-###'),
      email: faker.internet.email(),
    }
    fakeUsers.push(user)
  }
  return fakeUsers;
}

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('all_users').del()
  await knex('all_users').insert(
    createFakeUsers()
  );
};
