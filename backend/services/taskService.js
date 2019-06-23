const mongoService = require('./mongoService')
const { ObjectId } = require('mongodb')


async function send(task) {
    
    if (Math.random() > 0.5){
        let payload = {triesCount:task.triesCount+1,lastTried:Date.now(),sentAt:Date.now()}
        await update(task._id,payload)
        return payload
    } else{
        console.log('send')
        let payload = {triesCount:task.triesCount+1,lastTried:Date.now()}
        await update(task._id,payload)
        return Promise.reject(payload);
    }
}

function getById(id) {
    const _id = new ObjectId(id)
    return mongoService.tasks()
        .then(tasks => tasks.findOne({ _id }))
}

async function remove(id) {
    const _id = new ObjectId(id)
    const tasks = await mongoService.tasks()
    return tasks.deleteOne({ _id })
}


async function query(filterBy) {
    if (!filterBy) {
        const tasks = await mongoService.tasks()
        return tasks.find({}).toArray()
    } else {
        var queryToMongo = {}
        var name = filterBy.name
        var type = filterBy.type
        var reg = new RegExp(name, 'i')
        if (name) queryToMongo.name = { '$regex': reg }
        if (type) queryToMongo.type = { '$regex': reg }
        queryToMongo = { $or: [{ name: { '$regex': reg } }, { type: { '$regex': reg } }] }
        console.log('QUERY : ', queryToMongo);
        return mongoService.connect()
            .then((db) => {
                return db.collection('task_db').find(queryToMongo).toArray()
            })
    }
}


function add(task) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('task_db');
            return collection.insertOne(task)
                .then(result => {
                    task._id = result.insertedId;
                    return task;
                })
        })
}

async function update(id, updatedFields) {
    const _id = new ObjectId(id)
    const tasks = await mongoService.tasks()
    return tasks.update({ _id }, { $set: updatedFields })
}

module.exports = {
    query,
    getById,
    remove,
    add,
    update,
    send
}
