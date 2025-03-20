/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('members').del()
  await knex('members').insert([
    {id: 1, rank: 'SPC3', name: 'John Snow'},
    {id: 2, rank: '1Lt', name: 'Ron Pearlman'},
    {id: 3, name: 'Peter Parker', rank: 'Capt'}
  ]);
};
