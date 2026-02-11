import {createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: [{id: 1, text: "Hello world", completed: false }]
}



export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), 
                text: action.payload,
                completed: false
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload )// filter out the todo item with the matching id and update the state with the new array of todos
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);// find the todo item with the matching id
            if (todo) {
                todo.text = text;
            }
        },
        toggleComplete: (state, action) => {
            const id = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        }
    }
})


export const {addTodo, removeTodo,updateTodo, toggleComplete} = todoSlice.actions

export default todoSlice.reducer