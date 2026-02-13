import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../features/todo/todoSlice";
import TodoItem from "./Todos";

function Todos() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="mt-8 flex flex-col gap-3 w-full">
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))
      ) : (
        <p className="text-gray-400 text-center">No Todos Yet</p>
      )}
    </div>
  );
}

export default Todos;
