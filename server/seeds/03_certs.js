/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('certifications').del()
  await knex('certifications').insert([
    {id: 1, position: 'Purveyor_of_Fine_Goods'},
    {id: 2, position: 'Linguist'},
    {id: 3, position: 'Cook'},
    {id: 4, position: 'Deckhand'},
    {id: 5, position: 'Space_Surgeon'},
    {id: 6, position: 'Crew_Commander'},
    {id: 7, position: 'Space_Engineer'}
  ]);
};
