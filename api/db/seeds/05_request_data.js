/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker } = require("@faker-js/faker");

const createFakeRequests = () => {
  const fakeRequests = [
    {
      date: faker.date.soon(90, "2022-12-10T00:00:00:.000Z"),
      location: faker.address.country(),
      mission_title:
        faker.commerce.productMaterial() +
        " " +
        faker.commerce.productAdjective(),
      justification: faker.commerce.productDescription(),
      status: faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]),
      user_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      asset_id: 1,

      sme_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6]),
      cmd_id: faker.helpers.arrayElement([1, 2, 3, 4]),
    },
    {
      date: faker.date.soon(90, "2022-12-10T00:00:00:.000Z"),
      location: faker.address.country(),
      mission_title:
        faker.commerce.productMaterial() +
        " " +
        faker.commerce.productAdjective(),
      justification: faker.commerce.productDescription(),
      status: faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]),
      user_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      asset_id: 2,

      sme_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6]),
      cmd_id: faker.helpers.arrayElement([1, 2, 3, 4]),
    },
    {
      date: faker.date.soon(90, "2022-12-10T00:00:00:.000Z"),
      location: faker.address.country(),
      mission_title:
        faker.commerce.productMaterial() +
        " " +
        faker.commerce.productAdjective(),
      justification: faker.commerce.productDescription(),
      status: faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]),
      user_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      asset_id: 3,

      sme_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6]),
      cmd_id: faker.helpers.arrayElement([1, 2, 3, 4]),
    },
    {
      date: faker.date.soon(90, "2022-12-10T00:00:00:.000Z"),
      location: faker.address.country(),
      mission_title:
        faker.commerce.productMaterial() +
        " " +
        faker.commerce.productAdjective(),
      justification: faker.commerce.productDescription(),
      status: faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]),
      user_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      asset_id: 4,

      sme_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6]),
      cmd_id: faker.helpers.arrayElement([1, 2, 3, 4]),
    },
    {
      date: faker.date.soon(90, "2022-12-10T00:00:00:.000Z"),
      location: faker.address.country(),
      mission_title:
        faker.commerce.productMaterial() +
        " " +
        faker.commerce.productAdjective(),
      justification: faker.commerce.productDescription(),
      status: faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]),
      user_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      asset_id: 5,

      sme_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6]),
      cmd_id: faker.helpers.arrayElement([1, 2, 3, 4]),
    },
    {
      date: faker.date.soon(90, "2022-12-10T00:00:00:.000Z"),
      location: faker.address.country(),
      mission_title:
        faker.commerce.productMaterial() +
        " " +
        faker.commerce.productAdjective(),
      justification: faker.commerce.productDescription(),
      status: faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]),
      user_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      asset_id: 6,

      sme_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6]),
      cmd_id: faker.helpers.arrayElement([1, 2, 3, 4]),
    },
  ];

  // for (let i = 0; i < 10; i++) {
  //   const request = {
  //     date: faker.date.soon(90, '2022-12-10T00:00:00:.000Z'),
  //     location: faker.address.country(),
  //     mission_title: faker.commerce.productMaterial() + " " + faker.commerce.productAdjective(),
  //     justification: faker.commerce.productDescription(),
  //     status: faker.helpers.arrayElement(['Pending', 'Approved', 'Rejected']),
  //     user_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  //     asset_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]),
  //     sme_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6]),
  //     cmd_id: faker.helpers.arrayElement([1, 2, 3, 4])
  //   }
  //   fakeRequests.push(request)
  //}
  return fakeRequests;
};

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("request").insert(createFakeRequests());
};
