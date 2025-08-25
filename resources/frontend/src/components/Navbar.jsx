import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png'; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const activeClass = "text-orange-500 font-semibold"; // Active link style
  const normalClass = "text-gray-700 hover:text-[#ea7c1d] transition-colors duration-300";

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <NavLink to="/" className="w-20 h-20 flex items-center justify-center">
              <img src={Logo} alt="Logo" />
            </NavLink>
            <h1 className="text-2xl font-bold text-gray-900">Rachnakar Enterprises</h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? activeClass : normalClass}>About</NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? activeClass : normalClass}>Projects</NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? activeClass : normalClass}>Services</NavLink>
            <NavLink to="/testimonials" className={({ isActive }) => isActive ? activeClass : normalClass}>Testimonials</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? activeClass : normalClass}>Contact</NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className="w-4 h-0.5 bg-gray-700 mb-1"></span>
              <span className="w-4 h-0.5 bg-gray-700 mb-1"></span>
              <span className="w-4 h-0.5 bg-gray-700"></span>
            </div>
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden mt-4 flex flex-col space-y-4 bg-white rounded-lg shadow-lg p-4">
            <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass} onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? activeClass : normalClass} onClick={() => setIsOpen(false)}>About</NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? activeClass : normalClass} onClick={() => setIsOpen(false)}>Projects</NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? activeClass : normalClass} onClick={() => setIsOpen(false)}>Services</NavLink>
            <NavLink to="/testimonials" className={({ isActive }) => isActive ? activeClass : normalClass} onClick={() => setIsOpen(false)}>Testimonials</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? activeClass : normalClass} onClick={() => setIsOpen(false)}>Contact</NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
