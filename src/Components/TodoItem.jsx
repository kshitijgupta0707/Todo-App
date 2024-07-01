import React, { useRef, useState, useEffect } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdSave } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import './todo.css'
import { useTodoContext } from '../Context/TodoContext';
const TodoItem = ({ todo }) => {

    const input = useRef(null);
    const { deleteTodo, updateTodo, toggleTodo } = useTodoContext();

    const [editable, setEditable] = useState(false);
    const [task, setTask] = useState(todo.task);

    const toggleEditable = () => {
        setEditable(!editable);
    }
    const edit = (value) => {
        setTask(value);
    }
    useEffect(() => {
        if (editable) {
            input.current.focus();
            input.current.select(); // To select the text inside the input box for easy editing
        }
    }, [editable]);


    document.addEventListener('keyup', (e) => {
        console.log(e.code);
        if (e.code == 'Enter') {
            setEditable(false);
        }
    })




    return (
        <div className={`todoList ${todo.completed ? 'completed' : ""} `}>
            <input className='toggle' type="checkbox" onChange={() => { toggleTodo(todo.id) }} checked={todo.completed} />
            {
                editable ?
                    <input ref={input} type="text" className='todo-item' value={task} readOnly={!editable} onChange={(e) => {
                        edit(e.target.value)
                    }} /> :
                    <div className='todo-item'  >
                        {task}
                    </div>

            }
            <div>
                {
                    todo.completed ? "" :
                        editable ? <MdSave onClick={
                            () => {
                                toggleEditable();
                                updateTodo({ ...todo, task }, todo.id)
                            }} className='save' /> : <CiEdit onClick={() => {
                                toggleEditable();
                                input.current.focus();
                                // input.current.focus(); 
                            }} className='edit'
                        />
                }


                <RiDeleteBin5Fill onClick={() => { deleteTodo(todo.id) }} className='delete' />

            </div>
        </div>
    )
}

export default TodoItem