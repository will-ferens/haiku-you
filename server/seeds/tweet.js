exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('input').del()
    .then(function () {
      // Inserts seed entries
      return knex('input').insert([
        {id: 1, input: 'this is a test with / great potential for failure / and yet i must try'},
        {id: 2, input: 'Start spirit; behold / the skull. A living head loved / earth. My bones resign'},
        {id: 3, input: 'The light of a candle / is transferred to another candle / spring twilight'}      
      ]).then(() => {
        return knex.raw('ALTER SEQUENCE input_id_seq RESTART WITH 4;')
      })
    })
}