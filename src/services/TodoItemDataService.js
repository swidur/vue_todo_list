import http from "../http-common"

class TodoItemDataService{
    getAll(){
        return http.get("/todo-items/");
    }

    get(id){
        return http.get(`/todo-items/${id}`);
    }

    create(listId, name, doneAt) {
        return http.post("/todo-items/", listId, name, doneAt);
    }

    update(id, param) {
        return http.patch(`/todo-items/${id}/`, param);
    }

    delete(id){
        return http.delete(`/todo-items/${id}/`);
    }
}

export default new TodoItemDataService();