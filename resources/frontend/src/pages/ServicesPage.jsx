import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';

function ServicesPage() {
    const services = [
        {
            id: 1,
            title: "Custom Home Construction",
            description: "Design and build your dream home with our expert team. From concept to completion, we handle every detail with precision and care.",
            icon: "🏠",
            features: ["Architectural Planning", "Interior Design", "Quality Materials", "Timeline Management"]
        },
        {
            id: 2,
            title: "Apartment Development",
            description: "Modern apartment complexes designed for comfort and lifestyle. We create spaces that residents love to call home.",
            icon: "🏢",
            features: ["Multi-unit Planning", "Amenity Integration", "Parking Solutions", "Security Systems"]
        },
        {
            id: 3,
            title: "Renovation Services",
            description: "Transform your existing space with our comprehensive renovation services. Breathe new life into your property.",
            icon: "🔨",
            features: ["Kitchen Remodeling", "Bathroom Upgrades", "Flooring Installation", "Electrical Updates"]
        },
        {
            id: 4,
            title: "Commercial Construction",
            description: "Professional commercial buildings designed for business success. Modern facilities that enhance productivity.",
            icon: "🏗️",
            features: ["Office Complexes", "Retail Spaces", "Industrial Buildings", "Compliance Management"]
        },
        {
            id: 5,
            title: "Interior Design",
            description: "Complete interior design solutions that reflect your style and personality. Every detail carefully curated.",
            icon: "🎨",
            features: ["Space Planning", "Furniture Selection", "Lighting Design", "Color Coordination"]
        },
        {
            id: 6,
            title: "Project Management",
            description: "End-to-end project management ensuring timely delivery and quality execution of all construction phases.",
            icon: "📋",
            features: ["Timeline Planning", "Budget Management", "Quality Control", "Vendor Coordination"]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="animate-fade-in">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Our <span className="text-blue-600">Services</span>
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
            <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 mx-4 sm:mx-6 lg:mx-8 rounded-3xl mb-16">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 animate-fade-in">
                        Let's discuss your vision and create something extraordinary together. 
                        Quality construction with affordable pricing in Pune.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                            Book Free Consultation
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
                            View Our Projects
                        </button>
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