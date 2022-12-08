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
      username: faker.name.username,
      unit: faker.helpers.arrayElement(['A Co', 'B Co', 'C Co', 'D Co']),
      position: faker.name.jobTitle,
      password: faker.name.password,
      phone_number: faker.name.phone_number,
      email: faker.name.email,
    }
    fakeUsers.push(user)
  }
  return fakeUsers;
}

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert(
    createFakeUsers()
  );
};
