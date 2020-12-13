<template>
  <div id="app">
    <!-- <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">ToDo</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/todos" class="nav-link">Todos</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/todo-add" class="nav-link">New Todo</router-link>
        </li>
      </div>
    </nav> -->

    <div class="container my-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
