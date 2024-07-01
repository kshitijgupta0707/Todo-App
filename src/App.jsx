
import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { TodoContextProvider } from './Context/TodoContext'
import TodoForm from './Components/TodoForm';
import TodoItem from './Components/TodoItem';


function App() {

  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => {
      return [todo, ...prev];
    })
  }
  const updateTodo = (todo, id) => {
    setTodos((prev) => {
      return prev.map((element) => element.id === id ? todo : element);
    })
  }
  const deleteTodo = (id) => {
    if (confirm("Are you sure to delete this task?.")) {
      setTodos((prev) => {
        return prev.filter((element) => { return element.id !== id })
      })


    }
  }
  const toggleTodo = (id) => {

    setTodos((prev) => {
      return prev.map((element) => element.id === id ? { ...element, completed: !element.completed } : element)
    })
  }
  const deleteAll = () => {
    if (confirm("Are you sure ? You are deleting all the tasks.")) {
      setTodos([]);

    }

  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, [])

  useEffect(() => {
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <TodoContextProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleTodo, deleteAll }} >
      <div className="container">
        <div className="content">
          <h2 className='heading' >Daily Task</h2>
          <TodoForm />

          {
            todos.map((item) => {
              return <div key={item.id}>
                <TodoItem todo={item} />
              </div>
            })
          }


        </div>
      </div>

    </TodoContextProvider>

  )
}

export default App
