import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../features/todo/todoSlice";

function AddTodo() {
  const [input, setInput] = useState("");
  const [loading,setLoading] =useState(false)
  const dispatch = useDispatch();

  const addTodoHandler = async (e) => {
    e.preventDefault();

    try {
      if (!input.trim()) return;
      setLoading(true)
      await dispatch(createTodo(input));
      setInput("");
    } catch (error) {
      alert("adding todo failed")
    }finally{
      setLoading(false)
    }
  };

  return (
    <form
      onSubmit={addTodoHandler}
      className="flex justify-center items-center space-x-3 mt-12"
    >
      <input
        type="text"
        className="bg-gray-800 md:w-xs md:h-11 w-36 h-8 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        type="submit"
        className="text-white flex justify-center items-center bg-indigo-500 border-0 py-3 px-5 focus:outline-none hover:bg-indigo-600 rounded text-sm"
      >
        {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "Add Todo"
        )}
      </button>
    </form>
  );
}

export default AddTodo;
