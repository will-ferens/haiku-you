const database = require('./connection')

module.exports = {
    list(){
        return database('haikus')
            .select()
    }
}