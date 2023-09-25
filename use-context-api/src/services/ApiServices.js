import axios from "axios";

export const BASE_URL = "http://localhost:3003"; 

class TodoAPI {
    fetchTodos(){
        return axios.get(`${BASE_URL}/tasks`); 
    }

    addTodo(data){
        return axios.post(`${BASE_URL}/tasks/add`, data); 
    }
}

export default new TodoAPI; 