// components/AddServiceForm.jsx
import React, { useState } from "react";
import axios from 'axios';
import { Upload, X, Plus, ArrowLeft, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import host from '../../utils/host'


export default function AddTestimonialForm({ onSubmit, onCancel }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleAddTestimonial = async (formData) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${host}/api/testimonials`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Testimonial saved:", response.data);
            alert("✅ Testimonial saved successfully!");
            navigate("/admin/testimonials");
        } catch (error) {
            console.error("❌ Error saving service:", error.response || error);
            alert("Failed to save service. Check console for details.");
        }
        finally {
            setLoading(false);
        }
    };

    const [formData, setFormData] = useState({
        name: "",
        rating: "",
        feedback: "",
        photo: "",
    });


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "photo") {
            setFormData({ ...formData, photo: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("rating", formData.rating);
        data.append("feedback", formData.feedback);
        if (formData.photo) {
            data.append("photo", formData.photo);
        }

        handleAddTestimonial(data);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link to="/admin/testimonials"
                                onClick={onCancel}
                                className="mr-4 p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>

                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Testimonial</h1>
                                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                                    Create a new testimonial for your business
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Testimonial Information</h3>
                            <p className="text-sm text-gray-600 mt-1">Basic details about your testimonial</p>
                        </div>

                        <div className="px-6 py-6 space-y-6">
                            {/* Testimonial Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name of Client *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    maxLength={255}
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="Enter client's name"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Enter client's name</p>
                            </div>

                            {/* Testimonial Feedback */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Feedback *
                                </label>
                                <textarea
                                    name="feedback"
                                    value={formData.feedback}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                                    rows="4"
                                    placeholder="Feedback of your Client"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Write the testimonial feedback provided by the client.
                                </p>
                            </div>

                            {/* Rating Field */}
                            <div>
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                                    Rating *
                                </label>
                                <select
                                    id="rating"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 `}
                                >
                                    <option value="">Select a rating</option>
                                    <option value="1">⭐ 1 - Poor</option>
                                    <option value="2">⭐⭐ 2 - Fair</option>
                                    <option value="3">⭐⭐⭐ 3 - Good</option>
                                    <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
                                    <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
                                </select>
                            </div>

                            {/* Photo Upload with Preview */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Photo of Client
                                </label>

                                {!formData.photo ? (
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
                                        <input
                                            type="file"
                                            name="photo"
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                                        <p className="text-gray-600 font-medium">Click or drag an image to upload</p>
                                        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                    </div>
                                ) : (
                                    <div className="relative w-40 h-40">
                                        <img
                                            src={URL.createObjectURL(formData.photo)}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg border border-gray-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, photo: "" })}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

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
                            disabled={loading}
                            className={`px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all duration-200 flex items-center justify-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
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
                                "Save Testimonial"
                            )}
                        </button>


                        <Link to="/admin/testimonials"
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