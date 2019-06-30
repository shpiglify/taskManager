<template>
  <div class="Task">
    <div class="header">
      <div class="input-wrapper">
        <span class="window-header-icon icon-lg icon-card"/>
        <input
          placeholder="Enter title..."
          type="text"
          v-model="title"
          v-on:change="$emit('update_task',{id: task._id,updatedFields:{title:title}})"
        >
      </div>

      <button class="btn delete" v-on:click="$emit('delete_task',task._id)">delete</button>
    </div>

    <div>
      <span class="icon-description icon-lg icon-card"/>Description
      <textarea
      rows="3" cols="32"
        class="description"
        placeholder="Write a description..."
        type="text"
        v-model="description"
        v-on:change="$emit('update_task',{id: task._id,updatedFields:{description}})"
      ></textarea>
    </div>

    <span class="icon-information icon-lg icon-card"/>
    importance:
    <input
      type="number"
      min="1"
      max="3"
      v-model="importance"
      v-on:change="$emit('update_task',{id: task._id,updatedFields:{importance}})"
    >

    <h4>
      <span class="icon-clock icon-lg icon-card"/>
      createdAt: {{createdAt}}
    </h4>
    <h4>
      <span class="icon-card icon-lg icon-card-recurring"/>
      triesCount: {{task.triesCount}}
    </h4>

    <h6 v-if="lastTried">lastTried: {{lastTried}}</h6>
    <h6 v-if="sentAt">sentAt: {{sentAt}}</h6>

    <button class="btn send" v-on:click="$emit('send_task',task)">send</button>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Task",
  props: ["task"],
  data() {
    return {
      title: this.task.title,
      description: this.task.description,
      importance: this.task.importance
    };
  },
  computed: {
    createdAt() {
      return moment(this.task.createdAt).format("MMMM Do YYYY, hh:mm:ss ");
    },
    lastTried() {
      if (this.task.lastTried) {
        return moment(this.task.lastTried).format("MMMM Do YYYY, hh:mm:ss ");
      } else {
        return null;
      }
    },
    sentAt() {
      if (this.task.sentAt) {
        return moment(this.task.sentAt).format("MMMM Do YYYY, hh:mm:ss ");
      } else {
        return null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.Task {
  line-height: 2;
  position: relative;
  min-height: 20px;
  margin-bottom: 8px;
  padding: 5px;

  font-weight: bold;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
}

input {
  border: none;
  font-size: inherit;
  font-weight: bold;
  padding: 2px;
  width: 100%;
  color: #2c3e50;
}

input[type=number]{
  display:inline;
  width:35px;
}


textarea.description {
  max-width: 94%;
  font-weight: normal;
  border-radius: 2px;

  font-size: 15px;
  padding: 5px 5px;
   display: block;
  margin: 0 0 0 33px;
  font-family: inherit;
  border: 0.5px rgba(9, 30, 66, 0.25) solid;
 
 
}
@media only screen and (max-width: 419px) {
  textarea.description {
    margin: 0;
    margin-left:6px;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  .input-wrapper {
    display: flex;
  }
}

.btn {
  border: none;
  color: #fff;

  border-radius: 3px;
  display: block;
  font-weight: 700;
  height: 32px;
  max-width: 300px;
  overflow: hidden;
  padding: 6px 12px;
  text-decoration: none;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: nowrap;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
}
.delete {
  position: absolute;
  right: 5px;
  top: 5px;
  background-color: #cf513d;
  box-shadow: 0 1px 0 0 #6e2f1a;
  transition: 0.3s;
  &:hover {
    background-color: #b04632;
  }
}
.send {
  position: absolute;
  right: 5px;
  bottom: 5px;
  background-color: #5aac44;
  box-shadow: 0 1px 0 0 #3f6f21;
  transition: 0.3s;
  &:hover {
    background-color: #519839;
  }
}

h6 {
  margin-left: 38px;
  max-width: 50%;
}
</style>
