import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from '../../components/AdminNav';
import { Link } from 'react-router-dom';
import host from '../../utils/host'


const AdminDashboard = () => {
  

  const [counts, setCounts] = useState({
    projects: 0,
    services: 0,
    testimonials: 0,
    inquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    Promise.all([
      axios.get(`${host}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${host}/api/services`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${host}/api/testimonials`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${host}/api/inquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then(([projectsRes, servicesRes, testimonialsRes, inquiriesRes]) => {
        setCounts({
          projects: projectsRes.data.data.length,
          services: servicesRes.data.data.length,
          testimonials: testimonialsRes.data.data.length,
          inquiries: inquiriesRes.data.data.length,
        });
      })
      .catch((err) => {
        console.error("Error fetching counts:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

 

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-${color}-100 rounded-lg`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600">{title}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <AdminNav />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Projects" value={counts.projects} icon="🏗️" color="blue" />
          <StatCard title="Services Offered" value={counts.services} icon="⚙️" color="gray" />
          <StatCard title="Testimonials" value={counts.testimonials} icon="💬" color="yellow" />
          <StatCard title="Pending Inquiries" value={counts.inquiries} icon="📩" color="green" />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link 
              to="/admin/addProject"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-600 hover:bg-indigo-50 transition-colors group"
            >
              <div className="text-center">
                <span className="text-2xl block mb-2">➕</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">
                  Add Project
                </span>
              </div>
            </Link>

            <Link 
              to="/admin/addService"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-600 hover:bg-indigo-50 transition-colors group"
            >
              <div className="text-center">
                <span className="text-2xl block mb-2">🔧</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">
                  Add Service
                </span>
              </div>
            </Link>

            <Link 
              to="/admin/testimonials"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-600 hover:bg-indigo-50 transition-colors group"
            >
              <div className="text-center">
                <span className="text-2xl block mb-2">✍️</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">
                  View Testimonials
                </span>
              </div>
            </Link>

            <Link 
              to="/admin/inquiries"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-600 hover:bg-indigo-50 transition-colors group"
            >
              <div className="text-center">
                <span className="text-2xl block mb-2">📊</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">
                  View Inquiries
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default AdminDashboard;