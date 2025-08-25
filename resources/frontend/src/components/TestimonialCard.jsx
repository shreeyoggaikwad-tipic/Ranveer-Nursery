import React from 'react'
import UserImg from '../assets/user.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import host from '../utils/host';

function TestimonialCard({ testimonial, index, onDelete}) {
    const token = localStorage.getItem("token");
    const isAdmin = !!token; // if token exists, assume admin is logged in]
    
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this testimonial?");
        if (!confirmed) return;

        try {
            await axios.delete(`${host}/api/testimonials/${testimonial.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("✅ Testimonial deleted successfully!");
            if (onDelete) onDelete(testimonial.id); // notify parent to remove from state
        } catch (error) {
            console.error("❌ Error deleting testimonial:", error.response || error);
            alert("Failed to delete testimonial. Check console for details.");
        }
    };

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
                {testimonial.photo ? (
                    <img
                        src={`${host}/storage/${testimonial.photo}`}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                ) : (
                    <img
                        src={UserImg}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                )}
                <div>
                    <h5 className="font-bold text-gray-900">{testimonial.name}</h5>
                    <p className="text-gray-600 text-sm">Satisfied Client</p>
                    {isAdmin && (
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate(`/admin/editTestimonial/${testimonial.id}`)}
                                className="text-green-600 font-semibold hover:text-green-800 transition-colors"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="text-red-600 font-semibold hover:text-red-800 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TestimonialCard
