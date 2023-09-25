import React, { useContext, useState } from 'react'
import TodoContext from '../context/todo/todoContext';
import ApiServices from '../services/ApiServices';

function AddTask() {
    const [title, setTitle] = useState("");
    const [done, setDone] = useState("");

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // setTasks(() => [...tasks, {title, done}]); 
            const data = {
                title,
                done
            };

            const addTaskResponse = await ApiServices.addTodo(data);
            if (addTaskResponse.status !== 200) {
                alert("There was an Error")
            }
            // alert("Task added"); 
            setTitle(""); 
            setDone(""); 
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            Title : <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            Done : <input type="text" value={done} onChange={(e) => setDone(e.target.value)} />
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTask