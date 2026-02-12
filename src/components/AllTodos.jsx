import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./Todos";

function Todos() {
  const todos = useSelector((state) => state.todo.todos);

  return (
    <div className="mt-8 flex flex-col gap-3 w-xl">
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))
      ) : (
        <p className="text-gray-400">No Todos Yet</p>
      )}
    </div>
  );
}

export default Todos;
