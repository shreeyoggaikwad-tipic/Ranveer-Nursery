import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

function Footer() {

    // const [user, setUser] = useState([]);

    const [userData, setUserData] = useState({
        email: 'ranveerrosenursery8644@gmail.com',
        number: '+91 97642 03636',
        location: 'A/p. Koregaon Mul, Inamdarvasti, Tal.Haveli, Dist.Pune-412202'
    });

    const contactInfo = [
        { number: userData.email, label: "📧", a: `mailto:${userData.email}` },
        { number: userData.number, label: "📞", a: `tel:${userData.number}` },
        { number: userData.location, label: "📍", a: `https://maps.google.com?q=${encodeURIComponent(userData.location)}` }
    ];

    return (
        <footer className="bg-gray-900 text-white pb-4 pt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center">
                                {/* <span className="text-white font-bold text-lg">R</span> */}
                                <img src={Logo} alt="Logo" className="w-14 h-14" />
                            </div>
                            <h4 className="text-xl font-bold">Ranveer Rose Nursery</h4>
                        </div>
                        <p className="text-gray-400">From flowering beauties to fruitful harvests, we make gardening simple and joyful.</p>
                        <Link to="/admin/login" className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-green-500 to-green-500 
             text-white rounded-full font-semibold shadow-md 
             hover:from-green-400 hover:to-green-500 transition-all duration-500">
                            Admin Login
                        </Link>
                    </div>

                    <div>
                        <h5 className="font-bold mb-4">Quick Links</h5>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/plants" className="hover:text-white transition-colors">Plants</Link></li>
                            <li><Link to="/tools" className="hover:text-white transition-colors">Gargen Tools</Link></li>
                            <li><Link to="/reviews" className="hover:text-white transition-colors">Customer Reviews</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>


                    <div>
                        <h5 className="font-bold mb-4">Contact Info</h5>
                        <div className="space-y-2 text-gray-400">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <span className="text-sm">{info.label}</span>
                                    <a href={info.a} className="font-semibold">{info.number}</a>
                                </div>
                            ))}
                        </div>
                        <div className='pt-8'>
                            <div className="flex justify-center space-x-4">
                                <a
                                    href="#"
                                    className="bg-green-100/30 hover:bg-green-200/50 p-3 rounded-2xl transition-colors"
                                >
                                    <Facebook className="w-6 h-6 text-white" />
                                </a>
                                <a
                                    href="#"
                                    className="bg-green-100/30 hover:bg-green-200/50 p-3 rounded-2xl transition-colors"
                                >
                                    <Twitter className="w-6 h-6 text-white" />
                                </a>
                                <a
                                    href="#"
                                    className="bg-green-100/30 hover:bg-green-200/50 p-3 rounded-2xl transition-colors"
                                >
                                    <Linkedin className="w-6 h-6 text-white" />
                                </a>
                                <a
                                    href="#"
                                    className="bg-green-100/30 hover:bg-green-200/50 p-3 rounded-2xl transition-colors"
                                >
                                    <Instagram className="w-6 h-6 text-white" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400">
                    <p>&copy; 2025 Ranveer Rose Nursery. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
