<template>
  <modal name="modal-edit-item" @before-open="beforeOpen">
    <div>
      <h6 class="mx-3 mt-3 small font-weight-bold">Edit task</h6>
    </div>
    <div class="submit-form">
      <div class="form-group">
        <div class="container">
          <div class="row">
            <div class="col-4 text-left">
              <label for="title">Task name</label>
            </div>
            <div class="col-8 text-right">
              <div v-if="response == 'Success'">
                <div class="text-success">Saved!</div>
              </div>
              <div v-if="response == 'Empty string'">
                <div class="text-danger">You need to supply the name</div>
              </div>
              <div v-if="response == 'Bad request'">
                <div class="text-danger">Bad request - possible duplicate</div>
              </div>
            </div>
          </div>
        </div>

        <input
          class="form-control"
          id="name"
          required
          v-model="todoItem.name"
          name="name"
        />
      </div>

      <div class="float-right">
        <button @click="hideModal" class="btn btn-danger mr-4 px-3">
          Cancel
        </button>
        <button @click="saveTodoItem" class="btn btn-success px-4">Save</button>
      </div>
    </div>
  </modal>
</template>

<script>
import TodoItemDataService from "../services/TodoItemDataService";
import { eventBus } from "../main";

export default {
  name: "ModalAddItem",

  data: function () {
    return {
      listId: 0,
      todoItem: {},
      response: ''
    };
  },

  methods: {
    beforeOpen(event) {
      this.clearForm();
      this.todoItem = event.params.todoItem;
    },

    saveTodoItem() {
      eventBus.$emit("refreshTodos");

      console.log(this.todoItem.id);
      if (!this.todoItem.name || this.todoItem.name.trim() === '' ) {
        this.response = "Empty string";
        return 0;
      } 

      var data = {
        name: this.todoItem.name,
        // list_id: this.listId,
      };

      TodoItemDataService.update(this.todoItem.id, data)
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
      this.$modal.hide("modal-edit-item");
    },

    clearForm() {
      this.todoItem = {};
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