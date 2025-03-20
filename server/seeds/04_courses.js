/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('courses').del()
  await knex('courses').insert([
    {id: 1, course_name: 'POFG 25-01', start_date: '01-01-2025', end_date: '03-31-2025', cert_id: 1},
    {id: 2, course_name: 'Cook 25-01', start_date: '02-01-2025', end_date: '04-31-2025', cert_id: 2},
    {id: 3, course_name: 'Linguist 25-01', start_date: '03-01-2025', end_date: '05-31-2025', cert_id: 3}
  ]);
};
