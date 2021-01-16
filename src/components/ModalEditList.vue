<template>
  <modal name="modal-edit-list" @before-open="beforeOpen">
    <div>
      <h6 class="mx-3 mt-3 small font-weight-bold">Edit list</h6>
    </div>
    <div class="submit-form">
      <div class="form-group">
        <div class="container">
          <div class="row">
            <div class="col-4 text-left">
              <label for="title">List title</label>
            </div>
            <div class="col-8 text-right">
              <div v-if="response == 'Success'">
                <div class="text-success">Saved!</div>
              </div>
              <div v-if="response == 'Empty string'">
                <div class="text-danger">You need to supply the title</div>
              </div>
              <div v-if="response == 'Bad request'">
                <div class="text-danger">Bad request - possible duplicate</div>
              </div>
            </div>
          </div>
        </div>
        <input
          class="form-control"
          id="title"
          required
          v-model="todoList.title"
          title="title"
        />
      </div>

      <div class="float-right">
        <button @click="hideModal" class="btn btn-secondary mr-4 px-3">
          Cancel
        </button>
        <button @click="saveTodoList" class="btn btn-primary px-4">
          Save
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import TodoListDataService from "../services/TodoListDataService";
import { eventBus } from "../main";

export default {
  name: "ModalAddList",

  data: function () {
    return {
      todoList: {},
      response: "",
    };
  },

  methods: {
    beforeOpen(event) {
      this.clearForm();
      this.todoList = event.params.todoList;
    },

    saveTodoList() {
      console.log(this.todoList.title);
      if (!this.todoList.title || this.todoList.title.trim() === '' ) {
        this.response = "Empty string";
        return 0;
      }
      var data = {
        title: this.todoList.title,
      };

      TodoListDataService.update(this.todoList.id, data)
        .then((response) => {
          this.hideModal();
        })
        .catch((e) => {
          if (e.response.status == 400) {
            console.log("400");
            this.response = "Bad request";
          }
        });

      eventBus.$emit("refreshTodos");
    },

    hideModal() {
      this.$modal.hide("modal-edit-list");
      eventBus.$emit("refreshTodos");
    },
    clearForm() {
      this.todoList = {};
      this.response = "";
    },
  },
};
</script>

<style>
.vm--modal {
  max-height: 200px;
}
.wrapper {
  height: 100%;
  width: 100%;
  background-color: whitesmoke;
}
.submit-form {
  max-width: 500px;
  margin: auto;
}
</style>