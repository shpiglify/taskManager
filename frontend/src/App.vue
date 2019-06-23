<template>
<div id="app">
    <h1 class="main-header">Task Manager</h1>
    <Tasks />
</div>
</template>

<script>
import Tasks from './components/Tasks.vue'
export default {
    name: 'app',
    components: {
        Tasks
    }
}
</script>

<style lang="scss">
@import "./styles/_icons.scss";

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.main-header{
    margin:16px;
}
#app {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

</style>
