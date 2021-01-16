<template>
  <modal name="modal-delete" @before-open="beforeOpen">
    <div>
      <h6 class="mx-3 mt-3 small font-weight-bold">
        <span v-if="listOrItem() == 'list'">
          Delete list
        </span>
        <span v-else>
          Delete item
        </span>
      </h6>
    </div>
    <div class="submit-form">
      <div v-if="listOrItem() == 'list'" class="mx-3 mt-3">
        <p>
          Are you sure you want to delete the list and all its tasks?<br /><strong>{{
            object.title
          }}</strong>
          <br />This action is permament!
        </p>
      </div>
      <div v-if="listOrItem() == 'item'" class="mx-3 mt-3">
        <p>
          Are you sure you want to delete this task? <br /><strong>{{
            object.name
          }}</strong>
          <br />This action is permament!
        </p>
      </div>


      <div class="float-right">
        <button @click="hideModal()" class="btn btn-secondary mr-4 px-3">
          Cancel
        </button>
        <button @click="deleteObject()" class="btn btn-danger px-4">
          Delete
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import TodoListDataService from "../services/TodoListDataService";
import TodoItemDataService from "../services/TodoItemDataService";
import { eventBus } from "../main";

export default {
  name: "ModalDelete",

  data: function () {
    return {
      object: {},
      response: "",
    };
  },

  methods: {
    beforeOpen(event) {
      this.clearForm();
      this.object = event.params.object;
    },

    listOrItem(){
      if (typeof this.object.title != 'undefined'){
        return 'list';
      } 
      return 'item';
    },

    deleteObject(){
      console.log(this.listOrItem());
      if (this.listOrItem() == 'list'){
        this.deleteTodoList();
      } 
      else {
        this.deleteTodoItem();
      }

    },

    deleteTodoList() {
      console.log(this.object.title);

      TodoListDataService.delete(this.object.id)
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

    deleteTodoItem() {
      console.log(this.object.name);

      TodoItemDataService.delete(this.object.id)
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
      this.$modal.hide("modal-delete");
      eventBus.$emit("refreshTodos");
    },
    clearForm() {
      this.object = {};
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