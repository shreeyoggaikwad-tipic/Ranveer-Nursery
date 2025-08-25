// components/AddProjectForm.jsx
import React, { useState } from "react";
import axios from 'axios';
import { Upload, X, Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import host from '../../utils/host'

export default function AddProjectForm({ onSubmit, onCancel }) {

  const navigate = useNavigate();


  const handleAddProject = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${host}/api/projects`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Project saved:", response.data);
      alert("✅ Project saved successfully!");
      navigate("/admin/projects");
    } catch (error) {
      console.error("❌ Error saving project:", error.response || error);
      alert("Failed to save project. Check console for details.");
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    image: null,
    location: "",
    type: "home",
    status: "in-progress",
    description: "",
    budget: "",
    duration: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setSelectedFile(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("type", formData.type);
    data.append("status", formData.status);
    data.append("description", formData.description);
    data.append("budget", formData.budget);
    data.append("duration", formData.duration);

    if (formData.image) {
      data.append("image", formData.image);
    }

    handleAddProject(data);
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
                to="/admin/projects"
                onClick={onCancel}
                className="mr-4 p-2 text-gray-600 hover:text-orange-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Project</h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  Create a new project entry for your portfolio
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Project Information</h3>
              <p className="text-sm text-gray-600 mt-1">Basic details about your project</p>
            </div>

            <div className="px-6 py-6 space-y-6">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="name"
                  maxLength={255}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter project name"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  maxLength={255}
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter project location"
                />
              </div>

              {/* Type & Status Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="home">🏠 Home</option>
                    <option value="apartment">🏢 Apartment</option>
                    {/* <option value="other">📋 Other</option> */}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="completed">✅ Completed</option>
                    <option value="in-progress">🔄 In Progress</option>
                  </select>
                </div>
              </div>

              {/* Budget & Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget (INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      min={0}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="Enter budget amount"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    maxLength={255}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="e.g., 6 months, 3 weeks"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                  rows="4"
                  placeholder="Describe your project, materials used, challenges overcome, etc."
                />
              </div>
            </div>
          </div>

          {/* Images Upload Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Project Image</h3>
              <p className="text-sm text-gray-600 mt-1">Upload an image for your project</p>
            </div>

            <div className="px-6 py-6">
              {/* Drag and Drop Area */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors`}
              >
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                />

                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drop your image here, or{" "}
                  <span className="text-orange-600">browse</span>
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, GIF up to 2MB
                </p>
              </div>

              {/* ✅ Preview Section */}
              {selectedFile && (
                <div className="mt-6 relative w-40">
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setFormData({ ...formData, image: null });
                    }}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </button>
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
              type="submit"
              className="px-8 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-sm hover:bg-orange-600 hover:shadow-md transition-all duration-200 flex items-center"
            >
              Save Project
            </button>

            <Link to="/admin/projects"
              className="px-8 py-3 bg-gray-600 text-white font-medium rounded-lg shadow-sm hover:bg-gray-700 hover:shadow-md transition-all duration-200 flex items-center"
            >
              Discard
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}