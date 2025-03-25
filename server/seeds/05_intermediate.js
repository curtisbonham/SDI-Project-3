/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('intermediate').del()
  await knex('intermediate').insert([
    { course_id: '1', member_id:'1', cert_id:'1'},
    { course_id: '2', member_id:'2', cert_id:'2'},
    { course_id: '2', member_id:'3', cert_id:'3'},
    { course_id: '3', member_id:'4', cert_id:'4'},
    { course_id: '1', member_id:'5', cert_id:'5'},
    { course_id: '4', member_id:'1', cert_id:'6'},
    { course_id: '2', member_id:'2', cert_id:'7'},
  
  ]);
};
