import { func } from "prop-types";
import React, { useState, useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

const AddTodo = React.lazy(() => import("./Todo/AddTodo"))

function App (){

  let [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(() => setLoading(false))
        }, 1000)
      })
  }, [])

  function toggleTodo(id){
    setTodos(todos = todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo
    })
    )
  }
  
  function removeTodo(id){
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title){
    setTodos(todos.concat([{
      title,
      id: todos.length + 1,
      completed: false
    }
    ]))
  }

  return(
    <Context.Provider value={{remove: removeTodo, toggle: toggleTodo}}>
      <div className="wrapper">
        <h1>Todo</h1>

        <Modal />
        <React.Suspense fallback={<p>Loading</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        {loading && <Loader />}
        {todos.length ? <TodoList todos={todos} /> : loading ? null : <p>No todos</p>}
      </div>
    </Context.Provider>
  )

}

export default App;
