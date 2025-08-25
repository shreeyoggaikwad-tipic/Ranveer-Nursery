import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import host from '../../utils/host'
import { ArrowLeft } from "lucide-react";


export default function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [preview, setPreview] = useState(null);
  const [removeExistingPhoto, setRemoveExistingPhoto] = useState(false);

  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: 'home', // default
    status: 'in_progress',
    description: '',
    budget: '',
    duration: '',
    image: null,
  });
  const [existingImage, setExistingImage] = useState(null);

  // Fetch project by ID
  useEffect(() => {
    axios
      .get(`${host}/api/projects/${id}`)
      .then(res => {
        const data = res.data.data;
        setProject(data);
        setFormData({
          name: data.name,
          location: data.location,
          type: data.type,
          status: data.status,
          description: data.description || '',
          budget: data.budget || '',
          duration: data.duration || '',
          image: null,
        });
        setExistingImage(data.image_url || null);
      })
      .catch(err => {
        console.error(err);
        alert('Failed to fetch project data');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCancelPhoto = () => {
    setFormData({ ...formData, image: null });
    setPreview(null);
  };


  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('type', formData.type);
    data.append('status', formData.status);
    data.append('description', formData.description);
    data.append('budget', formData.budget);
    data.append('duration', formData.duration);

    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/projects/${id}?_method=PUT`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('✅ Project updated successfully!');
      navigate('/admin/projects');
    } catch (err) {
      console.error(err.response || err);
      alert('❌ Failed to update project');
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="mb-8 flex items-center">
        <Link
          to="/admin/projects"
          className="mr-4 p-2 text-gray-600 hover:text-orange-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
          <input
            type="text"
            name="name"
            maxLength={255}
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            maxLength={255}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Budget</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            min={0}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Duration (in days)</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            maxLength={255}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="home">Home</option>
            <option value="apartment">Apartment</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Upload Photo</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-gray-700"
          />
        </div>

        {/* Preview / Existing Photo */}
        <div className="mb-4">
          <p className="text-gray-700 font-semibold mb-2">Image Preview:</p>
          {preview ? (
            <div className="relative w-32 h-32">
              <img
                src={preview}
                alt="New Preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={handleCancelPhoto}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ) : existingImage ? (
            <img
              src={existingImage}
              alt="Current Project"
              className="w-32 h-32 object-cover rounded-lg border"
            />
          ) : (
            <p className="text-gray-500">No image uploaded yet</p>
          )}
        </div>


        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Update Project
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
