import React, { useState, useEffect } from 'react';
import TestimonialCard from '../../components/TestimonialCard';
import axios from 'axios';
import AdminNav from '../../components/AdminNav';
import host from '../../utils/host'
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';


function ManageTestimonials() {

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const averageRating = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : 0;

  useEffect(() => {
    // Fetch all API data in parallel
    Promise.all([
      axios.get(`${host}/api/testimonials`)
    ])
      .then((responses) => {
        setTestimonials(responses[0].data.data);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteTestimonial = (deletedId) => {
    setTestimonials(prev => prev.filter(testimonial => testimonial.id !== deletedId));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <AdminNav />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in flex flex-col justify-center items-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Client <span className="bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text text-transparent">Testimonials</span>
            </h1>
            {testimonials.length > 0 && (
              <div className="inline-flex items-center bg-blue-100 text-orange-600 px-4 py-2 rounded-full">
                <span className="text-yellow-400 mr-2">⭐</span>
                <span className="font-semibold">{averageRating}/5 Average Rating</span>
              </div>
            )}
            {/* Add Testimonial Button */}
            <Link to="/admin/addTestimonial"
              className="mt-10 flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold shadow hover:bg-orange-600 transition"
            >
              <Plus className="w-5 h-5" />
              Add Testimonial
            </Link>
          </div>
        </div>
      </section>


      {/* Testimonials Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} onDelete={handleDeleteTestimonial} />
            ))}
          </div>
        </div>
      </section>

      <style >{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out;
                }
            `}</style>
    </div>
  );
}

export default ManageTestimonials
