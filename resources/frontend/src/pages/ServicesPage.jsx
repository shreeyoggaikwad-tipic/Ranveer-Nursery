import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import host from '../utils/host'


function ServicesPage() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        // Fetch all API data in parallel
        Promise.all([
            axios.get(`${host}/api/services`)
        ])
            .then((responses) => {
                setServices(responses[0].data.data);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="animate-fade-in">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Our <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">Services</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Comprehensive construction and design solutions tailored to bring your vision to life.
                            Quality craftsmanship meets innovative design in every project we undertake.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard key={service.id} service={service} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-300 mx-4 sm:mx-6 lg:mx-8 rounded-3xl mb-16">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 animate-fade-in">
                        Let's discuss your vision and create something extraordinary together.
                        Quality construction with affordable pricing in Pune.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                        <Link to="/contact" className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                            Book Free Consultation
                        </Link>
                        <Link to="/projects" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-orange-500 transform hover:scale-105 transition-all duration-300">
                            View Our Projects
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out;
                }
            `}</style>
        </div>
    );
}

export default ServicesPage;