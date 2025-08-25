import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft,
  MapPin,
  IndianRupee,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  Share2,
  LocateIcon
} from 'lucide-react';
import host from '../utils/host'



function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${host}/api/projects/${id}`,
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
                {project.location ? <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm sm:text-base">{project.location}</span>
                </div> : null}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${project.status === 'completed'
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
                <h3 className="text-lg font-semibold text-gray-900">Project Image</h3>
                <p className="text-sm text-gray-600 mt-1">View project image</p>
              </div>

              {project.image_url ? (
                <div className="p-6">
                  <div className="relative mb-6">
                    <img
                      src={project.image_url}
                      alt={project.name}
                      className="w-full h-96 object-cover rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-400 text-2xl">🖼️</span>
                  </div>
                  <p className="text-gray-500">No image available for this project</p>
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
                      <IndianRupee className="w-4 h-4 text-gray-400 mr-2" />
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
                {project.location && (
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center">
                      <LocateIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-600">Location</span>
                    </div>

                    <span className="text-sm font-semibold text-gray-900">
                      {project.location}
                    </span>
                  </div>
                )}
              </div>
            </div>



            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Stats</h3>

              <div className="grid grid-cols-1 gap-4">
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

    </div>
  );
}

export default ProjectDetailsPage;