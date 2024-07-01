import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [{ id: 1, task: "Go to gym", completed: false }],
  addTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  toggleTodo: () => {},
  deleteAll: () =>{}
});


export const useTodoContext = () => {
    return useContext(TodoContext);
};

export  const TodoContextProvider = TodoContext.Provider;