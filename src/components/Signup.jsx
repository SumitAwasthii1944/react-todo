import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import API from "../api/axios"
import Logo from '../assets/Todo-logo-transparent.png'

function SignUp() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/signup", data)

      localStorage.setItem("token", res.data.token)

      navigate("/signin")   // make sure "/" route exists
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed")
    }
  }

  return (
    <div className='w-full flex items-center justify-center my-6 px-4'>
      <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>

        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <img src={Logo} alt="Logo" className='w-20' />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to your account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/signin"
            className="font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>

        {error && (
          <p className="text-red-600 mt-6 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
          <div className='space-y-5'>

            <input
              type="text"
              placeholder="Enter your fullname"
              {...register("fullname", { required: true })}
              className="w-full p-2 border rounded"
            />

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              placeholder="Enter your mobile no."
              {...register("mobileno", { required: true })}
              className="w-full p-2 border rounded"
            />

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
              className="w-full p-2 border rounded"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded"
            >
              Sign up
            </button>

          </div>
        </form>

      </div>
    </div>
  )
}

export default SignUp
