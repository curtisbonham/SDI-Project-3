/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('certifications').del()
  await knex('certifications').insert([
    {id: 1, position_name: 'Purveyor_of_Fine_Goods'},
    {id: 2, position_name: 'Linguist'},
    {id: 3, position_name: 'Cook'}
  ]);
};
