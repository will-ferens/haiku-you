const database = require('./connection')
module.exports = {
    list(){
        return database('input')
            .select()
    },
    read(id){
        return database('input')
            .select()
            .where('id', id)
            .first()
    },
    create(input){
        return database('input')
            .insert(input)
            .returning('*')
            .then(record => record[0])
    },
    update(id, input){
        return database('input')
            .update(input)
            .where('id', id)
            .returning('*')
            .then(record => record[0])
    },
    delete(id){
        return database('input')
            .delete()
            .where('id', id)
    }
}