import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PlantCard from "../components/PlantCard";
import Rose from "../assets/Rose.jpg"
import MangoSampling from "../assets/Mango.webp"
import MoneyPlant from "../assets/MoneyPlant.jpg"
import SunflowerSeeds from "../assets/SunflowerSeeds.jpg"
import { Link } from "react-router-dom";
import host from "../utils/host"
import axios from 'axios';
import Plants from "../utils/Plants";


const NurseryHomepage = () => {

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchStats = async () => {
      try {

        // Fetch user (assuming 1st user = admin)
        const userRes = await axios.get(`${host}/api/users/1`);
        const user = userRes.data.data;

        setUser(user);
        setHappyCustomers(user?.happy_clients)
        setYearsExperience(user?.years_of_experience)
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }
    fetchStats();
  }, []);


  // Animated numbers
  const [plantVarieties, setPlantVarieties] = useState(500);
  const [happyCustomers, setHappyCustomers] = useState();
  const [yearsExperience, setYearsExperience] = useState();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const animateValue = (setter, start, target, duration = 2000) => {
      let current = start;
      const increment = (target - start) / (duration / 16);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setter(Math.floor(current));
      }, 16);
    };

    // Handle scroll for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="flex items-center bg-green-50 px-6 pt-4">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center lg:gap-12 xl:gap-16">
            {/* Left Side Content */}
            <div className="flex-1 max-w-xl animate-fade-in-left items-center justify-center">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Crafting{" "}
                <span className="text-green-600 relative">
                  Botanical Dreams
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-green-200" viewBox="0 0 100 10">
                    <path d="M0,8 Q25,2 50,8 T100,8" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>{" "}
                Into Reality
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Transform your spaces with our curated collection of premium plants,
                innovative landscaping solutions, and personalized garden design services
                that bring nature's beauty to your doorstep.
              </p>
            </div>

            {/* Right Side Image */}
            <div className="flex-1 relative animate-fade-in-right">
              <div className=" ">
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-6 w-32 h-32 bg-green-200/30 rounded-full animate-pulse"></div>
                {/* <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-green-300/40 rounded-full animate-pulse delay-1000"></div> */}

                {/* Main image container */}
                <div className="relative ">
                  <div className="flex flex-col items-center justify-center py-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow">
                        🌺 Exotic Flowers
                      </span>
                      <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow">
                        🏡 Home Gardens
                      </span>
                      <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow">
                        🌿 Landscaping
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                      <Link to="/contact"
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg"
                      >
                        Visit our Nusery
                      </Link>
                      <Link to="/plants"
                        onClick={() => scrollToSection('plants')}
                        className="flex justify-center items-center border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105"
                      >
                        See Plants
                      </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 text-center">
                      <div className="group">
                        <p className="text-3xl font-bold text-green-700 group-hover:scale-110 transition-transform">
                          {plantVarieties}+
                        </p>
                        <p className="text-sm text-gray-600">Plant Varieties</p>
                      </div>
                      <div className="group">
                        <p className="text-3xl font-bold text-green-700 group-hover:scale-110 transition-transform">
                          {happyCustomers}+
                        </p>
                        <p className="text-sm text-gray-600">Happy Customers</p>
                      </div>
                      <div className="group">
                        <p className="text-3xl font-bold text-green-700 group-hover:scale-110 transition-transform">
                          {yearsExperience}+
                        </p>
                        <p className="text-sm text-gray-600">Years Experience</p>
                      </div>
                    </div>

                    {/* Floating particles */}
                    <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-300 rounded-full animate-float"></div>
                    <div className="absolute top-20 right-16 w-1.5 h-1.5 bg-green-300 rounded-full animate-float delay-700"></div>
                    <div className="absolute bottom-16 left-20 w-1 h-1 bg-pink-300 rounded-full animate-float delay-1400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating leaves animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-10 text-2xl animate-float-leaf">🍃</div>
          <div className="absolute top-1/3 right-20 text-xl animate-float-leaf delay-2000">🌿</div>
          <div className="absolute bottom-1/4 left-1/4 text-lg animate-float-leaf delay-4000">🍂</div>
          <div className="absolute top-1/2 right-10 text-2xl animate-float-leaf delay-6000">🌱</div>
        </div>
      </section>

      {/* Features Section */}
      <section id="plants" className="pb-10 pt-6 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-green-600">Ranveer Rose Nursery?</span>
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🌱",
                title: "Premium Quality Plants",
                description: "Hand-selected, healthy plants sourced from the finest growers. Each plant comes with our quality guarantee and care instructions."
              },
              {
                icon: "👨‍🌾",
                title: "Expert Guidance",
                description: "Our certified horticulturists provide personalized advice to help your plants thrive in any environment."
              },
              {
                icon: "🚚",
                title: "Fast Delivery",
                description: "Same-day delivery available for local orders. We ensure your plants arrive fresh and ready to flourish."
              },
              {
                icon: "🛡️",
                title: "Plant Protection",
                description: "Comprehensive care support and plant health monitoring to keep your green friends happy and healthy."
              },
              {
                icon: "🌿",
                title: "Eco-Friendly",
                description: "Sustainable growing practices and biodegradable packaging. Growing green for a greener planet."
              },
              {
                icon: "💚",
                title: "Best Value",
                description: "Competitive prices with loyalty rewards, seasonal discounts, and bundle deals for plant enthusiasts."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-green-50/50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-green-100/50"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-4 group-hover:text-green-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-10 bg-green-50 ">
        {/* Decorative floating elements */}
        <div className="absolute top-10 left-10 text-2xl animate-float opacity-20">🍃</div>
        <div className="absolute bottom-16 right-16 text-xl animate-float delay-1000 opacity-20">🌱</div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-green-600">Plant Collection</span>
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Explore a curated selection of lush plants to elevate your home, garden, or workspace.
            </p>
          </div>

          {/* Show only 4 random plants */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Plants
              .sort(() => 0.5 - Math.random()) // shuffle
              .slice(0, 4) // pick 4
              .map((plant) => (
                <PlantCard
                  key={plant.id}
                  image={plant.image}
                  name={plant.name}
                  description={plant.description}
                  category={plant.category}
                />
              ))}
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="py-6 bg-gradient-to-br from-green-100 to-green-200 text-gray-800 relative overflow-hidden">
        {/* Floating accents */}
        <div className="absolute top-1/4 left-10 text-xl animate-float opacity-10">🍂</div>
        <div className="absolute bottom-10 right-10 text-lg animate-float delay-700 opacity-10">🌿</div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">Let's Grow Together</h2>
          <div className="w-16 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg mb-10 opacity-80 max-w-xl mx-auto leading-relaxed">
            Ready to transform your space into a green paradise? Get in touch with our plant experts today!
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: "📍",
                title: "Visit Us",
                content: "Ranveer Rose Nursery, A/p. Koregaon Mul, Pune Solapur Road, Near Uruli Kanchan, tal. Haveli, Pune-412202 NH9"
              },
              {
                icon: "📞",
                title: "Call Us",
                content: "+91 97641 23636\nMon-Sat 8AM-6PM"
              },
              {
                icon: "✉️",
                title: "Email Us",
                content: "ranveerrosenursery8644@gmail.com\nQuick response guaranteed"
              }
            ].map((contact, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl hover:bg-green-50 transition-all duration-300 group shadow-md hover:shadow-lg border border-green-100"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transform transition-transform">
                  {contact.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{contact.title}</h3>
                <p className="whitespace-pre-line text-sm opacity-80">{contact.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      <Footer />

      <style>{`
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-10px); }
                    60% { transform: translateY(-5px); }
                }
                
                @keyframes fade-in-left {
                    from { opacity: 0; transform: translateX(-50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes fade-in-right {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes float-leaf {
                    0% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
                    50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
                    100% { transform: translateY(0px) rotate(360deg); opacity: 0.3; }
                }
                
                @keyframes sway {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(5deg); }
                }
                
                @keyframes bloom {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                .animate-fade-in-left { animation: fade-in-left 1s ease-out; }
                .animate-fade-in-right { animation: fade-in-right 1s ease-out 0.3s both; }
                .animate-float { animation: float 3s ease-in-out infinite; }
                .animate-float-leaf { animation: float-leaf 8s ease-in-out infinite; }
                .animate-sway { animation: sway 4s ease-in-out infinite; }
                .animate-bloom { animation: bloom 2s ease-in-out infinite; }
            `}</style>
    </div>
  );
};

export default NurseryHomepage;