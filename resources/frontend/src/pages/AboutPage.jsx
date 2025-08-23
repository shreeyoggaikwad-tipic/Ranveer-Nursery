import React, { useState, useEffect } from 'react';
import { Award, DollarSign, Settings, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import AboutImg from '../assets/aboutpage.jfif';
import "../utils/host"

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeTab, setActiveTab] = useState('vision');
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {

      try {
        // Fetch user (assuming 1st user = admin)
        const userRes = await axios.get(`${host}/api/users/1`);
        const user = userRes.data.data;

        // Fetch projects
        const projectRes = await axios.get(`${host}/api/projects`);
        const completedProjects = projectRes.data.data.filter(
          (p) => p.status === "completed"
        ).length;

        setUser([
          { number: completedProjects + "+", label: "Projects Completed", icon: "🏗️" },
          { number: user.happy_clients + "+", label: "Happy Clients", icon: "🏡" },
          { number: user.years_of_experience + "+", label: "Years of Experience", icon: "📅" },
        ]);


      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.animate-section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);



  const features = [
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Uncompromising Quality",
      description: "We deliver exceptional construction quality using premium materials, advanced engineering techniques, and rigorous quality control processes at every project phase.",
      highlights: ["Premium grade materials", "Advanced engineering techniques", "Rigorous quality control", "Industry certifications"]
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: "Affordable Excellence",
      description: "Our competitive pricing structure ensures you get maximum value without compromising on quality. We optimize costs through efficient project management and smart resource allocation.",
      highlights: ["Competitive pricing", "No hidden costs", "Flexible payment plans", "Cost optimization strategies"]
    },
    {
      icon: <Settings className="w-8 h-8 text-orange-600" />,
      title: "Complete Customization",
      description: "Every project is unique, and so are our solutions. We tailor our services to match your specific requirements, design preferences, and budget constraints.",
      highlights: ["Personalized designs", "Flexible solutions", "Client-focused approach", "Adaptive project management"]
    }
  ];


  const values = [
    {
      icon: "💎",
      title: "Quality First",
      description: "We never compromise on quality. Every project reflects our commitment to excellence and attention to detail."
    },
    {
      icon: "🤝",
      title: "Trust & Transparency",
      description: "Building relationships through honest communication, fair pricing, and transparent project management."
    },
    {
      icon: "🎯",
      title: "Customer-Centric",
      description: "Your vision is our mission. We listen, understand, and deliver exactly what you dream of."
    },
    {
      icon: "⚡",
      title: "Innovation",
      description: "Embracing modern construction techniques and sustainable practices for future-ready homes."
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20  overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Building Dreams,{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Creating Homes
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Since 2019, Rachnakar Enterprises has been transforming the landscape of Pune with quality construction,
              innovative designs, and unwavering commitment to our clients' dreams.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section id="story" className="py-20 animate-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible.story ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Story</h3>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Rachnakar Enterprises was born from a simple yet powerful vision: to create homes that families
                  cherish for generations. Founded in 2019 by <strong>Rajesh Patil</strong>, a seasoned civil engineer
                  with over 15 years of experience, our company emerged from a passion for quality construction and
                  customer satisfaction.
                </p>
                <p>
                  Starting with a small team of dedicated professionals, we faced the challenge of establishing
                  trust in a competitive market. Our approach was different - we focused on building relationships,
                  not just buildings. Every project became a testament to our commitment to excellence.
                </p>
                <p>
                  Today, we stand proud as one of Pune's trusted construction partners, having delivered over 50
                  successful projects. Our journey from a startup to a recognized name in the industry reflects
                  our unwavering dedication to quality, innovation, and customer satisfaction.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src={AboutImg}
                  alt="Construction Team at Work"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl opacity-20 animate-float"></div>
            </div>
          </div>
        </div>
      </section>

      <section className='px-10'>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Rachnakar Enterprises?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            When you choose us, you're partnering with a team committed to excellence,
            innovation, and your complete satisfaction. Here's what sets us apart in the civil engineering industry.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>

              <div className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section id="vision" className="py-20 bg-white/50 animate-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Drives Us</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our vision, mission, and values form the foundation of everything we do
            </p>
          </div>

          {/* Tab Navigation */}
          <div className={`flex justify-center mb-12 transition-all duration-1000 ${isVisible.vision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="bg-white rounded-full p-2 shadow-lg">
              {['vision', 'mission', 'values'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === tab
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className={`max-w-4xl mx-auto transition-all duration-500 ${isVisible.vision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            {activeTab === 'vision' && (
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-white">🎯</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h4>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To be Pune's most trusted construction partner, known for creating exceptional living spaces
                  that enhance the quality of life for families across Maharashtra. We envision a future where
                  every home we build becomes a cornerstone of happiness and prosperity for generations.
                </p>
              </div>
            )}

            {activeTab === 'mission' && (
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-white">🚀</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h4>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To deliver superior construction services through innovative design, quality craftsmanship,
                  and exceptional customer service. We are committed to building sustainable, affordable,
                  and beautiful homes while maintaining the highest standards of integrity and professionalism.
                </p>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-2xl">{value.icon}</span>
                    </div>
                    <h5 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h5>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section id="team" className="py-20 animate-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate professionals behind every successful project
            </p>
          </div>

          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${
            isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-blue-600 font-semibold mb-1">{member.role}</p>
                  <p className="text-gray-500 text-sm mb-3">{member.experience} • {member.specialization}</p>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Achievements Section */}
      <section id="achievements" className="py-20 animate-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Achievements</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence
            </p>
          </div>

          <div className={`grid grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible.achievements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            {user.map((number, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{number.icon}</div>
                <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">{number.number}</div>
                <div className="text-gray-600 font-medium">{number.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom Styles */}
      <style >{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;