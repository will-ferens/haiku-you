
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tweets').del()
    .then(function () {
      // Inserts seed entries
      return knex('tweets').insert([
        {id: 1, username: '@willembearins', haiku: 'this is a test with / great potential for failure / and yet i must try'},
        {id: 2, username: '@Ravi', haiku: 'Start spirit; behold / the skull. A living head loved / earth. My bones resign'},
        {id: 3, username: '@Yosa', haiku: 'The light of a candle / is transferred to another candle / spring twilight'}      
      ]).then(() => {
        return knex.raw('ALTER SEQUENCE tweets_id_seq RESTART WITH 4;')
      })
    })
}
