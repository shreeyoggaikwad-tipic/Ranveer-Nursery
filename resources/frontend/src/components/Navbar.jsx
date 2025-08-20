import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Rachnakar Enterprises</h1>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Home</Link>
                        <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">About</Link>
                        <Link to="/projects" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Projects</Link>
                        <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Services</Link>
                        <Link to="/testimonials" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Testimonials</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Contact</Link>
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
    )
}

export default Navbar
