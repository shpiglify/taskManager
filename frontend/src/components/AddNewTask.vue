<template>
  <div class="AddNewTask">
      <button class="btn" v-on:click="()=>{$emit('add_new_task',newTask);this.title = ''}">
      <span class="icon-md icon-add"></span>
      Add Task
    </button>
    <input
      type="text"
      name="title"
      id="title"
      v-model="title"
      placeholder="write a title for this task..."
    >
    
  </div>
</template>

<script>
export default {
  name: "AddNewTask",
  data() {
    return {
      title: ""
    };
  },
  computed: {
    newTask() {
      return {
        title: this.title,
        description: "",
        importance: 2,
        createdAt: Date.now(),
        lastTried: null,
        triesCount: 0,
        sentAt: null
      };
    }
  }
};
</script>

<style lang="scss" scoped>

input[type="text"] {
    outline-color: #d29034;
    outline-width: 5px;
    width: 80%;
  border-radius: 3px;
  font-size: 15px;
  padding: 5px 12px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
}

.AddNewTask {
  display: flex;

  button.btn {
       width: 20%;
    display: flex;
    align-items: center;
    background: #d29034;
    border: none;
    color: #fff;

    border-radius: 3px;
    font-weight: 700;
    max-width: 300px;
    padding: 6px 25px 6px 12px;
  }
}

</style>
