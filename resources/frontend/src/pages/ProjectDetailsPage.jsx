import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Share2,
  Download,
  Eye,
  LocateIcon
} from 'lucide-react';


function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/projects/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProject(response.data.data);
      } catch (err) {
        setError("Failed to load project details");
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">❌</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            to="/projects" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/projects"
                className="mr-4 p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{project.name}</h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm sm:text-base">{project.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                project.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {project.status === 'completed' ? '✅ Completed' : '🔄 In Progress'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Project Gallery</h3>
                <p className="text-sm text-gray-600 mt-1">View all project images</p>
              </div>

              {project.images && project.images.length > 0 ? (
                <div className="p-6">
                  {/* Main Image */}
                  <div className="relative mb-6">
                    <img
                      src={project.image_urls[currentImageIndex]}
                      alt={`${project.name} - Image ${currentImageIndex + 1}`}
                      className="w-full h-96 object-cover rounded-lg cursor-pointer"
                      onClick={() => openLightbox(currentImageIndex)}
                    />
                    
                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                        
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                          {currentImageIndex + 1} / {project.images.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {project.images.length > 1 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
                      {project.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? 'border-indigo-500 ring-2 ring-indigo-200'
                              : 'border-gray-200 hover:border-gray-300'
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
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-400 text-2xl">🖼️</span>
                  </div>
                  <p className="text-gray-500">No images available for this project</p>
                </div>
              )}
            </div>

            {/* Description */}
            {project.description && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Description</h3>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {project.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
              
              <div className="space-y-4">
                {/* Project Type */}
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Type</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {project.type === 'home' ? '🏠 Home' : '🏢 Apartment'}
                  </span>
                </div>

                {/* Budget */}
                {project.budget && (
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-600">Budget</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      ₹{parseInt(project.budget).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                {/* Duration */}
                {project.duration && (
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-600">Duration</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{project.duration}</span>
                  </div>
                )}

                {/* Created Date */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <LocateIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-600">Location</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {project.location}
                  </span>
                </div>
              </div>
            </div>


            
            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Stats</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">
                    {project.images ? project.images.length : 0}
                  </div>
                  <div className="text-xs text-gray-600">Images</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">
                    {project.status === 'completed' ? '100' : '75'}%
                  </div>
                  <div className="text-xs text-gray-600">Complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Main Image */}
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.name} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Floating Action */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <button className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors">
          <Share2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;