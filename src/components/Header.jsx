import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
 


  return (
    <header className="bg-white text-black shadow font-[Poppins]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 relative">
        
        {/* Left: Logo */}
        <Link to="/" className="text-xl font-semibold whitespace-nowrap">
          💰 Finance <span className="text-xl text-blue-500 ">Tracker</span> 
        </Link>

        {/* Center: Nav Links */}
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 text-base font-semibold">
          <Link to="/dashboard" className="hover:text-indigo-600 transition">
            Dashboard
          </Link>
          <Link to="/reports" className="hover:text-indigo-600 transition">
            Reports
          </Link>
          <Link to="/goals" className="hover:text-indigo-600 transition">
            Goals
          </Link>
        </nav>

        {/* Right: Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="text-blue-500 px-5 py-2 border border-black rounded-ss-2xl hover:bg-black hover:text-white transition "
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 bg-black text-white rounded-br-2xl  hover:bg-gray-800 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
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
          <Link
            to="/dashboard"
            className="block hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/reports"
            className="block hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Reports
          </Link>
          <Link
            to="/goals"
            className="block hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Goals
          </Link>
          <hr className="border-gray-200" />
          <Link
            to="/login"
            className="block hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
