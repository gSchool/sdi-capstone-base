/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker');

const createFakeUsers = () => {
  const fakeUsers = [];

  for (let i = 1; i < 7; i++) {
    const user = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      username: faker.internet.userName(),
      unit: faker.helpers.arrayElement(['A Co', 'B Co', 'C Co', 'D Co']),
      position: 'SME',
      password: faker.internet.password(),
      phone_number: faker.phone.number('813-###-###'),
      email: faker.internet.email(),
      type: 'SME',
      sme_asset: i
    }
    fakeUsers.push(user)
  }
  return fakeUsers;
}
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('sme_approver').del()
  await knex('sme_approver').insert(
    createFakeUsers()
  );
};
