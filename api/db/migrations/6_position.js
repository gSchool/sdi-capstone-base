/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('position', table => {
        table.increments('id');
        table.string('name', 250);
        table.string('man_req', 250);
        table.integer('cert_id');
        table.foreign('cert_id').references('id').inTable('certification')

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('position', table => {
        table.dropForeign('cert_id');
    })
      .then(()=>{
        return knex.schema.dropTableIfExists('position');
      })

};
         