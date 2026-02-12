import React from 'react'

function Home(){
          return(
                    <div className='flex flex-col w-full justify-center items-center bg-white'>
                              <h1 className='text-3xl font-bold text-gray-800'>Welcome to the Todo App</h1>
                              <p className='text-gray-600 mt-4'>This is a Todo App built with MERN stack. You can add, delete and mark your todos as completed.</p>
                    </div>
          )
}

export default Home