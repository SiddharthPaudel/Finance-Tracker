import React, { useState } from "react";
import { href } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white text-black shadow-md font-[Poppins]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 relative">
        
        {/* Left: Logo */}
        <href to="/" className="text-2xl font-bold whitespace-nowrap">
          💰 Finance Tracker
        </href>

        {/* Center: Nav hrefs */}
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 text-base font-semibold">
          <href to="/dashboard" className="hover:text-indigo-600 transition">
            Dashboard
          </href>
          <href to="/reports" className="hover:text-indigo-600 transition">
            Reports
          </href>
          <href to="/goals" className="hover:text-indigo-600 transition">
            Goals
          </href>
        </nav>

        {/* Right: Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <href
            to="/login"
            className="px-5 py-2 border border-black rounded-full hover:bg-black hover:text-white transition"
          >
            Login
          </href>
          <href
            to="/signup"
            className="px-5 py-2 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Sign Up
          </href>
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
          <href
            to="/dashboard"
            className="block hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </href>
          <href
            to="/reports"
            className="block hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Reports
          </href>
          <href
            to="/goals"
            className="block hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Goals
          </href>
          <hr className="border-gray-200" />
          <href
            to="/login"
            className="block hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </href>
          <href
            to="/signup"
            className="block hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </href>
        </div>
      )}
    </header>
  );
};

export default Header;
