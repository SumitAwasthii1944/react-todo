import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './components/Layout'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import TodoPage from './components/TodoPage.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'

const router= createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />}/>
        <Route path="/todos" element={<TodoPage />}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Route>
    )
  )
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
