<template>
<div class="Tasks">
    <h2>Tasks</h2>
    <div v-for="task in tasks" v-bind:key="task._id">
        <Task v-bind:task="task" v-on:send_task="sendTask" v-on:delete_task="removeTask" v-on:update_task="updateTaskFields" />
    </div>
    <AddNewTask v-on:add_new_task="addNewTask" />
</div>
</template>

<script>
import axios from 'axios'
import Task from './Task.vue'
import AddNewTask from './AddNewTask.vue'

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api' : '//localhost:5000/api';

export default {
    name: 'Tasks',
    components: {
        Task,
        AddNewTask
    },
    data() {
        return {
            tasks: []
        }
    },
    created() {
        axios.get(`${BASE_URL}/tasks`)
            .then(res => this.tasks = res.data)
            .catch(err => console.log(err))
    },
    methods: {
        getTasks() {
            axios.get(`${BASE_URL}/tasks`)
                .then(res => this.tasks = res.data)
                .catch(err => console.log(err))
        },
        removeTask(id) {
            console.log('remove task activated with this id: ', id)
            axios.delete(`${BASE_URL}/tasks/${id}`)
                .then(res => {
                    this.tasks = this.tasks.filter((task) => task._id !== id)
                })
                .catch(err => console.log(err))
        },
        addNewTask(task) {
            axios.post(`${BASE_URL}/tasks`, task)
                .then(res => {
                    console.log('new task created: ', res.data)
                    this.tasks = [...this.tasks, res.data]
                })
                .catch(err => console.log(err))
        },
        updateTaskFields(payload){
          let {id,updatedFields} = payload
          console.log('update task got this params:',id, updatedFields)
          axios.put(`${BASE_URL}/tasks/${id}`, updatedFields)
                .then(res => {
                    console.log('task updated : ', res.data)
                })
                .catch(err => console.log(err))
        },
        sendTask(task){
            console.log('task in sendTask :', task);
            axios.post(`${BASE_URL}/tasks/${task._id}/start`,task).then(res => {
                    console.log('task send : ', res.data)
                    let newTask = {...task,...res.data}
                    console.log(newTask)
                    let tasksCopy = [...this.tasks]
                    var idx = this.tasks.findIndex((task)=>newTask._id == task._id)
                    console.log(idx)
                   tasksCopy[idx] = newTask
                   this.tasks = tasksCopy
                })
                .catch(err => console.log(err))
        }
    }
}
</script>

<style scoped lang="scss">
.Tasks{
    display: flex;
    flex-direction: column;
    max-height: 100%;
    white-space: normal;

    background-color: #dfe1e6;
    border-radius: 3px;
    margin:1em;
    padding:1em;
}
h2{
    margin-bottom: 8px;
}



</style>
