import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            💰 Finance <span className="text-blue-500">Tracker</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Track your expenses, manage your goals, and take control of your financial future — all in one place.
          </p>
        </div>

        {/* Center Section */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <Link to="/" className="text-gray-400 hover:text-blue-500 transition">Home</Link>
          <Link to="/dashboard" className="text-gray-400 hover:text-blue-500 transition">Dashboard</Link>
          <Link to="/reports" className="text-gray-400 hover:text-blue-500 transition">Reports</Link>
          <Link to="/goals" className="text-gray-400 hover:text-blue-500 transition">Goals</Link>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition">
              <Facebook size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition">
              <Twitter size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition">
              <Instagram size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition">
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 my-8" />

      <div className="text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Finance Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
