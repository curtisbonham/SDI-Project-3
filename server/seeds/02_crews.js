/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('crews').del()
  await knex('crews').insert([
    {id: 1, crew_id: 1, crew_name: 'Alpha', member_id:1, position_name: 'POFG', start_date:'2025-06-01', end_date: '2025-12-31'},
    {id: 2, crew_id: 1, crew_name: 'Alpha', member_id:4, position_name: 'Cook', start_date:'2025-06-01', end_date: '2025-12-31'},
    {id: 3, crew_id: 1, crew_name: 'Alpha', member_id:5, position_name: 'Linguist', start_date:'2025-06-01', end_date: '2025-12-31'},
    {id: 4, crew_id: 2, crew_name: 'Bravo', member_id:2, position_name: 'Cook', start_date:'2025-06-01', end_date: '2025-12-31'},
    {id: 5, crew_id: 3, crew_name: 'Charlie', member_id:3, position_name: 'Linguist', start_date:'2025-06-01', end_date: '2025-12-31'}
  ]);
};
