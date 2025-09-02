import React from "react";

const PlantCard = ({
  image,
  name,
  description,
  category = "Plants",
  className = "",
  onClick
}) => {
  return (
    <div 
      className={`bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-green-100 overflow-hidden ${className}`}
      onClick={onClick}
    >
      {/* Category Badge - Positioned over image */}
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-white/90 backdrop-blur-sm text-green-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
          {category}
        </span>
      </div>

      {/* Plant Image - Full coverage */}
      <div className="relative w-full h-48">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
          </div>
        )}
      </div>

      {/* Plant Info */}
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-green-800 mb-3">
          {name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PlantCard;