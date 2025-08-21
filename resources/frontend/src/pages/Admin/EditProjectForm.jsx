import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: 'home', // default
    status: 'in_progress',
    description: '',
    budget: '',
    duration: '',
    images: [],
  });
  const [existingImages, setExistingImages] = useState([]);

  // Fetch project by ID
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/projects/${id}`)
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
          images: [],
        });
        setExistingImages(data.image_urls || []);
      })
      .catch(err => {
        console.error(err);
        alert('Failed to fetch project data');
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

    // Existing images as relative paths
    // const relativeImages = existingImages.map(url => url.replace(`${window.location.origin}/storage/`, ''));
    // data.append('existing_images', JSON.stringify(relativeImages));

    // // New images
    // if (formData.images && formData.images.length > 0) {
    //   Array.from(formData.images).forEach(file => data.append('images[]', file));
    // }

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

  if (!project) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
          <input
            type="text"
            name="name"
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
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Existing Images */}
        {/* <div>
          <label className="block text-gray-700 font-semibold mb-2">Existing Images</label>
          {existingImages.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {existingImages.map((url, idx) => (
                <div key={idx} className="relative w-32 h-32 border rounded-lg overflow-hidden">
                  <img src={url} alt="Project" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setExistingImages(prev => prev.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No existing images</p>
          )}
        </div> */}

        {/* Upload New Images */}
        {/* <div>
          <label className="block text-gray-700 font-semibold mb-2">Upload New Images</label>
          <input
            type="file"
            name="images"
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
