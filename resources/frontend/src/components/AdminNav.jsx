import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import host from "../utils/host"
import axios from 'axios';

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

    const [user, setUser] = useState();

    useEffect(() => {
        const fetchStats = async () => {
            try {

                // Fetch user (assuming 1st user = admin)
                const userRes = await axios.get(`${host}/api/users/1`);
                const user = userRes.data.data;

                setUser(user);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        }
        fetchStats();
    }, []);

    return (
        <nav className="bg-gradient-to-r from-green-50 to-green-100 shadow-md border-b border-green-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo + Brand */}
                    <div className="flex items-center space-x-3">
                        <Link to="/admin/inquiries" className="flex items-center">
                            <img src={Logo} alt="Logo" className="w-14 h-14 rounded-full border-2 border-green-400 shadow-sm" />
                        </Link>
                        <div className="hidden sm:block">
                            <p className="text-xl font-bold text-green-700">Ranveer Rose Nursery</p>
                            <p className="text-xs text-green-500">Admin Dashboard</p>
                        </div>
                    </div>

                    {/* Profile Dropdown for Desktop */}
                    <div className="relative hidden lg:block">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-green-700 hover:bg-green-100 transition-colors"
                        >
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-2 shadow-md">
                                <span className="text-white text-sm font-medium">R</span>
                            </div>
                            <span className="hidden lg:block font-semibold">Admin</span>
                            <ChevronDown className="ml-1 w-4 h-4 text-green-600" />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-green-100 py-2 z-50 animate-fadeIn">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-semibold text-green-800">Admin User</p>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                </div>
                                <button onClick={handleProfile} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
                                    Profile
                                </button>
                                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 rounded-md text-green-700 hover:bg-green-100"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-green-100 shadow-md">
                    <div className="pt-4 pb-3 border-t border-green-100">
                        <div className="px-3 flex items-center">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">R</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-base font-semibold text-green-800">Admin User</p>
                                <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                            <button onClick={handleProfile} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-green-700 hover:text-green-900 hover:bg-green-50">
                                Profile
                            </button>
                            <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Close dropdown on outside click */}
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
