import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import host from '../../utils/host';
import { ArrowLeft } from "lucide-react";

export default function EditTestimonial() {
    const token = localStorage.getItem("token");
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        feedback: '',
        rating: '',
        photo: null
    });

    const [currentPhoto, setCurrentPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTestimonial();
    }, []);

    const fetchTestimonial = async () => {
        setInitialLoading(true);
        try {
            const response = await axios.get(`${host}/api/testimonials/${id}`);
            const data = response.data.data ? response.data.data : response.data; // handle both cases

            setFormData({
                name: data.name || '',
                feedback: data.feedback || '',
                rating: data.rating ? data.rating.toString() : '',
                photo: null
            });

            setCurrentPhoto(data.photo ? `${host}/storage/${data.photo}` : null);
        } catch (error) {
            console.error('Error fetching testimonial:', error);
            setMessage('Failed to load testimonial.');
        } finally {
            setInitialLoading(false);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
            const maxSize = 2048 * 1024;

            if (!allowedTypes.includes(file.type)) {
                setErrors(prev => ({ ...prev, photo: 'Invalid file type.' }));
                return;
            }

            if (file.size > maxSize) {
                setErrors(prev => ({ ...prev, photo: 'Photo must be under 2MB.' }));
                return;
            }

            setFormData(prev => ({ ...prev, photo: file }));

            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result);
            reader.readAsDataURL(file);

            if (errors.photo) setErrors(prev => ({ ...prev, photo: '' }));
        }
    };

    const removePhoto = () => {
        setFormData(prev => ({ ...prev, photo: null }));
        setPhotoPreview(null);
        document.getElementById('photo').value = '';
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.feedback.trim()) newErrors.feedback = 'Feedback is required.';
        if (formData.rating && (parseInt(formData.rating) < 1 || parseInt(formData.rating) > 5)) {
            newErrors.rating = 'Rating must be between 1 and 5.';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setErrors({});
        setMessage('');

        try {
            const apiFormData = new FormData();
            apiFormData.append('name', formData.name);
            apiFormData.append('feedback', formData.feedback);
            if (formData.rating) apiFormData.append('rating', formData.rating);
            if (formData.photo) apiFormData.append('photo', formData.photo);

            const response = await axios.post(`${host}/api/testimonials/${id}?_method=PUT`, apiFormData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log(response.data);


            setMessage('Testimonial updated successfully!');
            if (formData.photo) {
                setCurrentPhoto(photoPreview);
                setPhotoPreview(null);
                setFormData(prev => ({ ...prev, photo: null }));
                document.getElementById('photo').value = '';
            }

            navigate('/admin/testimonials')
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                setMessage('An error occurred while updating the testimonial.');
            }
        } finally {
            setLoading(false);
        }
    };


    if (initialLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading testimonial...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="mb-8 flex items-center">
                            <Link
                                to="/admin/testimonials"
                                className="mr-4 p-2 text-gray-600 hover:text-orange-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Testimonial</h1>
                        <p className="text-gray-600">Update the testimonial information below</p>
                    </div>

                    {/* Success Message */}
                    {message && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex">
                                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <p className="ml-3 text-sm text-green-700 font-medium">{message}</p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <div className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                maxLength="255"
                                className={`w-full px-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter your full name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Feedback Field */}
                        <div>
                            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                                Feedback <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="feedback"
                                name="feedback"
                                value={formData.feedback}
                                onChange={handleInputChange}
                                required
                                rows="5"
                                className={`w-full px-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 resize-vertical ${errors.feedback ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Share your experience and feedback"
                            />
                            {errors.feedback && (
                                <p className="mt-1 text-sm text-red-600">{errors.feedback}</p>
                            )}
                        </div>

                        {/* Rating Field */}
                        <div>
                            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                                Rating (Optional)
                            </label>
                            <select
                                id="rating"
                                name="rating"
                                value={formData.rating}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ${errors.rating ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">Select a rating</option>
                                <option value="1">⭐ 1 - Poor</option>
                                <option value="2">⭐⭐ 2 - Fair</option>
                                <option value="3">⭐⭐⭐ 3 - Good</option>
                                <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
                                <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
                            </select>
                            {errors.rating && (
                                <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
                            )}
                        </div>

                        {/* Photo Field */}
                        <div>
                            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                                Photo (Optional)
                            </label>

                            {/* Current Photo Display */}
                            {currentPhoto && !photoPreview && (
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-2">Current photo:</p>
                                    <div className="relative inline-block">
                                        <img
                                            src={currentPhoto}
                                            alt="Current testimonial photo"
                                            className="h-24 w-24 object-cover rounded-lg border border-gray-300"
                                            onError={() => setCurrentPhoto(null)}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Photo Preview */}
                            {photoPreview && (
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-2">New photo preview:</p>
                                    <div className="relative inline-block">
                                        <img
                                            src={photoPreview}
                                            alt="Photo preview"
                                            className="h-24 w-24 object-cover rounded-lg border border-gray-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={removePhoto}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center hover:bg-red-600 transition duration-200"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            )}

                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                onChange={handleFileChange}
                                accept=".jpeg,.jpg,.png,.gif"
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ${errors.photo ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Accepted formats: JPEG, PNG, JPG, GIF. Maximum size: 2MB.
                            </p>
                            {errors.photo && (
                                <p className="mt-1 text-sm text-red-600">{errors.photo}</p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-6 py-3 bg-orange-500 text-white flex flex-rowt-white rounded-lg hover:bg-orange-600 transition"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </>
                                ) : (
                                    'Update Testimonial'
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/admin/testimonials')}
                                className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}