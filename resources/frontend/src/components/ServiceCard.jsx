import React from 'react'

function ServiceCard({service, index}) {
    return (
        <div
            key={service.id}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500 group"
            style={{ animationDelay: `${index * 0.15}s` }}
        >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">🏗️</span>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h4>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
        </div>
    )
}

export default ServiceCard
