import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlantsDropdownOpen, setIsPlantsDropdownOpen] = useState(false);
  const [isMobilePlantsOpen, setIsMobilePlantsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const activeClass = "text-green-600 font-semibold border-b-2 border-green-500";
  const normalClass = "text-gray-700 hover:text-green-600 transition-all duration-300 hover:scale-105";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPlantsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle hover with delay
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsPlantsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsPlantsDropdownOpen(false);
    }, 150);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const plantCategories = [
    { name: 'Flowering Plants', path: '/plants', emoji: '🌺' },
    { name: 'Fruit Plants', path: '/plants', emoji: '🍎' },
    { name: 'Seeds', path: '/plants', emoji: '🌱' },
    { name: 'Other Plants', path: '/plants', emoji: '🌿' },
  ];

  return (
    <header className="bg-gradient-to-r from-green-50 to-amber-50 backdrop-blur-md shadow-md sticky top-0 z-50 transition-all duration-300 border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <NavLink to="/" className="w-16 h-16 flex items-center justify-center">
              <img src={Logo} alt="Ranveer Rose Nursery Logo" className="w-14 h-14 object-contain" />
            </NavLink>
            <div>
              <h1 className="text-2xl font-bold text-green-800">Ranveer Rose Nursery</h1>
              <p className="text-sm text-amber-700 font-medium">Growing Nature's Beauty</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex justify-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) => `px-4 py-2 rounded-md ${isActive ? activeClass : normalClass}`}
            >
              🏠 Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `px-4 py-2 rounded-md ${isActive ? activeClass : normalClass}`}
            >
              🌱 About
            </NavLink>

            {/* Plants Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className={`px-4 py-2 rounded-md flex items-center space-x-1 ${normalClass}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsPlantsDropdownOpen(!isPlantsDropdownOpen)}
              >
                <span>🌿 Plants</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isPlantsDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isPlantsDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-green-100 py-2 z-10"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {plantCategories.map((category) => (
                    <NavLink
                      key={category.name}
                      to={category.path}
                      state={{ category: category.name }} // ✅ Pass category name in state
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200"
                      onClick={() => setIsPlantsDropdownOpen(false)}
                    >
                      <span>{category.emoji}</span>
                      <span>{category.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/tools"
              className={({ isActive }) => `px-4 py-2 rounded-md ${isActive ? activeClass : normalClass}`}
            >
              🛠️ Tools
            </NavLink>
            <NavLink
              to="/reviews"
              className={({ isActive }) => `px-4 py-2 rounded-md ${isActive ? activeClass : normalClass}`}
            >
              💬 Reviews
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => `px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg transition-all duration-300 ${isActive ? 'bg-green-700' : ''}`}
            >
              📞 Contact Us
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 focus:outline-none bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`w-5 h-0.5 bg-green-700 mb-1 transform transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-5 h-0.5 bg-green-700 mb-1 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-5 h-0.5 bg-green-700 transform transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="lg:hidden mt-4 mb-4 flex flex-col space-y-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-green-100">
            <NavLink
              to="/"
              className={({ isActive }) => `px-4 py-3 rounded-lg flex items-center space-x-3 ${isActive ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'} transition-all duration-300`}
              onClick={() => setIsOpen(false)}
            >
              <span>🏠</span><span>Home</span>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `px-4 py-3 rounded-lg flex items-center space-x-3 ${isActive ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'} transition-all duration-300`}
              onClick={() => setIsOpen(false)}
            >
              <span>🌱</span><span>About</span>
            </NavLink>

            {/* Mobile Plants Section with Submenu */}
            <div>
              <button
                className="w-full px-4 py-3 rounded-lg flex items-center justify-between text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300"
                onClick={() => setIsMobilePlantsOpen(!isMobilePlantsOpen)}
              >
                <div className="flex items-center space-x-3">
                  <span>🌿</span><span>Plants</span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isMobilePlantsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMobilePlantsOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {plantCategories.map((category) => (
                    <NavLink
                      key={category.path}
                      to={category.path}
                      state={{ category: category.name }}
                      className="px-4 py-2 rounded-lg flex items-center space-x-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-all duration-300 text-sm"
                      onClick={() => { setIsOpen(false); setIsMobilePlantsOpen(false); }}
                    >
                      <span>{category.emoji}</span>
                      <span>{category.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/tools"
              className={({ isActive }) => `px-4 py-3 rounded-lg flex items-center space-x-3 ${isActive ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'} transition-all duration-300`}
              onClick={() => setIsOpen(false)}
            >
              <span>🛠️</span><span>Tools</span>
            </NavLink>
            <NavLink
              to="/reviews"
              className={({ isActive }) => `px-4 py-3 rounded-lg flex items-center space-x-3 ${isActive ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'} transition-all duration-300`}
              onClick={() => setIsOpen(false)}
            >
              <span>💬</span><span>Reviews</span>
            </NavLink>
            <NavLink
              to="/contact"
              className="px-4 py-3 rounded-lg flex items-center space-x-3 bg-green-600 text-white hover:bg-green-700 transition-all duration-300 mt-2"
              onClick={() => setIsOpen(false)}
            >
              <span>📞</span><span>Contact Us</span>
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;