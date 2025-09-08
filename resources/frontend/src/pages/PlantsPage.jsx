import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Filter, Flower, Apple, Sparkles, TreePine, Search, Home, Sun, Sprout, Trees } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PlantCard from '../components/PlantCard';
import Plants from '../utils/Plants';

const NurseryPlantsPage = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const location = useLocation();

    useEffect(() => {
        if (location.state?.category) {
            switch (location.state.category) {
                case 'Indoor Plants':
                    setActiveFilter('indoor');
                    break;
                case 'Outdoor Plants':
                    setActiveFilter('outdoor');
                    break;
                case 'Fruit Plants':
                    setActiveFilter('fruit');
                    break;
                case 'Forest Plants':
                    setActiveFilter('forest');
                    break;
                case 'Micro Plants':
                    setActiveFilter('micro');
                    break;
                case 'Landscaping Plants':
                    setActiveFilter('landscape');
                    break;
                case 'Flowering Plants':
                    setActiveFilter('flowering');
                    break;
                default:
                    setActiveFilter('all');
            }
        }
    }, [location.state]);

    const filterOptions = [
        { id: 'all', label: 'All Plants', icon: Filter, color: 'green' },
        { id: 'indoor', label: 'Indoor Plants', icon: Home, color: 'green' },
        { id: 'outdoor', label: 'Outdoor Plants', icon: Sun, color: 'green' },
        { id: 'fruit', label: 'Fruit Plants', icon: Apple, color: 'green' },
        { id: 'forest', label: 'Forest Plants', icon: TreePine, color: 'green' },
        { id: 'micro', label: 'Micro Plants', icon: Sprout, color: 'green' },
        { id: 'landscape', label: 'Landscaping Plants', icon: Trees, color: 'green' },
        { id: 'flowering', label: 'Flowering Plants', icon: Flower, color: 'green' },
    ];

    // Shuffle function
    const shuffleArray = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    };

    const filteredPlants = React.useMemo(() => {
        const categoryMap = {
            indoor: 'Indoor Plant',
            outdoor: 'Outdoor Plant',
            fruit: 'Fruit Plant',
            forest: 'Forest Plant',
            micro: 'Micro Plant',
            landscape: 'Landscaping Plant',
            flowering: 'Flowering Plant'
        };

        const matchesFilter = (plant) =>
            activeFilter === 'all' || plant.category === categoryMap[activeFilter];

        const matchesSearch = (plant) =>
            plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plant.description.toLowerCase().includes(searchTerm.toLowerCase());

        let results = Plants.filter((plant) => matchesFilter(plant) && matchesSearch(plant));

        // Shuffle results if "all" filter is active
        if (activeFilter === 'all') {
            results = shuffleArray(results);
        }

        return results;
    }, [activeFilter, searchTerm]);

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
                <div className="mb-4">
                    <div className="flex flex-wrap gap-1 p-1 bg-white rounded-lg shadow border border-gray-100">
                        {filterOptions.map((filter) => {
                            const IconComponent = filter.icon;
                            const isActive = activeFilter === filter.id;

                            return (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 min-w-max
            ${isActive
                                            ? `bg-${filter.color}-500 text-white shadow`
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
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
                        Showing {filteredPlants.length} of {Plants.length} plants
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