/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('intermediate', (table) => {
    table.unique(['course_id', 'cert_id'], 'unique_course_cert'); // Add unique constraint
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('intermediate', (table) => {
    table.dropUnique(['course_id', 'cert_id'], 'unique_course_cert'); // Remove unique constraint
  });
};
