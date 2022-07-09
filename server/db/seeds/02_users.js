/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    { name: "dude", man_number: 76565, firebase_uuid: 222, email:"sad.pepe@daniel.edu", picture: "https://www.meme-arsenal.com/memes/ed6f2b5b00c89be10adb393f420fed13.jpg" },
  ]);
}
