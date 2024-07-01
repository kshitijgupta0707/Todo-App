import React, { useState } from 'react'
import './todo.css'
import { useTodoContext } from '../Context/TodoContext';
const TodoForm = () => {

    const [task, setTask] = useState("");

    const { addTodo , deleteAll } = useTodoContext();
    
    const add = () =>{
        if (!task) return;
    
        const obj = {
            id: Date.now(),
            task,
            completed: false,
        }
        addTodo(obj);
        setTask("");

    }



    return (

        <form className="form" onSubmit={(e)=> {e.preventDefault()}} >
            <input placeholder='Write to do ...' className='inputTodo' type="text" value={task} onChange={(e) => {
                setTask(e.target.value);
            }} />
            <button onClick={add} className='addTodo' >Add</button>
            <button onClick={deleteAll} className='addTodo deleteTodo' > DeleteAll</button>
        </form>

    )
}

export default TodoForm