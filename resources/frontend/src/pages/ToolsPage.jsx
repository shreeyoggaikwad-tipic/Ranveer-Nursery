import React, { useState } from 'react';
import { Wrench, Scissors, ShieldCheck, Droplets, Search, Grid, List, Package, Shovel, Sprout } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PlantCard from '../components/PlantCard';

const NurseryToolsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Sample tools and pesticides data
  const tools = [
    {
      id: 1,
      name: "Professional Pruning Shears",
      category: "Garden Tools",
      image: null,
      description: "High-quality steel pruning shears for precise cuts"
    },
    {
      id: 2,
      name: "Organic Neem Oil",
      category: "Pesticides",
      image: null,
      description: "Natural pesticide for plant protection"
    },
    {
      id: 3,
      name: "Garden Watering Can",
      category: "Watering Tools",
      image: null,
      description: "5-liter capacity with fine rose attachment"
    },
    {
      id: 4,
      name: "Premium Fertilizer Mix",
      category: "Fertilizers",
      image: null,
      description: "Balanced NPK fertilizer for all plants"
    },
    {
      id: 5,
      name: "Hand Cultivator Set",
      category: "Garden Tools",
      image: null,
      description: "3-piece hand tool set for soil preparation"
    },
    {
      id: 6,
      name: "Fungicide Spray",
      category: "Pesticides",
      image: null,
      description: "Effective treatment for plant diseases"
    },
    {
      id: 7,
      name: "Drip Irrigation Kit",
      category: "Watering Tools",
      image: null,
      description: "Complete drip irrigation system for gardens"
    },
    {
      id: 8,
      name: "Vermicompost",
      category: "Fertilizers",
      image: null,
      description: "Organic compost rich in nutrients"
    },
    {
      id: 9,
      name: "Garden Spade",
      category: "Garden Tools",
      image: null,
      description: "Heavy-duty spade for digging and planting"
    },
    {
      id: 10,
      name: "Insecticide Powder",
      category: "Pesticides",
      image: null,
      description: "Effective powder for controlling garden pests"
    },
    {
      id: 11,
      name: "Garden Hose 25ft",
      category: "Watering Tools",
      image: null,
      description: "Flexible garden hose with spray nozzle"
    },
    {
      id: 12,
      name: "Bone Meal Fertilizer",
      category: "Fertilizers",
      image: null,
      description: "Natural phosphorus-rich fertilizer"
    }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getToolIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'garden tools':
        return (
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <Wrench className="w-8 h-8 text-white" />
          </div>
        );
      case 'pesticides':
        return (
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
        );
      case 'watering tools':
        return (
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
            <Droplets className="w-8 h-8 text-white" />
          </div>
        );
      case 'fertilizers':
        return (
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
            <Sprout className="w-8 h-8 text-white" />
          </div>
        );
      default:
        return (
          <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
        );
    }
  };

  const getCategoryColor = (category) => {
    switch(category.toLowerCase()) {
      case 'garden tools':
        return 'bg-blue-100 text-blue-700';
      case 'pesticides':
        return 'bg-red-100 text-red-700';
      case 'watering tools':
        return 'bg-cyan-100 text-cyan-700';
      case 'fertilizers':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
      <Navbar/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and View Controls */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tools and supplies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Garden Tools & Supplies
          </h2>
          <p className="text-gray-600">
            Showing {filteredTools.length} of {tools.length} items
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Tools Grid/List */}
        {filteredTools.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredTools.map((plant) => (
              <PlantCard key={plant.id} image={plant.image} name={plant.name} description={plant.description} category={plant.category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No tools found</h3>
            <p className="text-gray-500">
              {searchTerm 
                ? `No tools match your search "${searchTerm}"`
                : "No tools available at the moment"
              }
            </p>
          </div>
        )}

        {/* Categories Overview Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              🌿 Our Tool Categories
            </h3>
            <p className="text-gray-600">Complete range of gardening essentials</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Garden Tools</h4>
              <p className="text-gray-600 text-sm">Professional quality hand tools</p>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Pesticides</h4>
              <p className="text-gray-600 text-sm">Safe & effective plant protection</p>
            </div>
            
            <div className="text-center p-4 bg-cyan-50 rounded-xl">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-cyan-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Watering</h4>
              <p className="text-gray-600 text-sm">Irrigation & watering solutions</p>
            </div>
            
            <div className="text-center p-4 bg-amber-50 rounded-xl">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-8 h-8 text-amber-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Fertilizers</h4>
              <p className="text-gray-600 text-sm">Nutrients for healthy growth</p>
            </div>
          </div>
        </div>

        {/* Service Information */}
        <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              🌟 Professional Garden Services
            </h3>
            <p className="text-lg text-green-100 mb-6">
              Not sure which tools you need? Our experts are here to help!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-semibold mb-2">🔧 Tool Consultation</h4>
                <p className="text-green-100 text-sm">Get personalized tool recommendations</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">🚚 Home Delivery</h4>
                <p className="text-green-100 text-sm">Free delivery on orders above ₹1000</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">🛡️ Quality Guarantee</h4>
                <p className="text-green-100 text-sm">All tools come with warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default NurseryToolsPage;