import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import host from '../../utils/host';
import { ArrowLeft } from "lucide-react";

export default function EditServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    benefits: '',
    photos: null,
  });

  const [preview, setPreview] = useState(null);

  // Fetch service by ID
  useEffect(() => {
    axios
      .get(`${host}/api/services/${id}`)
      .then(res => {
        setService(res.data.data);
        setFormData({
          title: res.data.data.title,
          description: res.data.data.description,
          benefits: res.data.data.benefits,
          photos: res.data.data.photos,
        });
      })
      .catch(err => {
        console.error(err);
        alert('Failed to fetch service');
      });
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0])); // Preview for new image
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Cancel selected photo
  const handleCancelPhoto = () => {
    setFormData({ ...formData, photos: service.photos }); // revert to old photo
    setPreview(null);
    document.getElementById('photo-input').value = ''; // Reset file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('benefits', formData.benefits);

    if (formData.photos && formData.photos !== service.photos) {
      data.append('photos', formData.photos);
    }

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/services/${id}?_method=PUT`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('✅ Service updated successfully!');
      navigate('/admin/services');
    } catch (err) {
      console.error(err.response || err);
      alert('❌ Failed to update service');
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="mb-8 flex items-center">
        <Link
          to="/admin/services"
          className="mr-4 p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Service</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Service Title</label>
          <input
            type="text"
            name="title"
            maxLength={255}
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter service title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter service description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
          />
        </div>

        {/* Benefits */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Benefits</label>
          <textarea
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            placeholder="Enter service benefits"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Upload Photo</label>
          <input
            type="file"
            id="photo-input"
            name="photos"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-gray-700"
          />
        </div>

        {/* Preview Section */}
        <div className="mb-4">
          <p className="text-gray-700 font-semibold mb-2">Photo Preview:</p>
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
          ) : service.photos ? (
            <img
              src={`${host}/storage/${service.photos}`}
              alt="Current Service"
              className="w-32 h-32 object-cover rounded-lg border"
            />
          ) : (
            <p className="text-gray-500">No photo uploaded yet</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Update Service
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/services')}
            className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
