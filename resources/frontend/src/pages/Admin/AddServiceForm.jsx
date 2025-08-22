// components/AddServiceForm.jsx
import React, { useState } from "react";
import axios from 'axios';
import { Upload, X, Plus, ArrowLeft, Settings } from "lucide-react";
import { Link , useNavigate} from "react-router-dom";

export default function AddServiceForm({ onSubmit, onCancel }) {
  const navigate = useNavigate();

  const handleAddService = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/services",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Service saved:", response.data);
      alert("✅ Service saved successfully!");
      navigate("/admin/services");
    } catch (error) {
      console.error("❌ Error saving service:", error.response || error);
      alert("Failed to save service. Check console for details.");
    }
  };
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    benefits: "",
    images: [],
  });

  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const fileArray = Array.from(files);
      setFormData({ ...formData, images: files });
      setSelectedFiles(fileArray);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = e.dataTransfer.files;
      const fileArray = Array.from(files);
      setFormData({ ...formData, images: files });
      setSelectedFiles(fileArray);
    }
  };

  const removeFile = (indexToRemove) => {
    const newFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(newFiles);
    
    const dt = new DataTransfer();
    newFiles.forEach(file => dt.items.add(file));
    setFormData({ ...formData, images: dt.files });
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("title", formData.name);
  data.append("description", formData.description);
  data.append("benefits", formData.benefits);

  if (formData.images && formData.images.length > 0) {
    for (let i = 0; i < formData.images.length; i++) {
      data.append("photos[]", formData.images[i]); // Laravel expects "photos[]" for multiple files
    }
  }

  handleAddService(data);
  if (onSubmit) onSubmit(data);
};

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="mr-4 p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Service</h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  Create a new service offering for your business
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Service Information</h3>
              <p className="text-sm text-gray-600 mt-1">Basic details about your service offering</p>
            </div>

            <div className="px-6 py-6 space-y-6">
              {/* Service Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  name="name"
                  maxLength={255}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="e.g., Interior Design, Home Renovation, Construction"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Enter a clear and descriptive service name</p>
              </div>

              {/* Service Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                  rows="4"
                  placeholder="Describe your service in detail."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Provide a comprehensive overview of what this service includes
                </p>
              </div>

              {/* Service Benefits */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Benefits & Features
                </label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                  rows="5"
                  placeholder="List the key benefits and features of this service."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Highlight what clients will gain from choosing this service. Use bullet points for better readability.
                </p>
              </div>
            </div>
          </div>

          {/* Service Images Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Service Images</h3>
              <p className="text-sm text-gray-600 mt-1">Upload images that showcase this service</p>
            </div>

            <div className="px-6 py-6">
              {/* Drag and Drop Area */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  name="images"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  multiple
                  accept="image/*"
                />
                
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drop service images here, or{" "}
                  <span className="text-indigo-600">browse</span>
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  PNG, JPG, GIF up to 10MB each
                </p>
                <p className="text-xs text-gray-400">
                  Upload before/after photos, process images, or finished work examples
                </p>
              </div>

              {/* Selected Files Preview */}
              {selectedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Selected Images ({selectedFiles.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center flex-1">
                          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-indigo-600 text-lg">🖼️</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all duration-200 flex items-center"
            >
              Save Service
            </button>

            <Link to="/admin/services"
              className="px-8 py-3 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 hover:shadow-md transition-all duration-200 flex items-center"
            >
              Discard
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}