import AddTodo from "./AddTodo";
import AllTodos from './AllTodos'
import TodoItem from './Todos'

function TodoPage(){
          return(
                    <div className="flex flex-col justify-center items-center m-10">
                           <AddTodo />
                           <AllTodos />   
                    </div>
          )
}

export default TodoPage

