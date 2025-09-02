import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('[id^="section-"]');
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const values = [
    { title: "Quality First", description: "Every plant undergoes rigorous health checks before reaching our customers.", icon: "✨", color: "from-green-400 to-green-500" },
    { title: "Sustainability", description: "We practice eco-friendly growing methods and use biodegradable packaging.", icon: "🌍", color: "from-blue-400 to-blue-500" },
    { title: "Expert Care", description: "Our certified horticulturists provide ongoing support and plant care guidance.", icon: "🧠", color: "from-purple-400 to-purple-500" },
    { title: "Customer Joy", description: "We believe in creating lasting relationships and bringing joy through plants.", icon: "❤️", color: "from-pink-400 to-pink-500" }
  ];

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar/>

      {/* Hero Section */}
      <section className="pt-10 pb-12 bg-green-50 relative overflow-hidden">
        {/* Floating accents */}
        <div className="absolute top-10 left-10 text-3xl opacity-10 animate-float">🍃</div>
        <div className="absolute bottom-10 right-10 text-3xl opacity-10 animate-float delay-500">🌱</div>

        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-green-600">Ranveer Rose nursery</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For over 15 years, we've been nurturing dreams and growing communities through our passion for plants. 
            From humble beginnings to becoming your trusted green partner, our story is rooted in love for nature.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section id="section-story" className={`py-10 bg-white transition-all duration-1000 ${isVisible['section-story'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our <span className="text-green-600">Story</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Ranveer Rose Nursery began in 2010 when our founder, Sarah Johnson, transformed her backyard greenhouse into a community hub for plant lovers. 
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Today, we're proud to offer everything from rare exotic plants to complete landscape transformations.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you're a seasoned gardener or just starting your green journey, we're here to guide you every step of the way.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-8 shadow-lg text-center">
              <div className="text-6xl mb-4">🏡</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">From Garden to Community</h3>
              <p className="text-gray-600">What started as a backyard passion project has grown into a thriving nursery serving thousands of plant enthusiasts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="section-values" className={`py-10 px-10 bg-green-50 transition-all duration-1000 ${isVisible['section-values'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our <span className="text-green-600">Values</span>
          </h2>
          <div className="w-20 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-2">
              <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center text-2xl text-white mb-4`}>
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-green-100 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Your Green Journey?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of satisfied customers who have transformed their spaces with Ranveer Rose Nursery.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all">
              Visit Our Nursery
            </Link>
            <Link to="/plants" className="border border-green-600 text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition-all">
              Browse Plants Online
            </Link>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default AboutPage;
