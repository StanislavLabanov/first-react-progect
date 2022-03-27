import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from 'prop-types'

function TodoList (props){

   const styles = {
      ul: {
         listStyle: 'none',
         margin: 0,
         padding: 0
      }
   }

   return(
     <ul style={styles.ul}>
        {props.todos.map(todo => {
           return <TodoItem todo={todo} key={todo.id} />
        })}
     </ul>
   )
   
}
 
TodoList.propTypes = {
   todos: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TodoList;
 