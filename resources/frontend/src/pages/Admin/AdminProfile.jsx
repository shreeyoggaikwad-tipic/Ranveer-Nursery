import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Clock, Users, ArrowLeft, Edit3, Save, X, Briefcase, FileText, Loader2 } from 'lucide-react';
import axios from 'axios';
import host from '../../utils/host';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';

export default function AdminProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [adminData, setAdminData] = useState({
        name: '',
        email: '',
        number: '',
        years_of_experience: 0,
        location: '',
        business_hours: '',
        happy_clients: 0
    });

    const [editData, setEditData] = useState({ ...adminData });

    const token = localStorage.getItem("token");

    // ✅ Fetch Admin Data
    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${host}/api/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.data.success) {
                const data = response.data.data;
                setAdminData(data);
                setEditData(data);
            } else {
                console.error("Failed to fetch admin data:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching admin data:", error.response?.data || error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Edit Handler
    const handleEdit = () => {
        setEditData({ ...adminData });
        setIsEditing(true);
    };

    // ✅ Save Handler
    const handleSave = async () => {
        try {
            setSaving(true);
            const response = await axios.put(`${host}/api/profile`, editData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (response.data.success) {
                setAdminData(response.data.data);
                setIsEditing(false);
                alert("Profile updated successfully!");
            } else {
                alert(response.data.message || "Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error.response?.data || error);
            alert("Error updating profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    // ✅ Cancel Edit
    const handleCancel = () => {
        setEditData({ ...adminData });
        setIsEditing(false);
    };

    // ✅ Input Change Handler
    const handleInputChange = (field, value) => {
        setEditData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 p-4">
            <div className="max-w-4xl mx-auto">
                {loading ? (
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                            <p className="text-gray-600">Loading profile...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="bg-orange-500 rounded-t-2xl p-8 text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/5"></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <Link to="/admin/dashboard"
                                        className="mr-4 p-2 text-gray-600 hover:text-orange-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </Link>
                                    <div className='flex flex-col justify-center items-center'>
                                        <h1 className="text-3xl font-bold mb-2">Rachnakar Enterprise</h1>
                                        <p className="text-blue-100">Administrative Dashboard</p>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                        <User className="w-8 h-8" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Content */}
                        <div className="bg-white rounded-b-2xl shadow-xl">
                            {/* Profile Header */}
                            <div className="p-8 border-b border-gray-100">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center space-x-6">

                                        <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                            <img src={Logo} alt="Logo" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{adminData.name}</h2>
                                            <p className="text-gray-600 mb-2">System Administrator</p>
                                        </div>
                                    </div>

                                    {!isEditing ? (
                                        <button
                                            onClick={handleEdit}
                                            className="bg-orange-500 hover:bg-orange-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            <span>Edit Profile</span>
                                        </button>
                                    ) : (
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={handleSave}
                                                disabled={saving}
                                                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
                                            >
                                                {saving ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        <span>Saving...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="w-4 h-4" />
                                                        <span>Save Changes</span>
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                disabled={saving}
                                                className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
                                            >
                                                <X className="w-4 h-4" />
                                                <span>Cancel</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Profile Details */}
                            <div className="p-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Left Column */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                            Personal Information
                                        </h3>

                                        {/* Name */}
                                        <div className="space-y-2">
                                            <label className="flex items-center text-sm font-medium text-gray-700">
                                                <User className="w-4 h-4 mr-2 text-orange-500" />
                                                Full Name
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editData.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{adminData.name}</p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label className="flex items-center text-sm font-medium text-gray-700">
                                                <Mail className="w-4 h-4 mr-2 text-orange-500" />
                                                Email Address
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    value={editData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{adminData.email}</p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-2">
                                            <label className="flex items-center text-sm font-medium text-gray-700">
                                                <Phone className="w-4 h-4 mr-2 text-orange-500" />
                                                Phone Number
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    value={editData.number}
                                                    onChange={(e) => handleInputChange('number', e.target.value)}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{adminData.number}</p>
                                            )}
                                        </div>

                                        {/* Location */}
                                        <div className="space-y-2">
                                            <label className="flex items-center text-sm font-medium text-gray-700">
                                                <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                                                Location
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editData.location}
                                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{adminData.location}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                            Professional Details
                                        </h3>

                                        {/* Experience */}
                                        <div className="space-y-2">
                                            <label className="flex items-center text-sm font-medium text-gray-700">
                                                <Briefcase className="w-4 h-4 mr-2 text-orange-500" />
                                                Years of Experience
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    value={editData.years_of_experience}
                                                    onChange={(e) => handleInputChange('years_of_experience', parseInt(e.target.value))}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{adminData.years_of_experience} years</p>
                                            )}
                                        </div>

                                        {/* Business Hours */}
                                        <div className="space-y-2">
                                            <label className="flex items-center text-sm font-medium text-gray-700">
                                                <Clock className="w-4 h-4 mr-2 text-orange-500" />
                                                Business Hours
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editData.business_hours}
                                                    onChange={(e) => handleInputChange('business_hours', e.target.value)}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{adminData.business_hours}</p>
                                            )}
                                        </div>

                                        {/* Happy Clients */}
                                        <div className="space-y-2">
                                            <label className="flex items-center text-sm font-medium text-gray-700">
                                                <Users className="w-4 h-4 mr-2 text-orange-500" />
                                                Happy Clients
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    value={editData.happy_clients}
                                                    onChange={(e) => handleInputChange('happy_clients', parseInt(e.target.value))}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{adminData.happy_clients}+ clients</p>
                                            )}
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}