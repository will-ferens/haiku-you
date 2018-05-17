exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('input', (table) => {
            table.increments('id').primary()
            table.text('input')
            table.integer('createdAt')
        })
    ])
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tweets')
}