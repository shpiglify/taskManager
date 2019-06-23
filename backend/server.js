const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const addTaskRoutes = require('./routes/taskRoutes')

const app = express()
app.use(express.static('public'));
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('server started on port :', PORT))
app.use(bodyParser.json())
app.use(cors({
    origin: ['http://localhost:8080'], 
    credentials: true // enable set cookie
}));

addTaskRoutes(app)

