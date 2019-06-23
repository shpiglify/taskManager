const taskService = require('../services/taskService')

function addRoutes(app) {

    app.get('/api/tasks',(req,res)=>{
        taskService.query()
        .then(data=>res.json(data))
    })
    
    app.post('/api/tasks/:_id/start',(req,res)=>{
        var task = req.body
        taskService.send(task)
        .then(data=>res.json(data))
        .catch(err =>res.json(err))
    })
    
    
    app.post('/api/tasks', (req, res) => {
        var task = req.body
        taskService.add(task)
        .then((task) => {
            res.json(task)
        })
    })
    
    
    app.delete('/api/tasks/:_id',(req,res)=>{
        taskService.remove(req.params._id)
        .then(data=>res.json(data))
    })
    
    app.put('/api/tasks/:_id',(req,res)=>{
        console.log('got things in put :',req.params._id,req.body)
        taskService.update(req.params._id,req.body).
        then(data=>res.json(data))
    })
    
    

}


module.exports = addRoutes;