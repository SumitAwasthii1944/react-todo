import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import API from "../api/axios";
import Logo from '../assets/Todo-logo-transparent.png'

function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")
  const [loading,setLoading] =useState(false)

  // This will run when form submits
const onSubmit = async (data) => {
  try {
    setLoading(true)
    const res = await API.post("/signin", {
      email: data.email,
      password: data.password,
    });

    localStorage.setItem("token", res.data.token);
    navigate("/");
    window.location.reload();
  } catch (err) {
    alert("Login failed");
  }finally{
    setLoading(false)
  }
};




  return (
    <div className='w-full flex items-center justify-center my-6 px-4'>
      <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
        
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <img src={Logo} alt="Logo" className='w-20' />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:underline "
          >
            Sign Up
          </Link>
        </p>

        {error && (
          <p className="text-red-600 mt-6 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
          <div className='space-y-5'>

            <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full p-2 border rounded"
            />

            <input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded"
              {...register("password", {
                required: "Password is required"
              })}
            />

            <button
                type="submit"
                className="w-full flex justify-center items-center bg-blue-600 text-white p-2 rounded"
                >
                {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Sign in"
                )}
            </button>


          </div>
        </form>

      </div>
    </div>
  )
}

export default Login
