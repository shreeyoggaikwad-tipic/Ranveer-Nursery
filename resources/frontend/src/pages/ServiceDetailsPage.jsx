import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import host from '../utils/host'


function ServiceDetailsPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchService = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${host}/api/services/${id}`,
          {
            headers: { Authorization: token ? `Bearer ${token}` : undefined },
          }
        );
        setService(response.data.data);
      } catch (err) {
        setError("Failed to load service details");
        console.error("Error fetching service:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading service details...</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-2">❌ {error}</p>
          <Link
            to="/services"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center">
          <Link
            to="/services"
            className="mr-4 p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Service Gallery
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Browse images related to this service
                </p>
              </div>

              {service.photos ? (
                <div className="p-6">
                  {/* Main Image */}
                  <div className="relative mb-6">
                    <img
                      src={`${host}/storage/${service.photos}`}
                      className="w-full h-96 object-cover rounded-lg cursor-pointer"
                    />
                  </div>

                </div>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  No images available for this service
                </div>
              )}
            </div>

            {/* Benefits */}
            {service.benefits && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Benefits
                </h3>
                <div>{service.benefits}</div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Description */}
            {service.description && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default ServiceDetailsPage;
