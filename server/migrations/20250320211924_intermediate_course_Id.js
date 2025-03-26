/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('intermediate', table => {
    table.integer('course_id').notNullable();
    table.foreign('course_id').references('id').inTable('courses').onDelete('CASCADE');

    table.integer('member_id').nullable();
    table.foreign('member_id').references('id').inTable('members').onDelete('CASCADE')

    table.integer('cert_id').notNullable();
    table.foreign('cert_id').references('id').inTable('certifications').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('intermediate', table => {
    table.dropForeign('course_id');
    table.dropForeign('member_id');
    table.dropForeign('cert_id');
  }).then(() => {
    return knex.schema.dropTable('intermediate');
  });
};