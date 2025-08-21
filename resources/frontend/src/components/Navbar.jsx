import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const activeClass = "text-blue-600 font-semibold"; // Active link style
  const normalClass = "text-gray-700 hover:text-blue-600 transition-colors duration-300";

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <NavLink to="/" className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </NavLink>
            <h1 className="text-2xl font-bold text-gray-900">Rachnakar Enterprises</h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? activeClass : normalClass}>About</NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? activeClass : normalClass}>Projects</NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? activeClass : normalClass}>Services</NavLink>
            <NavLink to="/testimonials" className={({ isActive }) => isActive ? activeClass : normalClass}>Testimonials</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? activeClass : normalClass}>Contact</NavLink>
          </nav>

          <button className="md:hidden p-2">
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className="w-4 h-0.5 bg-gray-700 mb-1"></span>
              <span className="w-4 h-0.5 bg-gray-700 mb-1"></span>
              <span className="w-4 h-0.5 bg-gray-700"></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
