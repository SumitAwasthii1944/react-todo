import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateTodo,
  deleteTodo,
  toggleComplete,
} from "../features/todo/todoSlice";

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  if (!todo) return null;

  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState("");

  useEffect(() => {
    if (todo && todo.text) {
      setTodoMsg(todo.text);
    } else if (todo) {
      setTodoMsg("");
    }
  }, [todo]);

  const editTodo = () => {
    dispatch(updateTodo({ id: todo._id, text: todoMsg }));
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    dispatch(toggleComplete(todo._id));
  };

  return (
    <div
      className={`flex border rounded-lg px-3 py-1.5 gap-x-3 duration-300 text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      {/* Input */}
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black border-3 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      {/* Edit / Save */}
      <button
        className={`w-8 h-8 rounded-lg flex justify-center items-center bg-gray-50 ${
          todo.completed
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:bg-gray-100"
        }`}
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else {
            setIsTodoEditable(true);
          }
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "💾" : "✏️"}
      </button>

      {/* Delete */}
      <button
        className="w-8 h-8 rounded-lg flex justify-center items-center bg-gray-50 hover:bg-red-200"
        onClick={() => {
          if (!todo._id) {
            console.error("Todo ID is missing");
            return;
          }
          dispatch(deleteTodo(todo._id));
        }}
      >
        ❌
      </button>
    </div>
  );
}

export default memo(TodoItem);
