exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('username', (table) => {
            table.increments('id').primary()
            table.text('username')
            table.integer('createdAt')
        })
    ])
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('username')
}