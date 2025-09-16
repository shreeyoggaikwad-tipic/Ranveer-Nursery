import React from 'react';
import plantss from "../utils/Plantss";

const PlantGallery = () => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-green-800 mb-4">
                        Plant Gallery
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Explore our beautiful collection of plants
                    </p>
                </div>

                {/* Plant Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
                    {plantss.map((img, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={img}
                                    alt={`Plant ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Hover Effect Border */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-400 rounded-2xl transition-all duration-300" />
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default PlantGallery;