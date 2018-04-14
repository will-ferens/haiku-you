const database = require('./connection')

module.exports = {
    list(){
        return database('haikus')
            .select()
    },
    read(id){
        return database('haikus')
            .select()
            .where('id', id)
            .first()


    },
    create(resolution){
        return database('haikus')
            .insert(resolution)
            .returning('*')
            .then(record => record[0])


    },
    update(id, resolution){
        return database('haikus')
            .update(resolution)
            .where('id', id)
            .returning('*')
            .then(record => record[0])
    },
    delete(id){
        return database('haikus')
            .delete()
            .where('id', id)
    }

}