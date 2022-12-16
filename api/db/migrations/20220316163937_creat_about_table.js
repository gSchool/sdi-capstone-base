/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("cmd_approver", (table) => {
      table.increments("id");
      table.string("first_name", 50);
      table.string("last_name", 50);
      table.string("username", 50);
      table.string("unit", 50);
      table.string("position", 50);
      table.string("password", 255);
      table.string("phone_number", 20);
      table.string("email", 50);
      table.string("type", 25);
    })
    .createTable("sme_approver", (table) => {
      table.increments("id");
      table.string("first_name", 50);
      table.string("last_name", 50);
      table.string("username", 50);
      table.string("unit", 50);
      table.string("position", 50);
      table.string("password", 255);
      table.string("phone_number", 20);
      table.string("email", 50);
      table.string("type", 25);
      table.integer("sme_asset");
    })
    .createTable("asset", (table) => {
      table.increments("id");
      table.string("asset_name", 150);
      table.text("description");
      table.string("type", 50);
      table.text("image_url");
      table.integer("sme_id");
      table
        .foreign("sme_id")
        .references("sme_approver.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("all_users", (table) => {
      table.increments("id");
      table.string("first_name", 50);
      table.string("last_name", 50);
      table.string("username", 50);
      table.string("unit", 50);
      table.string("position", 50);
      table.string("password", 255);
      table.string("phone_number", 20);
      table.string("email", 50);
    })
    .createTable("shopping_cart", (table) => {
      table.increments("id");
      table.integer("user_id");
      table
        .foreign("user_id")
        .references("all_users.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("asset_id");
      table
        .foreign("asset_id")
        .references("asset.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("request", (table) => {
      table.increments("id");
      table.string("date", 100);
      table.string("location", 50);
      table.string("mission_title", 50);
      table.text("justification");
      table.string("sme_status", 50);
      table.string("cmd_status", 50);
      table.integer("user_id");
      table
        .foreign("user_id")
        .references("all_users.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("asset_id");
      table
        .foreign("asset_id")
        .references("asset.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      table.integer("sme_id");
      table
        .foreign("sme_id")
        .references("sme_approver.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("cmd_id");
      table
        .foreign("cmd_id")
        .references("cmd_approver.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("asset", (table) => {
      table.dropForeign("sme_id");
    })
    .alterTable("shopping_cart", (table) => {
      table.dropForeign("user_id");
      table.dropForeign("asset_id");
    })
    .alterTable("request", (table) => {
      table.dropForeign("user_id");
      table.dropForeign("asset_id");
      table.dropForeign("sme_id");
      table.dropForeign("cmd_id");
    })
    .then(function () {
      return knex.schema.raw('alter sequence all_users_id_seq restart with 1;').dropTableIfExists("all_users");
    })
    .then(function () {
      return knex.schema.raw('alter sequence asset_id_seq restart with 1;').dropTableIfExists("asset");
    })
    .then(function () {
      return knex.schema.raw('alter sequence sme_approver_id_seq restart with 1;').dropTableIfExists("sme_approver");
    })
    .then(function () {
      return knex.schema.raw('alter sequence cmd_approver_id_seq restart with 1;').dropTableIfExists("cmd_approver");
    })
    .then(function () {
      return knex.schema.raw('alter sequence shopping_cart_id_seq restart with 1;').dropTableIfExists("shopping_cart")
    })
    .then(function () {
      return knex.schema.raw('alter sequence request_id_seq restart with 1;').dropTableIfExists("request");
    });
};
