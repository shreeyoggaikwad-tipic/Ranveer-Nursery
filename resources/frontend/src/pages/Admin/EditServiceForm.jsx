import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import host from '../../utils/host'


export default function EditServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    benefits: '',
    photos: [],
    icon: null,
  });
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [existingIcon, setExistingIcon] = useState(null);

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
          photos: [],
          icon: null,
        });
        setExistingPhotos(res.data.data.photos_urls || []);
        setExistingIcon(res.data.data.icon ? `${window.location.origin}/storage/${res.data.data.icon}` : null);
      })
      .catch(err => {
        console.error(err);
        alert('Failed to fetch service');
      });
  }, [id]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('benefits', formData.benefits);

    // Existing photos as relative paths
    const relativePhotos = existingPhotos.map(url => url.replace(`${window.location.origin}/storage/`, ''));
    data.append('existing_photos', JSON.stringify(relativePhotos));

    // New uploaded photos
    if (formData.photos && formData.photos.length > 0) {
      Array.from(formData.photos).forEach(file => data.append('photos[]', file));
    }

    // Icon
    if (formData.icon) data.append('icon', formData.icon);

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

        {/* Existing Photos */}
        {/* <div>
          <label className="block text-gray-700 font-semibold mb-2">Existing Photos</label>
          {existingPhotos.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {existingPhotos.map((url, index) => (
                <div key={index} className="relative w-32 h-32 border rounded-lg overflow-hidden">
                  <img
                    src={url}
                    alt="Service"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setExistingPhotos(prev => prev.filter((_, i) => i !== index))
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No existing photos</p>
          )}
        </div> */}

        {/* Upload New Photos */}
        {/* <div>
          <label className="block text-gray-700 font-semibold mb-2">Upload New Photos</label>
          <input
            type="file"
            name="photos"
            onChange={handleChange}
            multiple
            accept="image/*"
            className="w-full text-gray-700"
          />
        </div> */}


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
