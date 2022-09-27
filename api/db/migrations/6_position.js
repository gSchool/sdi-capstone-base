/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('position', table => {
        table.increments('id');
        table.string('name', 250);
        table.string('man_req', 250);
        table.integer('cert_req');
        table.foreign('cert_req').references('id').inTable('certification')

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('position', table => {
        table.dropForeign('cert_req');
    })
      .then(()=>{
        return knex.schema.dropTableIfExists('position');
      })

};
