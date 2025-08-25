import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import ServiceCard from '../../components/ServiceCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from '../../components/AdminNav';
import host from '../../utils/host'


function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all API data in parallel
    Promise.all([
      axios.get(`${host}/api/services`)
    ])
      .then((responses) => {
        setServices(responses[0].data.data);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteService = (deletedId) => {
    setServices(prev => prev.filter(service => service.id !== deletedId));
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

      <div className="bg-white py-10 flex flex-col items-center animate-fade-in">
        <h1 className="text-6xl font-bold text-center">
          Manage <span className="bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text text-transparent">Services</span>
        </h1>
        {/* Add Service Button */}
        <Link to="/admin/addService"
          className="mt-10 flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold shadow hover:bg-orange-600 transition"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </Link>
      </div>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} onDelete={handleDeleteService} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
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

export default ManageServices
