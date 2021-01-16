<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="todolist.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="todolist.description"
          name="description"
        />
      </div>

      <button @click="saveTodoList" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTodoList">Add</button>
    </div>
  </div>
</template>

<script>
import TodoListDataService from "../services/TodoListDataService";

export default {
  name: "add-todolist",
  data() {
    return {
      todolist: {
        id: null,
        title: "",
        createdat: null
      },
      submitted: false
    };
  },
  methods: {
    saveTodoList() {
      var data = {
        title: this.todolist.title,
      };

      TodoListDataService.create(data)
        .then(response => {
          this.todolist.id = response.data.id;
          this.submitted = true;
        })
        .catch(e => {
        });
    },
    
    newTodoList() {
      this.submitted = false;
      this.todolist = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
