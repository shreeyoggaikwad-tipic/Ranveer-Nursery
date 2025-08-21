import React, { useState, useEffect } from 'react'
import axios from 'axios';

function HomeContact() {

  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        // Fetch user (assuming 1st user = admin)
        const userRes = await axios.get("http://127.0.0.1:8000/api/users/1");
        const user = userRes.data.data;

        setContact(user.number);
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };

    fetchContact();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
          Ready to Build Your Dream Home?
        </h3>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          Contact us today for a free consultation and let's discuss your vision
        </p>
        {contact && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:+91${contact}`}>
              <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                Call : +91 {contact}
              </button>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export default HomeContact
