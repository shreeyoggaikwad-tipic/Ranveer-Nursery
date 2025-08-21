import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";

function ServiceDetailsPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/services/${id}`,
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

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === service.photos_urls.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? service.photos_urls.length - 1 : prev - 1
    );
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

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

  const hasPhotos = service.photos_urls && service.photos_urls.length > 0;

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

              {hasPhotos ? (
                <div className="p-6">
                  {/* Main Image */}
                  <div className="relative mb-6">
                    <img
                      src={service.photos_urls[currentImageIndex]}
                      alt={`${service.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-96 object-cover rounded-lg cursor-pointer"
                      onClick={() => openLightbox(currentImageIndex)}
                    />

                    {service.photos_urls.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                          {currentImageIndex + 1} / {service.photos_urls.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {service.photos_urls.length > 1 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
                      {service.photos_urls.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? "border-indigo-500 ring-2 ring-indigo-200"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
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

      {/* Lightbox */}
      {lightboxOpen && hasPhotos && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <X className="w-5 h-5" />
            </button>

            {service.photos_urls.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <img
              src={service.photos_urls[currentImageIndex]}
              alt={`${service.title} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceDetailsPage;
