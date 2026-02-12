import React from "react";
import logo from '../assets/Todo-logo-transparent.png'
import {Link , NavLink} from 'react-router-dom';

function Nav() {
  return (
    <nav className="w-full h-18 bg-gray-400 flex mt-0 text-xl items-center justify-between px-2">
         <div>
           <Link to="/">
                    <img src={logo} alt="" className="w-20"/>
           </Link>
         </div>
         <div className="flex flex-row gap-4  font-semibold">
                    <NavLink
                    to="/"
                    className={({isActive}) =>
                              `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                    >
                              Home
                    </NavLink>
      
                    <NavLink
                    to="/todos"
                    className={({isActive}) =>
                              `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                    >
                              Todos
                    </NavLink>
         </div>
         <div className="flex flex-row gap-2 font-semibold">
                    <Link
                    to='/signin'
                    className='block rounded-lg h-auto  hover:text-gray-700 hover:underline duration-75'
                    >
                              Log in
                    </Link>
                    <div className="text-black font-bold ">|</div>
                    <Link
                    to='/signup'
                    className='block rounded-lg h-auto hover:text-gray-700 hover:underline duration-75'
                    >
                              Sign up
                    </Link>
         </div>
    </nav>
  );
}

export default Nav;