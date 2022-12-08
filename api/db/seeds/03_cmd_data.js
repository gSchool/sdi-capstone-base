/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { faker } = require('@faker-js/faker');

const createFakeUsers = () => {
  const fakeUsers = [];

  for (let i = 0; i < 4; i++) {
    const user = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      username: faker.name.username,
      unit: faker.helpers.arrayElement(['A Co', 'B Co', 'C Co', 'D Co']),
      position: 'Commander',
      password: faker.name.password,
      phone_number: faker.name.phone_number,
      email: faker.name.email,
      type: 'Commander',
      user_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    }
    fakeUsers.push(user)
  }
  return fakeUsers;
}
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cmd_approver').del()
  await knex('cmd_approver').insert(
    createFakeUsers()
  );
};
