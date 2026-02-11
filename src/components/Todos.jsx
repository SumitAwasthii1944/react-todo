import React,{memo, useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { updateTodo, removeTodo, toggleComplete } from "../features/todo/todoSlice";

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  
  if (!todo) return null; // if the todo prop is not provided, return null to prevent rendering errors

  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState("");
  useEffect(() => {// useEffect hook to update the todoMsg state variable whenever the todo prop changes. This ensures that the input field for editing the todo item is always in sync with the current text of the todo item.
    if (todo) {
      setTodoMsg(todo.text);
    }
  }, [todo]);


  const editTodo = () => {
    dispatch(updateTodo({ id: todo.id, text: todoMsg }));
    setIsTodoEditable(false);// after dispatching the updateTodo action to save the changes to the todo item, set the isTodoEditable state variable to false to disable editing of the todo item and return it to its normal display mode
  };

  const toggleCompleted = () => {
    dispatch(toggleComplete(todo.id));
  };

  return (
    <div
      className={`flex border rounded-lg px-3 py-1.5 gap-x-3 duration-300 text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"// apply different background colors based on whether the todo item is completed or not
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
        className={`w-8 h-8 rounded-lg flex justify-center active:border-none items-center bg-gray-50 ${
          todo.completed ? "cursor-not-allowed opacity-0" : "cursor-pointer hover:bg-gray-100"
        }`}
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();// if the isTodoEditable state variable is true, call the editTodo function to save the changes to the todo item when the edit button is clicked
          } else {
            setIsTodoEditable(true);// set the isTodoEditable state variable to true to enable editing of the todo item when the edit button is clicked
          }
        }}
        disabled={todo.completed}// disable the edit button if the todo item is completed to prevent editing of completed items
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>

      {/* Delete */}
      <button
        className="w-8 h-8 rounded-lg border-none flex justify-center items-center bg-gray-50"
        onClick={() => dispatch(removeTodo(todo.id))}
      >
        ❌
      </button>
    </div>
  );
}

export default memo(TodoItem);// memoize the TodoItem component to prevent unnecessary re-renders when the props do not change
