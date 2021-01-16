<template>
  <div v-if="currentTodoList" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentTodoList.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentTodoList.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTodoList.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentTodoList.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteTutorial"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateTutorial"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import TodoListDataService from "../services/TodoListDataService";
import TodoItemDataService from "../services/TodoItemDataService";

export default {
  name: "todoList",
  data() {
    return {
      currentTodoList: null,
      message: ''
    };
  },
  methods: {
    getTodoList(id) {
      TodoListDataService.get(id)
        .then(response => {
          this.currentTodoList = response.data;
        })
        .catch(e => {
        });
    },

    updateTutorial() {
      TodoListDataService.update(this.currentTodoList.id, this.currentTodoList)
        .then(response => {
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(e => {
        });
    },

    deleteTutorial() {
      TodoListDataService.delete(this.currentTodoList.id)
        .then(response => {
          this.$router.push({ name: "tutorials" });
        })
        .catch(e => {
        });
    }
  },
  mounted() {
    this.message = '';
    this.getTutorial(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
