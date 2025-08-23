import React, { useState, useEffect } from 'react';
import TestimonialCard from '../../components/TestimonialCard';
import axios from 'axios';
import AdminNav from '../../components/AdminNav';
import host from '../../utils/host'


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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <AdminNav />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Client <span className="text-blue-600">Testimonials</span>
            </h1>
            {testimonials.length > 0 && (
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                <span className="text-yellow-400 mr-2">⭐</span>
                <span className="font-semibold">{averageRating}/5 Average Rating</span>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* Testimonials Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
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
