import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-900 text-white pb-4 pt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">R</span>
                            </div>
                            <h4 className="text-xl font-bold">Rachnakar Enterprises</h4>
                        </div>
                        <p className="text-gray-400">Building dreams with quality and trust in Pune.</p>
                        <Link to="/admin/login" className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 
             text-white rounded-full font-semibold shadow-md 
             hover:from-indigo-600 hover:to-blue-600 transition-all duration-300">
                            Admin Login
                        </Link>
                    </div>

                    <div>
                        <h5 className="font-bold mb-4">Quick Links</h5>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Projects</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold mb-4">Services</h5>
                        <ul className="space-y-2 text-gray-400">
                            <li>Custom Homes</li>
                            <li>Apartments</li>
                            <li>Renovation</li>
                            <li>Interior Design</li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold mb-4">Contact Info</h5>
                        <div className="space-y-2 text-gray-400">
                            <p>📧 info@rachnakar.com</p>
                            <p>📞 +91 98765 43210</p>
                            <p>📍 Pune, Maharashtra</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400">
                    <p>&copy; 2025 Rachnakar Enterprises. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
