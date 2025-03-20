/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('courses', table => {
    table.increments();
    table.string('course_name');
    table.string('start_date');
    table.string('end_date');
    table.integer('cert_id');
    table.foreign('cert_id').references('id').inTable('certifications').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('courses', table => {
    table.dropForeign('cert_id');
  }).then(() => {
    return knex.schema.dropTable('courses');
  });
};