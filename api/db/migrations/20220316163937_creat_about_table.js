/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id');
        table.string('first_name', 50);
        table.string('last_name', 50);
        table.string('username', 50);
        table.string('unit', 50);
        table.string('position', 50);
        table.string('password', 100);
        table.string('phone_number', 20);
        table.string('email', 50);
    })
        .createTable('asset', table => {
            table.increments('id');
            table.string('asset_name', 150);
            table.string('description', 255);
            table.string('type', 50);
            table.string('image_url', 255);
        })
        .createTable('sme_approver', table => {
            table.increments('id');
            table.string('first_name', 50);
            table.string('last_name', 50);
            table.string('username', 50);
            table.string('unit', 50);
            table.string('position', 50);
            table.string('password', 100);
            table.string('phone_number', 20);
            table.string('email', 50);
            table.string('type', 25);
            table.integer('asset_id');
            table.foreign('asset_id').references('asset.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .createTable('cmd_approver', table => {
            table.increments('id');
            table.string('first_name', 50);
            table.string('last_name', 50);
            table.string('username', 50);
            table.string('unit', 50);
            table.string('position', 50);
            table.string('password', 100);
            table.string('phone_number', 20);
            table.string('email', 50);
            table.string('type', 25);
            table.integer('user_id');
            table.foreign('user_id').references('user.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .createTable('request', table => {
            table.increments('id');
            table.string('date', 25);
            table.string('location', 50);
            table.string('mission_title', 50);
            table.string('justification', 255);
            table.string('status', 25);
            table.integer('user_id');
            table.foreign('user_id').references('user.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table.integer('asset_id')
            table.foreign('asset_id').references('asset.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table.integer('sme_id');
            table.foreign('sme_id').references('sme_approver.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table.integer('cmd_id');
            table.foreign('cmd_id').references('cmd_approver.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .alterTable('sme_approver', table => {
            table.dropForeign('asset_id');
        })
        .alterTable('cmd_approver', table => {
            table.dropForeign('user_id');
        })
        .alterTable('request', table => {
            table.dropForeign('user_id');
            table.dropForeign('asset_id');
            table.dropForeign('sme_id');
            table.dropForeign('cmd_id');
        })
        .then(function () {
            return knex.schema.dropTableIfExists('user')
        })
        .then(function () {
            return knex.schema.dropTableIfExists('asset')
        })
        .then(function () {
            return knex.schema.dropTableIfExists('sme_approver')
        })
        .then(function () {
            return knex.schema.dropTableIfExists('cmd_approver')
        })
        .then(function () {
            return knex.schema.dropTableIfExists('request')
        })

};
