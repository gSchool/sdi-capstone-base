/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker } = require("@faker-js/faker");

const createFakeRequests = () => {
  const fakeRequests = [];

  for (let i = 0; i < 15; i++) {
    const request = {
      date: faker.date.soon(90, "2022-12-10T00:00:00:.000Z"),
      location: faker.address.country(),
      mission_title:
        faker.commerce.productMaterial() +
        " " +
        faker.commerce.productAdjective(),
      justification: faker.commerce.productDescription(),
      sme_status: faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]),
      cmd_status: faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]),
      user_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      asset_id: 1,
      sme_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6]),
      cmd_id: faker.helpers.arrayElement([1, 2, 3, 4]),
    }
    fakeRequests.push(request)
  }
  return fakeRequests;
};

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("request").insert(createFakeRequests());
};
