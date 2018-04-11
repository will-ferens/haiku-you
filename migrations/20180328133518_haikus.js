
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('tweets', (table) => {
            table.increments('id').primary()
            table.text('username')
            table.text('haiku')
            table.integer('createdAt')
        })
    ])
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tweets')
}
