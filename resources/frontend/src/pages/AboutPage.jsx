import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Nur1 from "../assets/Nur1.jfif"
import Nur2 from "../assets/Nur2.jpg"
import Nur3 from "../assets/Nur3.jpg"
import Nur4 from "../assets/Nur4.jpg"
import Founder from "../assets/ChaitaliShitole.jpg"
import CEO from "../assets/MangeshShitole.jpg"

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

  const whyChooseUs = [
    { title: "11+ of Years Experience", description: "Over a decade of expertise in nurturing plants and serving customers.", icon: "📅" },
    { title: "25 Acre Facility", description: "Spacious nursery with polyhouses and advanced growing infrastructure.", icon: "🏞️" },
    { title: "Expert Guidance", description: "Professional horticulturists provide personalized plant care advice.", icon: "👨‍🌾" },
    { title: "Quality Assurance", description: "Every plant is carefully inspected before delivery to ensure health.", icon: "🔍" }
  ];

  const customers = [
    { name: "Bharat Biotech", logo: "https://tse4.mm.bing.net/th/id/OIP.EmKVzSbCLrH_M1BXOCftbAHaEF?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Jindal Saw Ltd.", logo: "https://tse1.mm.bing.net/th/id/OIP.FYAugToAYsDceosX5e6URQHaDy?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Dalmia Bharat", logo: "https://attendance.jindalsaw.com/Content/images/JindalLogo.jpg" },
    { name: "Singhania Buildcon", logo: "https://tse3.mm.bing.net/th/id/OIP.pRo39n415dm_gmDPcqsHgQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Mythri Infra", logo: "https://mipec.in/wp-content/uploads/2022/06/MYTHRRI-INFRA-PROJECTS-2024-LOGO-1.png" },
  ];

  const nurseryImages = [
    { src: Nur1, alt: "Polyhouse facility", caption: "Modern polyhouse infrastructure" },
    { src: Nur2, alt: "Plant varieties", caption: "Wide variety of healthy plants" },
    { src: Nur3, alt: "Growing areas", caption: "Spacious growing areas" },
    { src: Nur4, alt: "Expert team", caption: "Our dedicated team at work" }
  ];

  // Founders data - Update with actual images and descriptions
  const founders = [
    {
      name: "Mrs. Chaitali Mangesh Shitole",
      role: "Founder",
      image: Founder, // Placeholder - replace with actual image
      description: "With 11+ years in horticulture, Mrs. Chaitali Shitole founded Ranveer Rose Nursery in 2014, turning her passion for plants into a trusted name in Pune’s gardening community."
    },
    {
      name: "Mr. Mangesh Shitole",
      role: "CEO",
      image: CEO, // Placeholder - replace with actual image
      description: "As CEO, Mr. Mangesh Shitole drives growth with innovative strategies while upholding the nursery’s core values of quality and sustainability."
    }
  ];


  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-10 pb-12 bg-green-50 relative overflow-hidden">
        {/* Floating accents */}
        <div className="absolute top-10 left-10 text-3xl opacity-10 animate-float">🍃</div>
        <div className="absolute bottom-10 right-10 text-3xl opacity-10 animate-float delay-500">🌱</div>

        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-green-600">Ranveer Rose Nursery</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For over 11+ of years, we've been nurturing dreams and growing communities through our passion for plants.
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
              Founded in 2014 by Mrs. Chaitali Mangesh Shitole, Ranveer Rose Nursery has been dedicated to nurturing greenery and inspiring communities through the beauty of plants. From our humble beginnings, we have grown into a trusted partner for plant enthusiasts and landscapers alike.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Spread across 25 acres of lush land, our nursery is equipped with polyhouses, shade nets, and advanced production houses, enabling us to cultivate a wide variety of high-quality plants in a sustainable and controlled environment.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Rooted in a deep love for nature, our mission goes beyond growing plants we strive to foster lasting relationships and create greener, healthier spaces for generations to come.
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

      {/* Founders Section */}
      <section id="section-founders" className={`py-10 bg-gray-50 transition-all duration-1000 ${isVisible['section-founders'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Meet Our <span className="text-green-600">Leadership</span>
            </h2>
            <div className="w-20 h-1 bg-green-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The visionary minds behind Ranveer Rose Nursery, dedicated to bringing nature closer to your life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            {founders.map((founder, index) => (
              <div key={index} className="pt-4 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-80 object-contain"
                  />

                </div>


                <div className="p-4">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{founder.name}</h3>
                    <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                      {founder.role}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {founder.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="section-why-choose" className={`py-10 bg-white transition-all duration-1000 ${isVisible['section-why-choose'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why <span className="text-green-600">Choose Us?</span>
            </h2>
            <div className="w-20 h-1 bg-green-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
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

      {/* Our Clients Section */}
      <section id="section-clients" className={`py-10 bg-white transition-all duration-1000 ${isVisible['section-clients'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our <span className="text-green-600">Clients</span>
            </h2>
            <div className="w-20 h-1 bg-green-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">Trusted by businesses and communities across Pune</p>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            {customers.map((customer, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center w-48 h-28 border border-[#014421]/20"
              >
                <img
                  src={customer.logo}
                  alt={customer.name}
                  className="max-h-16 object-contain"
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Nursery Pics Section */}
      <section id="section-nursery-pics" className={`py-10 bg-gray-50 transition-all duration-1000 ${isVisible['section-nursery-pics'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Nursery <span className="text-green-600">Gallery</span>
            </h2>
            <div className="w-20 h-1 bg-green-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">Take a glimpse into our 25-acre facility</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nurseryImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-medium">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

      <Footer />
    </div>
  );
};

export default AboutPage;