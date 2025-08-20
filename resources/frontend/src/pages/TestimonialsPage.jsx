import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestimonialCard from '../components/TestimonialCard';


// Main Testimonials Page Component
function TestimonialsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      feedback: "Rachnakar Enterprises transformed our dream into reality. The attention to detail and quality of construction exceeded our expectations. Our custom home is everything we imagined and more!",
      rating: 5,
      location: "Pune, Maharashtra",
      category: "custom-home"
    },
    {
      id: 2,
      name: "Rajesh Patel",
      feedback: "Outstanding work on our apartment renovation! The team was professional, punctual, and delivered exactly what they promised. Highly recommend their services.",
      rating: 5,
      location: "Pune, Maharashtra",
      category: "renovation"
    },
    {
      id: 3,
      name: "Anita Desai",
      feedback: "The commercial building project was completed on time and within budget. Their project management skills are exceptional. Great team to work with!",
      rating: 5,
      location: "Pune, Maharashtra",
      category: "commercial"
    },
    {
      id: 4,
      name: "Suresh Kumar",
      feedback: "We're thrilled with our new apartment complex. The modern design, quality materials, and beautiful amenities make it a perfect place to live.",
      rating: 5,
      location: "Pune, Maharashtra",
      category: "apartment"
    },
    {
      id: 5,
      name: "Meera Singh",
      feedback: "Their interior design service completely transformed our space. The team understood our vision perfectly and created a stunning, functional home.",
      rating: 5,
      location: "Pune, Maharashtra",
      category: "interior-design"
    },
    {
      id: 6,
      name: "Amit Joshi",
      feedback: "Exceptional craftsmanship and excellent customer service. The entire construction process was smooth and stress-free. Thank you for building our dream home!",
      rating: 5,
      location: "Pune, Maharashtra",
      category: "custom-home"
    },
    {
      id: 7,
      name: "Kavita Rao",
      feedback: "Professional, reliable, and skilled team. Our office renovation was completed perfectly and our employees love the new workspace. Highly recommended!",
      rating: 5,
      location: "Pune, Maharashtra",
      category: "commercial"
    },
    {
      id: 8,
      name: "Deepak Mehta",
      feedback: "From planning to execution, everything was handled with utmost care. The quality of work is outstanding and the team is very responsive to feedback.",
      rating: 5,
      location: "Pune, Maharashtra",
      category: "renovation"
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Client <span className="text-blue-600">Testimonials</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Don't just take our word for it. Hear what our satisfied clients have to say about their experience working with Rachnakar Enterprises.
            </p>
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              <span className="text-yellow-400 mr-2">⭐</span>
              <span className="font-semibold">4.9/5 Average Rating</span>
            </div>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 mx-4 sm:mx-6 lg:mx-8 rounded-3xl my-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
            Ready to Join Our Happy Clients?
          </h2>
          <p className="text-xl text-blue-100 mb-8 animate-fade-in">
            Experience the same quality and satisfaction that our clients rave about.
            Let's start building your dream project today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Book Free Consultation
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
              View Our Projects
            </button>
          </div>
        </div>
      </section>

      <Footer />

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

export default TestimonialsPage;