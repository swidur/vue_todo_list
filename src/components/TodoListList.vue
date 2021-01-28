<template>
  <div class="list row">
    <div class="col-md-4">
      <h4>
        Lists
        <font-awesome-icon
          icon="plus"
          class="text-success"
          @click="showModalAddList()"
        />
      </h4>
      <ul class="list-group" v-if="todolists.length > 0">
        <li
          class="list-group-item"
          :class="{ active: index == currentListIndex }"
          v-for="(todolist, index) in todolists"
          :key="index"
        >
          <div class="container">
            <div class="row">
              <!-- content row -->
              <div class="col-8">
                <div class="" @click="setActiveTodoList(todolist, index)">
                  {{ todolist.title }}
                </div>
              </div>

              <!-- button row -->
              <div class="col-4 p-0 align-right">
                <div class="container">
                  <div class="row">
                    <div
                      class="col-6 px-2"
                      @click="showModalEditList(todolist)"
                    >
                      <font-awesome-icon icon="pencil-alt" class="small" />
                    </div>

                    <div class="col-6 px-2" @click="showModalDelete(todolist)">
                      <font-awesome-icon icon="minus" class="small" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="col-md-8">
      <h4>
        Tasks
        <font-awesome-icon
          icon="plus"
          class="text-success"
          @click="showModalAddItem(todolists.length > 0 ? todolists[currentListIndex].id : null)"
        />
      </h4>

      <ul class="list-group" v-if="todolists.length > 0">
        <li
          v-for="(todoItem, itemIndex) in todolists[currentListIndex].items"
          :key="itemIndex"
          class="list-group-item"
          :class="{ 'bg-light text-muted font-weight-light strike': todoItem.done_at != null }"
        >
          <div class="container">
            <div class="row">
              <!-- content row -->
              <div class="col-9" @click="toggleDoneItem(todoItem)">
                <div class="">{{ todoItem.name }}</div>
              </div>

              <!-- button row -->
              <div class="col-3 align-right">
                <div class="container">
                  <div class="row">
                    <div class="col-4 px-1" @click="toggleDoneItem(todoItem)">
                      <font-awesome-icon
                        v-if="!todoItem.done_at"
                        icon="check"
                        class="small"
                      />
                      <font-awesome-icon
                        v-if="todoItem.done_at"
                        icon="undo-alt"
                        class="small"
                      />
                    </div>

                    <div
                      class="col-4 px-1"
                      @click="showModalEditItem(todoItem)"
                    >
                      <font-awesome-icon icon="pencil-alt" class="small" />
                    </div>

                    <div class="col-4 px-1" @click="showModalDelete(todoItem)">
                      <font-awesome-icon icon="minus" class="small" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <v-dialog />
    <modal-add-item></modal-add-item>
    <modal-edit-item></modal-edit-item>
    <modal-add-list></modal-add-list>
    <modal-edit-list></modal-edit-list>
    <modal-delete></modal-delete>
  </div>
</template>

<script>
import TodoListDataService from "../services/TodoListDataService";
import TodoItemDataService from "../services/TodoItemDataService";
import ModalAddItem from "../components/ModalAddItem";
import ModalEditItem from "../components/ModalEditItem";

import ModalAddList from "../components/ModalAddList";
import ModalEditList from "../components/ModalEditList";

import ModalDelete from "../components/ModalDelete";

import { eventBus } from "../main";

export default {
  name: "todolist-list",
  data() {
    return {
      todolists: [],
      currentTodolist: null,
      currentListIndex: 0,
      currentItemIndex: 0,
      title: "",
      currentItem: {},
    };
  },
  methods: {
    showModalAddItem(todoListId) {
      if (todoListId === null){
        return;
      }
      this.$modal.show("modal-add-item", { listId: todoListId });
    },

    showModalEditItem(todoItem) {
      this.$modal.show("modal-edit-item", {
        todoItem: Object.assign({}, todoItem),
      }); //pass shalow copy of the object to m
    },

    showModalAddList(currentListIndex) {
      this.$modal.show("modal-add-list");
    },

    showModalEditList(todoList) {
      this.$modal.show("modal-edit-list", {
        todoList: Object.assign({}, todoList),
      }); //pass shalow copy of the object to m
    },

    showModalDelete(object) {
        this.$modal.show("modal-delete", {
        object: Object.assign({}, object),
      }); //pass shalow copy of the object to m
    },

    retrieveTodoLists() {
      TodoListDataService.getAll()
        .then((response) => {
          this.todolists = response.data;
        })
        .catch((e) => {
        });
    },

    retrieveTodoListsEventWrapper(resetListIndex){
      if (resetListIndex){
        this.currentListIndex = 0;
      }
      setTimeout(() => this.retrieveTodoLists(), 10);
    },

    setActiveTodoList(todolist, index) {
      this.currentTodolist = todolist;
      this.currentListIndex = index;
      this.retrieveTodoLists();
    },

    toggleDoneItem(todoItem) {
      var new_done_at;
      if (todoItem.done_at == null) {
        new_done_at = new Date();
      } else {
        new_done_at = null;
      }

      TodoItemDataService.update(todoItem.id, {
        name: todoItem.name,
        done_at: new_done_at,
      });

      todoItem.done_at = new_done_at;
    },

    removeItem(todoItem) {
      this.todolists[this.currentListIndex].items = this.todolists[
        this.currentListIndex
      ].items.filter((item) => item.id !== todoItem.id);
      TodoItemDataService.delete(todoItem.id);
    }
  },

  components: {
    ModalAddItem,
    ModalEditItem,
    ModalAddList,
    ModalEditList,
    ModalDelete,
  },

  mounted() {
    this.retrieveTodoLists();
  },
  created() {
    eventBus.$on("refreshTodos", () => {
      this.retrieveTodoListsEventWrapper();
    });
    eventBus.$on("refreshTodosAfterListDelete", () => {
      this.retrieveTodoListsEventWrapper(true);
    });
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 850px;
  margin: auto;
}
.strike {
  text-decoration: line-through;
}
</style>
