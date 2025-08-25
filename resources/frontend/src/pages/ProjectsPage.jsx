import React, { useState, useEffect } from 'react';
import { Building2, Filter, Search, MapPin, Calendar, Users, Award, ArrowRight, Home, Building } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProjectImg from '../assets/projectpage.jfif';
import host from '../utils/host'


export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setIsVisible(true);
    }, []);


    useEffect(() => {
        // Fetch all API data in parallel
        Promise.all([
            axios.get(`${host}/api/projects`)
        ])
            .then((responses) => {
                setProjects(responses[0].data.data);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    const filterOptions = [
        { key: 'all', label: 'All Projects', icon: <Building2 className="w-4 h-4" /> },
        { key: 'home', label: 'Custom Homes', icon: <Home className="w-4 h-4" /> },
        { key: 'apartment', label: 'Apartments', icon: <Building className="w-4 h-4" /> },
        { key: 'completed', label: 'Completed', icon: <Award className="w-4 h-4" /> },
        { key: 'in-progress', label: 'In Progress', icon: <Calendar className="w-4 h-4" /> }
    ];

    const filteredProjects = projects.filter(project => {
        const matchesFilter = activeFilter === 'all' ||
            project.type === activeFilter ||
            project.status === activeFilter;
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <style >{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                    opacity: 0;
                }
                
                .animate-slide-in-left {
                    animation: slideInLeft 0.8s ease-out forwards;
                }
                
                .animate-slide-in-right {
                    animation: slideInRight 0.8s ease-out forwards;
                }
            `}</style>

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
                            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Our Featured
                                <span className="bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text text-transparent block">Projects</span>
                                in Pune
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Quality construction with affordable pricing in Pune. We transform
                                your vision into reality with expert craftsmanship and innovative
                                designs.
                            </p>
                        </div>
                        <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                            <div className="relative">
                                <img
                                    src={ProjectImg}
                                    alt="Modern construction project"
                                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                                />
                                {/* <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-green-100 p-3 rounded-full">
                                            <Building2 className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Latest Project</p>
                                            <p className="font-semibold text-gray-900">Tech Park Plaza</p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        {/* Filters */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <Filter className="text-gray-500 w-5 h-5" />
                            {filterOptions.map((option) => (
                                <button
                                    key={option.key}
                                    onClick={() => setActiveFilter(option.key)}
                                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${activeFilter === option.key
                                        ? 'bg-orange-600 text-white shadow-lg scale-105'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {option.icon}
                                    <span>{option.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                {filteredProjects.length > 0 ? (
                    <>
                        <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                {activeFilter === 'all' ? 'All Projects' : `${filterOptions.find(f => f.key === activeFilter)?.label}`}
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Showing {filteredProjects.length} of {projects.length} projects in Pune
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20 animate-fade-in-up">
                        <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
                            <p className="text-gray-500">
                                Try adjusting your search terms or filters to find what you're looking for.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Call to Action */}
            <div className="bg-white py-20">
                <div className="max-w-4xl mx-auto text-center px-6 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Ready to Start Your
                        <span className="bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text text-transparent"> Dream Project</span>?
                    </h2>
                    <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Let's discuss your vision and bring it to life with our expert civil engineering solutions in Pune.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                            Book Free Consultation
                        </Link>
                        <Link to="/projects" className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-orange-600 hover:text-white transform hover:scale-105 transition-all duration-300">
                            View Our Projects
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}