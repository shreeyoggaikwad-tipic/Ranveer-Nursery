// components/AddServiceForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { Upload, X, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import host from "../../utils/host";

export default function AddServiceForm({ onSubmit, onCancel }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    benefits: "",
    photos: null, // single image
  });
  const [preview, setPreview] = useState(null); // image preview
  const [loading, setLoading] = useState(false);

  // ✅ Upload Service
  const handleAddService = async (formData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(`${host}/api/services`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Service saved successfully!");
      navigate("/admin/services");
    } catch (error) {
      console.error("❌ Error saving service:", error.response || error);
      alert("Failed to save service.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photos" && files && files[0]) {
      setFormData({ ...formData, photos: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.name);
    data.append("description", formData.description);
    data.append("benefits", formData.benefits);
    if (formData.photos) {
      data.append("photos", formData.photos);
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
              <Link
                to="/admin/services"
                onClick={onCancel}
                className="mr-4 p-2 text-gray-600 hover:text-orange-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Add New Service
                </h1>
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
              <h3 className="text-lg font-semibold text-gray-900">
                Service Information
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Basic details about your service offering
              </p>
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
                  placeholder="e.g., Interior Design, Home Renovation"
                  required
                />
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
                  placeholder="List the key benefits of this service."
                />
              </div>
            </div>
          </div>

          {/* Service Image Upload */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Service Image
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Upload one image for this service
              </p>
            </div>

            <div className="px-6 py-6">
              {/* Upload Area */}
              <div className="relative border-2 border-dashed rounded-lg p-8 text-center transition-colors border-gray-300 hover:border-gray-400">
                <input
                  type="file"
                  name="photos"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drop an image here, or{" "}
                  <span className="text-orange-600">browse</span>
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>

              {/* Image Preview */} 
              {preview && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Selected Image
                  </h4>
                  <div className="relative w-40 h-40">
                    <img
                      src={preview}
                      alt="Selected"
                      className="w-full h-full object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, photos: null });
                        setPreview(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:bg-red-50 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
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
              type="submit"
              disabled={loading}
              className={`px-8 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-sm hover:bg-orange-600 hover:shadow-md transition-all duration-200 flex items-center justify-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Service"
              )}
            </button>
            <Link
              to="/admin/services"
              className="px-8 py-3 bg-gray-600 text-white font-medium rounded-lg shadow-sm hover:bg-gray-700 transition-all duration-200 flex items-center"
            >
              Discard
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
