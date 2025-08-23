import React, { useState } from 'react';
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLink, Link, useNavigate } from 'react-router-dom';

function AdminNav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleProfile = () => {
        navigate("/admin/profile");
    };

    const activeClass = "text-indigo-600 font-semibold";
    const normalClass = "text-gray-700 hover:text-indigo-600 transition-colors";

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link to="/admin/dashboard" className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">R</span>
                        </Link>
                        <div className="ml-3 hidden sm:block">
                            <p className="text-xl font-bold text-black">Rachnakar Enterprises</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? activeClass : normalClass}>
                            <span className="mr-2">📊</span> Dashboard
                        </NavLink>
                        <NavLink to="/admin/projects" className={({ isActive }) => isActive ? activeClass : normalClass}>
                            <span className="mr-2">🏗️</span> Projects
                        </NavLink>
                        <NavLink to="/admin/services" className={({ isActive }) => isActive ? activeClass : normalClass}>
                            <span className="mr-2">⚙️</span> Services
                        </NavLink>
                        <NavLink to="/admin/testimonials" className={({ isActive }) => isActive ? activeClass : normalClass}>
                            <span className="mr-2">💬</span> Testimonials
                        </NavLink>
                        <NavLink to="/admin/inquiries" className={({ isActive }) => isActive ? activeClass : normalClass}>
                            <span className="mr-2">📩</span> Inquiries
                        </NavLink>
                    </div>

                    {/* User Profile Dropdown */}
                    <div className="relative hidden lg:block">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-2">
                                <span className="text-white text-sm font-medium">A</span>
                            </div>
                            <span className="hidden lg:block">Admin User</span>
                            <ChevronDown className="ml-1 w-4 h-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                                <div className="px-4 py-2 border-b border-gray-200">
                                    <p className="text-sm font-medium text-gray-900">Admin User</p>
                                    <p className="text-xs text-gray-500">admin@example.com</p>
                                </div>

                                <button onClick={handleProfile} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    Profile
                                </button>
                                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    Logout
                                </button>
                    
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200">
                    <div className="flex flex-row flex-wrap justify-evenly items-center px-2 pt-2 pb-3 space-y-1">
                        <NavLink
                            to="/admin/dashboard"
                            className={({ isActive }) => isActive ? activeClass : normalClass}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="mr-3">📊</span> Dashboard
                        </NavLink>

                        <NavLink
                            to="/admin/projects"
                            className={({ isActive }) => isActive ? activeClass : normalClass}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="mr-3">🏗️</span> Projects
                        </NavLink>

                        <NavLink
                            to="/admin/services"
                            className={({ isActive }) => isActive ? activeClass : normalClass}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="mr-3">⚙️</span> Services
                        </NavLink>

                        <NavLink
                            to="/admin/testimonials"
                            className={({ isActive }) => isActive ? activeClass : normalClass}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="mr-3">💬</span> Testimonials
                        </NavLink>

                        <NavLink
                            to="/admin/inquiries"
                            className={({ isActive }) => isActive ? activeClass : normalClass}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="mr-3">📩</span> Inquiries
                        </NavLink>
                    </div>

                    {/* Mobile User Profile */}
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="px-3 flex items-center">
                            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">A</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-base font-medium text-gray-800">Admin User</p>
                                <p className="text-sm text-gray-500">admin@example.com</p>
                            </div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                            <button onClick={handleProfile} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
                               Profile
                           </button>
                            <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
                                Logout
                            </button>
                           
                        </div>
                    </div>
                </div>
            )}

            {/* Click outside to close dropdown */}
            {dropdownOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                />
            )}
        </nav>
    );
}

export default AdminNav;
