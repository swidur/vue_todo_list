import http from "../http-common"

class TodoListDataService{
    getAll(){
        return http.get("/todo-lists/");
    }

    get(id){
        return http.get(`/todo-lists/${id}/`);
    }

    create(data) {
        return http.post("/todo-lists/", data);
    }

    update(id, data) {
        return http.put(`/todo-lists/${id}/`, data);
    }

    delete(id){
        return http.delete(`/todo-lists/${id}/`);
    }
}

export default new TodoListDataService();