import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import host from "../utils/host"
import axios from 'axios';

function Footer() {

    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {

                // Fetch user (assuming 1st user = admin)
                const userRes = await axios.get(`${host}/api/users/1`);
                const user = userRes.data.data;

                setUser([
                    { number: user.email, label: "📧", a: `mailto:${user.email}` },
                    { number: user.number, label: "📞", a: `tel:+91${user.number}` },
                    { number: user.location, label: "📍", a: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(user.location)}` },
                ]);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        }
        fetchStats();
    }, []);

    return (
        <footer className="bg-gray-900 text-white pb-4 pt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center">
                                {/* <span className="text-white font-bold text-lg">R</span> */}
                                <img src={Logo} alt="Logo" className="w-12 h-12" />
                            </div>
                            <h4 className="text-xl font-bold">Ranveer Rose Nursery</h4>
                        </div>
                        <p className="text-gray-400">From flowering beauties to fruitful harvests, we make gardening simple and joyful.</p>
                    </div>

                    <div className='flex flex-col '>
                        <h5 className="font-bold mb-4">Quick Links</h5>
                        <ul className="space-y-2 text-gray-400 ">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/plants" className="hover:text-white transition-colors">Plants</Link></li>
                            <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>


                    <div>
                        <h5 className="font-bold mb-4">Contact Info</h5>
                        <div className="space-y-2 text-gray-400 text-wrap">
                            {user.map((info, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <span className="text-sm">{info.label}</span>
                                    <a href={info.a} className="font-semibold break-all">{info.number}</a>
                                </div>
                            ))}
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
