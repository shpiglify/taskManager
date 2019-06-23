const {MongoClient} = require('mongodb');
const url =  "mongodb+srv://guy20056:LrQJx5UxUHiUaFWe@cluster0-f586w.mongodb.net/test?retryWrites=true"
var dbConn = null;

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);
    
    return MongoClient.connect(url, { useNewUrlParser: true })
        .then(client => {
            console.log('Connected to MongoDB');
            // If we get disconnected (e.g. db is down)
            client.on('close', ()=>{
                console.log('MongoDB Diconnected!');
                dbConn = null;
            })
            dbConn = client.db("db")
            return dbConn;
        })
        .catch((err)=>console.log(err))
}

function connectToTasks(){
    return connectToMongo().then(db=>db.collection('task_db'))
}

module.exports = {
    connect : connectToMongo,
    tasks : connectToTasks
}
