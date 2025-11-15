import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { AuthContext } from "../ContextApi/AuthContext";
import profile from "../Icons/profile.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white text-black shadow font-[Poppins]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 relative">

        {/* Logo */}
        <Link to="/" className="text-xl font-semibold whitespace-nowrap">
          💰 Finance <span className="text-xl text-blue-500">Tracker</span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 text-base font-semibold">
          <Link to="/dashboard" className="hover:text-indigo-600 transition">Dashboard</Link>
          <Link to="/reports" className="hover:text-indigo-600 transition">Reports</Link>
          <Link to="/goals" className="hover:text-indigo-600 transition">Goals</Link>
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4">

          {/* IF USER NOT LOGGED IN */}
          {!user && (
            <>
              <Link
                to="/login"
                className="text-blue-500 px-5 py-2 border border-black rounded-ss-2xl hover:bg-black hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2 bg-black text-white rounded-br-2xl hover:bg-gray-800 transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* IF USER LOGGED IN */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2  px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <img
                  src={profile}
                  className="w-8 h-8 rounded-full"
                  alt="User"
                />
                <span className="font-medium">{user.name}</span>
                <ChevronDown size={18} />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-44 py-2 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>

                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden flex items-center text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white text-black border-t border-gray-200 px-6 pb-4 space-y-3">
          <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block hover:text-indigo-600">Dashboard</Link>
          <Link to="/reports" onClick={() => setMenuOpen(false)} className="block hover:text-indigo-600">Reports</Link>
          <Link to="/goals" onClick={() => setMenuOpen(false)} className="block hover:text-indigo-600">Goals</Link>

          <hr className="border-gray-200" />

          {!user && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block hover:text-indigo-600">Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="block hover:text-indigo-600">Sign Up</Link>
            </>
          )}

          {user && (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="block hover:text-indigo-600">Profile</Link>
              <button onClick={logout} className="block text-left w-full hover:text-indigo-600">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
