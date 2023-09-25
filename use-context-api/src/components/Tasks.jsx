import { React, useContext } from 'react'
import TodoContext from '../context/todo/todoContext'

function Tasks() {
    const { tasks } = useContext(TodoContext);
    console.log(useContext(TodoContext))

    return (
        <div style={{ marginTop: "30px" }}>
            {tasks?.map((todo, index) => (
                <div key={index} style={{ display: "flex", gap: "20px" }}>
                    <span>{index}</span>
                    <span>{todo.title}</span>
                    <span>{todo.done}</span>
                </div>
            )
            )}
        </div>
    )
}

export default Tasks