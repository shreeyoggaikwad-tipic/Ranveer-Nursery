import React from 'react'
import { Link } from 'react-router-dom'
import HomeImg from '../assets/homepage.jfif'

function Hero() {
    return (
        <section id="home" className="relative pb-20 pt-10 lg:pb-32 lg:pt-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in-up">
                        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Custom Homes &{' '}
                            <span className="bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text text-transparent">
                                Apartments
                            </span>{' '}
                            Designed for You
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Quality construction with affordable pricing in Pune. We transform your vision into reality with expert craftsmanship and innovative designs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/contact" className="px-8 py-4 bg-orange-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                                Book Free Consultation
                            </Link>
                            <Link to="/projects" className="px-8 py-4 border-2 border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300">
                                View Our Projects
                            </Link>
                        </div>
                    </div>

                    <div className="relative animate-fade-in-right">
                        <div className="relative z-10">
                            <img
                                src={HomeImg}
                                alt="Modern Construction"
                                className="rounded-2xl shadow-2xl w-full"
                            />
                        </div>
                        <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl opacity-20 animate-float"></div>
                        <div className="absolute -bottom-6 -left-6 w-60 h-60 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl opacity-20 animate-float-delayed"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
