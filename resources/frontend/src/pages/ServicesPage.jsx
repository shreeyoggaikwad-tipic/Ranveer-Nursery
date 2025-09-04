import React, { useState } from 'react';
import { Leaf, Users, Award, Phone, Mail, MapPin, Flower, TreePine, Palette, Sprout, Scissors, Truck, Star, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function NurseryServicesPage() {
    const [activeService, setActiveService] = useState(null);

    const services = [
        {
            id: 1,
            icon: <Flower className="w-8 h-8" />,
            title: "Exotic Flowers",
            description: "Premium collection of rare and exotic flowering plants from around the world",
            features: ["Orchids & Tropical Blooms", "Seasonal Flower Arrangements", "Specialty Rose Varieties", "Indoor Flowering Plants"],
            price: "Starting from ₹299",
            color: "from-pink-500 to-red-500"
        },
        {
            id: 2,
            icon: <TreePine className="w-8 h-8" />,
            title: "Landscaping Design",
            description: "Complete landscape transformation with professional design and installation",
            features: ["Custom Garden Design", "Hardscape Installation", "Irrigation Systems", "Maintenance Plans"],
            price: "Starting from ₹15,000",
            color: "from-green-500 to-emerald-600"
        },
        {
            id: 3,
            icon: <Sprout className="w-8 h-8" />,
            title: "Home Gardens",
            description: "Transform your home with beautiful, sustainable garden solutions",
            features: ["Balcony Gardens", "Vertical Gardens", "Herb & Vegetable Patches", "Indoor Plant Setups"],
            price: "Starting from ₹2,500",
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: 4,
            icon: <Palette className="w-8 h-8" />,
            title: "Garden Consultation",
            description: "Expert advice and planning for your perfect garden space",
            features: ["Site Analysis", "Plant Selection Guidance", "Soil Testing", "Care Instructions"],
            price: "₹1,500 per visit",
            color: "from-purple-500 to-indigo-500"
        },
        {
            id: 5,
            icon: <Scissors className="w-8 h-8" />,
            title: "Lawn Services",
            description: "Comprehensive lawn care solutions to keep your outdoor spaces green and well-maintained",
            features: ["Grass Cutting", "Weeding", "Aeration", "Fertilization", "Seasonal Maintenance"],
            price: "₹1,200 per visit",
            color: "from-orange-500 to-yellow-500"
        },
        {
            id: 6,
            icon: <Truck className="w-8 h-8" />,
            title: "Plant Delivery",
            description: "Safe and reliable delivery of plants directly to your doorstep",
            features: ["Same Day Delivery", "Plant Installation", "Care Package Included", "Follow-up Support"],
            price: "₹200 within 10km",
            color: "from-teal-500 to-green-500"
        }
    ];


    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-10 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Our <span className="text-green-600">Premium</span> Services
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        From exotic flower collections to complete landscape transformations, we provide comprehensive plant and garden services to bring your botanical dreams to life.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className=" px-10 pb-10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Our <span className="text-green-600">Services</span></h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${activeService === service.id ? 'ring-4 ring-green-300' : ''
                                    }`}
                                onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                            >
                                <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                                    <div className="flex flex-row items-start gap-3  mb-4">
                                        {service.icon}
                                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                    </div>
                                    <p className="opacity-90">{service.description}</p>
                                </div>

                                <div className="p-6">
                                    <h4 className="font-semibold mb-4 text-gray-800">What's Included:</h4>
                                    <ul className="space-y-2 mb-6">
                                        {service.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-10 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">How We <span className="text-green-600">Work</span></h2>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">1</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Consultation</h3>
                            <p className="text-gray-600">We visit your space and understand your vision and requirements</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">2</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Design & Planning</h3>
                            <p className="text-gray-600">Our experts create a detailed plan tailored to your space and budget</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">3</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Implementation</h3>
                            <p className="text-gray-600">Professional installation with premium plants and materials</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">4</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Maintenance</h3>
                            <p className="text-gray-600">Ongoing care and support to ensure your garden thrives</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-green-100 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Your Green Journey?</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Join thousands of satisfied customers who have transformed their spaces with Ranveer Rose Nursery.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/contact" className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all">
                            Visit Our Nursery
                        </Link>
                        <Link to="/plants" className="border border-green-600 text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition-all">
                            Browse Plants
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}