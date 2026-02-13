import React, { useState, useEffect } from "react";
import logo from "../assets/Todo-logo-transparent.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

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

        {/* Show only if logged in */}
        {isLoggedIn && (
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
        )}
      </div>

      {/* Desktop Auth */}
      <div className="hidden md:flex flex-row gap-2 font-semibold">
        {!isLoggedIn ? (
          <>
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
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:text-red-600 duration-75"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Button */}
      <button
        className="md:hidden flex items-center px-3 py-2 border rounded text-gray-700 border-gray-700 hover:text-orange-700 hover:border-orange-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="fill-current h-5 w-5" viewBox="0 0 20 20">
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 w-28 md:w-36 bg-gray-200 flex flex-col items-center gap-4 py-4 md:hidden z-50">

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

          {isLoggedIn && (
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
          )}

          {!isLoggedIn ? (
            <>
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
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block py-2 px-4 hover:text-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Nav;
