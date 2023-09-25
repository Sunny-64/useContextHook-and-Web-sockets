import { useEffect, useState } from "react";
import TodoContext from "./todoContext";
import ApiServices from "../../services/ApiServices";
import {socket} from './../../services/socket';

const TodoState = (props) => {
    const [tasks, setTasks] = useState([]); 
    const fetchData = async () => {
        try{
            const data = await ApiServices.fetchTodos(); 
            setTasks(data.data.data); 
        }
        catch(err){
            console.log(err); 
        }
    }

    socket.on("taskAdded", () => {
        fetchData(); 
    }); 

    useEffect(() => {
        fetchData(); 
    }, []); 

    return (
        <TodoContext.Provider value={{tasks, setTasks}}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoState; 