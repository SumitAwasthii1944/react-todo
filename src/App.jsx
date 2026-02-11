import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTodo from './components/AddTodo'
import AllTodos from './components/AllTodos'

function App() {

  return (
    <>
      <AddTodo />
      <AllTodos />
    </>
  )
}

export default App
