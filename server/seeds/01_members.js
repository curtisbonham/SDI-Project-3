/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('members').del()
  await knex('members').insert([
    {id: 1, name: 'John Snow', rank: 'SPC3'},
    {id: 2, name: 'Ron Pearlman', rank: '1Lt'},
    {id: 3, name: 'Peter Parker', rank: 'Capt'},
    {id: 4, name: 'Spongebob', rank: 'Gen'},
    {id: 5, name: 'Megaman', rank: 'SSgt'},

  ]);
};
