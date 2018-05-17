exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('username').del()
    .then(function () {
      // Inserts seed entries
      return knex('username').insert([
        {id: 1, username: '@willembearins'},
        {id: 2, username: '@Ravi'},
        {id: 3, username: '@Yosa'}      
      ]).then(() => {
        return knex.raw('ALTER SEQUENCE username_id_seq RESTART WITH 4;')
      })
    })
}