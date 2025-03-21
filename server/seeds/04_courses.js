/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('courses').del()
  await knex('courses').insert([
    {id: 1, course_name: 'POFG 25-01', start_date: '2025-01-01', end_date: '2025-03-31', cert_id: 1},
    {id: 2, course_name: 'Cook 25-01', start_date: '2025-02-01', end_date: '2025-04-30', cert_id: 3},
    {id: 3, course_name: 'Linguist 25-01', start_date: '2025-03-01', end_date: '2025-05-31', cert_id: 2}
  ]);
};
