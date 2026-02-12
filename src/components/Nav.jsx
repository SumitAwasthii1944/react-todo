import React, { useState } from "react";
import logo from "../assets/Todo-logo-transparent.png";
import { Link, NavLink } from "react-router-dom";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-400 flex items-center justify-between py-2 text-xl relative">
      {/* Logo */}
      <div>
        <Link to="/">
          <img src={logo} alt="Logo" className="w-20" />
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex flex-row gap-4 font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block py-2 px-3 duration-200 ${
              isActive ? "text-orange-700" : "text-gray-700"
            } hover:text-orange-700`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/todos"
          className={({ isActive }) =>
            `block py-2 px-3 duration-200 ${
              isActive ? "text-orange-700" : "text-gray-700"
            } hover:text-orange-700`
          }
        >
          Todos
        </NavLink>
      </div>

      {/* Desktop Auth Links */}
      <div className="hidden md:flex flex-row gap-2 font-semibold">
        <Link
          to="/signin"
          className="hover:text-gray-700 hover:underline duration-75"
        >
          Log in
        </Link>
        <div className="text-black font-bold">|</div>
        <Link
          to="/signup"
          className="hover:text-gray-700 hover:underline duration-75"
        >
          Sign up
        </Link>
      </div>

      {/* Hamburger Button (Mobile only) */}
      <button
        className="md:hidden flex items-center px-3 py-2 border rounded text-gray-700 border-gray-700 hover:text-orange-700 hover:border-orange-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="fill-current h-5 w-5"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 w-28 md:w-36 bg-gray-200 flex flex-col items-center gap-4 py-4 md:hidden z-60 transition duration-300">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block py-2 px-4 duration-200 ${
                isActive ? "text-orange-700" : "text-gray-700"
              } hover:text-orange-700`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/todos"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block py-2 px-4 duration-200 ${
                isActive ? "text-orange-700" : "text-gray-700"
              } hover:text-orange-700`
            }
          >
            Todos
          </NavLink>
          <Link
            to="/signin"
            onClick={() => setIsOpen(false)}
            className="block py-2 px-4 hover:text-orange-700"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="block py-2 px-4 hover:text-orange-700"
          >
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;