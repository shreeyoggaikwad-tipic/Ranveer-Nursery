import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Filter, Flower, Apple, Sparkles, TreePine, Search, Grid, List } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PlantCard from '../components/PlantCard';
import Rose from "../assets/Rose.jpg"
import SunflowerSeeds from "../assets/SunflowerSeeds.jpg"
import MangoSampling from "../assets/MangoSampling.webp"
import MoneyPlant from "../assets/MoneyPlant.jpg"
import Jasmine from "../assets/Jasmine.webp"
import LeamonTree from "../assets/LeamonTree.jpg"
import SnakePlant from "../assets/SnakePlant.avif"
import TomatoSeeds from "../assets/TomatoSeeds.jpg"

const NurseryPlantsPage = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const location = useLocation();

    useEffect(() => {
        if (location.state?.category) {
            switch (location.state.category) {
                case 'Flowering Plants':
                    setActiveFilter('flowering');
                    break;
                case 'Fruit Plants':
                    setActiveFilter('fruit');
                    break;
                case 'Seeds':
                    setActiveFilter('seeds');
                    break;
                case 'Other Plants':
                    setActiveFilter('other');
                    break;
                default:
                    setActiveFilter('all');
            }
        }
    }, [location.state]);

    // Sample plant data
    const plants = [
        {
            id: 1,
            name: "Premium Red Rose",
            category: "Flowering Plant",
            image: Rose,
            description: "Beautiful red roses perfect for gardens"
        },
        {
            id: 2,
            name: "Mango Sapling",
            category: "Fruit Plant",
            image: MangoSampling,
            description: "High-quality mango tree sapling"
        },
        {
            id: 3,
            name: "Sunflower Seeds",
            category: "Seeds",
            image: SunflowerSeeds,
            description: "Premium sunflower seeds for plantation"
        },
        {
            id: 4,
            name: "Money Plant",
            category: "Other",
            image: MoneyPlant,
            description: "Easy to grow indoor plant"
        },
        {
            id: 5,
            name: "Jasmine Plant",
            category: "Flowering Plant",
            image: Jasmine,
            description: "Fragrant white jasmine flowers"
        },
        {
            id: 6,
            name: "Lemon Tree",
            category: "Fruit Plant",
            image: LeamonTree,
            description: "Fresh lemon tree for home garden"
        },
        {
            id: 7,
            name: "Tomato Seeds",
            category: "Seeds",
            image: TomatoSeeds,
            description: "Organic tomato seeds"
        },
        {
            id: 8,
            name: "Snake Plant",
            category: "Other",
            image: SnakePlant,
            description: "Low maintenance air purifying plant"
        }
    ];

    const filterOptions = [
        { id: 'all', label: 'All Plants', icon: Filter, color: 'green' },
        { id: 'flowering', label: 'Flowering Plants', icon: Flower, color: 'green' },
        { id: 'fruit', label: 'Fruit Plants', icon: Apple, color: 'green' },
        { id: 'seeds', label: 'Seeds', icon: Sparkles, color: 'green' },
        { id: 'other', label: 'Other Plants', icon: TreePine, color: 'green' }
    ];

    const filteredPlants = plants.filter(plant => {
        const categoryMap = {
            flowering: 'Flowering Plant',
            fruit: 'Fruit Plant',
            seeds: 'Seeds',
            other: 'Other'
        };
        const matchesFilter = activeFilter === 'all' || plant.category === categoryMap[activeFilter];
        const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plant.description.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const PlantIcon = ({ category }) => {
        switch (category) {
            case 'flowering':
                return (
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
                        <Flower className="w-8 h-8 text-white" />
                    </div>
                );
            case 'fruit':
                return (
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                        <Apple className="w-8 h-8 text-white" />
                    </div>
                );
            case 'seeds':
                return (
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                );
            default:
                return (
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                        <TreePine className="w-8 h-8 text-white" />
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and View Controls */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search plants..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-3 p-2 bg-white rounded-2xl shadow-lg border border-gray-100">
                        {filterOptions.map((filter) => {
                            const IconComponent = filter.icon;
                            const isActive = activeFilter === filter.id;

                            return (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${isActive
                                        ? `bg-${filter.color}-500 text-white shadow-lg transform scale-105`
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <IconComponent className="w-5 h-5" />
                                    <span className="hidden sm:inline">{filter.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Results Summary */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {activeFilter === 'all' ? 'All Plants' : filterOptions.find(f => f.id === activeFilter)?.label}
                    </h2>
                    <p className="text-gray-600">
                        Showing {filteredPlants.length} of {plants.length} plants
                        {searchTerm && ` matching "${searchTerm}"`}
                    </p>
                </div>

                {/* Plants Grid/List */}
                {filteredPlants.length > 0 ? (
                    <div className={
                        viewMode === 'grid'
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            : "space-y-4"
                    }>
                        {filteredPlants.map((plant) => (
                            <PlantCard key={plant.id} image={plant.image} name={plant.name} description={plant.description} category={plant.category} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <TreePine className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No plants found</h3>
                        <p className="text-gray-500">
                            {searchTerm
                                ? `No plants match your search "${searchTerm}"`
                                : "No plants available in this category"
                            }
                        </p>
                    </div>
                )}

                {/* Footer Info */}
                <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-green-800 mb-4">
                            🌿 Why Choose Ranveer Rose Nursery?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Flower className="w-8 h-8 text-green-600" />
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">Premium Quality</h4>
                                <p className="text-gray-600 text-sm">Hand-selected healthy plants</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TreePine className="w-8 h-8 text-green-600" />
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">Expert Care</h4>
                                <p className="text-gray-600 text-sm">Professional gardening advice</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Apple className="w-8 h-8 text-green-600" />
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">Best Varieties</h4>
                                <p className="text-gray-600 text-sm">Wide selection of plant varieties</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NurseryPlantsPage;