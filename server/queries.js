const database = require('./connection')

module.exports = {
    list(){
        return database('username')
            .select()
    },
    read(id){
        return database('username')
            .select()
            .where('id', id)
            .first()

    },
    create(username){
        return database('username')
            .insert(username)
            .returning('*')
            .then(record => record[0])


    },
    update(id, username){
        return database('username')
            .update(username)
            .where('id', id)
            .returning('*')
            .then(record => record[0])
    },
    delete(id){
        return database('username')
            .delete()
            .where('id', id)
    }

}