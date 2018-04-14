
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('haikus').del()
    .then(function () {
      // Inserts seed entries
      return knex('haikus').insert([
        {id: 1, haiku: 'this is a test with / great potential for failure / and yet i must try', username: '@willembearins'},
        {id: 2, haiku: 'Start spirit; behold / the skull. A living head loved / earth. My bones resign', username: '@Ravi'},
        {id: 3, haiku: 'The light of a candle / is transferred to another candle / spring twilight', username: '@Yosa'}      
      ]).then(() => {
        return knex.raw('ALTER SEQUENCE haikus_id_seq RESTART WITH 4;')
      })
    })
}
