import React from 'react'

function TestimonialCard({ testimonial, index }) {
    return (
        <div
            key={testimonial.id}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: `${index * 0.2}s` }}
        >
            <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.feedback}"</p>
            <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                </div>
                <div>
                    <h5 className="font-bold text-gray-900">{testimonial.name}</h5>
                    <p className="text-gray-600 text-sm">Satisfied Client</p>
                </div>
            </div>
        </div>
    )
}

export default TestimonialCard
