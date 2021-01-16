<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Todos List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(todolist, index) in todolists"
          :key="index"
          @click="toggleDoneItem(todolist, index)"
        >
          {{ todolist.title }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <h4>Todos List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(todolist, index) in todolists"
          :key="index"
          @click="toggleDoneItem(todolist, index)"
        >
          {{ todolist.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TodoItemDataService from "../services/TodoItemDataService";

export default {
  name: "todoitem-list",
  data() {
    return {
      todolists: [],
      currentTodoItem: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrieveTodoItems() {
      TodoItemDataService.getAll()
        .then((response) => {
          this.todolists = response.data;
        })
        .catch((e) => {
        });
    },

    refreshList() {
      this.retrieveTodoItems();
      this.currentTodoItem = null;
      this.currentIndex = -1;
    },

    toggleDoneItem(todolist, index) {
      this.currentTodoItem = todolist;
      this.currentIndex = index;
    },
  },
  mounted() {
    this.retrieveTodoItems();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>