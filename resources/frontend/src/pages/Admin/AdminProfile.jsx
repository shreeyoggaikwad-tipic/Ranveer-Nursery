import React, { useState, useEffect } from 'react';
import {
    User, Mail, Phone, MapPin, Clock, Users, ArrowLeft, Edit3, Save, X, Briefcase, Loader2
} from 'lucide-react';
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
    const [errors, setErrors] = useState({});


    const token = localStorage.getItem("token");

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
            }
        } catch (error) {
            console.error("Error fetching admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => {
        setEditData({ ...adminData });
        setIsEditing(false);
    };

    const handleSave = async () => {
        // Clear previous errors
        setErrors({});

        // ✅ Client-side validation for phone number
        const newErrors = {};
        if (!editData.number || !/^\d{10}$/.test(editData.number)) {
            newErrors.number = ["Phone number must be 10 digits long."];
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Stop saving
        }

        try {
            setSaving(true);

            const response = await axios.put(`${host}/api/profile`, editData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.data.success) {
                setAdminData(response.data.data);
                setIsEditing(false);
                alert("Profile updated successfully!");
            } else {
                alert("Update failed. Try again.");
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: "An unexpected error occurred." });
            }
        } finally {
            setSaving(false);
        }
    };


    const handleInputChange = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-white">
                <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
                <span className="ml-3 text-gray-600">Loading profile...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-10">

                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center space-x-3">
                        <Link to="/admin/inquiries" className="text-green-600 hover:underline flex items-center">
                            <ArrowLeft className="w-5 h-5 mr-1" />
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-800">Admin Profile</h1>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                    <div className="flex flex-col md:flex-row">

                        {/* Left Sidebar */}
                        <div className="bg-green-500 p-6 flex flex-col items-center justify-center text-white md:w-1/3">
                            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden mb-4">
                                <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-2xl font-semibold">{adminData.name}</h2>
                            <p className="text-green-100 text-sm mb-6">System Administrator</p>

                            <div className="flex flex-col items-center space-y-2">
                                <div className="text-lg font-bold">{adminData.happy_clients}+</div>
                                <p className="text-sm text-green-100">Happy Clients</p>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="flex-1 p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-700">Profile Details</h3>
                                {!isEditing ? (
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                                    >
                                        <Edit3 className="w-4 h-4 mr-2" /> Edit
                                    </button>
                                ) : (
                                    <div className="space-x-3">
                                        <button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400"
                                        >
                                            {saving ? 'Saving...' : 'Save'}
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}

                            </div>
                            {/* Error Messages */}
                            {Object.keys(errors).length > 0 && (
                                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                    <h4 className="font-bold mb-2">Please fix the following:</h4>
                                    <ul className="list-disc list-inside text-sm">
                                        {Object.entries(errors).map(([field, messages]) => (
                                            <li key={field}>
                                                <strong>{field}:</strong> {Array.isArray(messages) ? messages.join(", ") : messages}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Full Name */}
                                <ProfileField
                                    label="Full Name"
                                    icon={<User className="w-4 h-4 text-green-500" />}
                                    value={isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full border p-2 rounded"
                                        />
                                    ) : adminData.name}
                                />

                                {/* Email */}
                                <ProfileField
                                    label="Email"
                                    icon={<Mail className="w-4 h-4 text-green-500" />}
                                    value={isEditing ? (
                                        <input
                                            type="email"
                                            value={editData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full border p-2 rounded"
                                        />
                                    ) : adminData.email}
                                />

                                {/* Phone */}
                                <ProfileField
                                    label="Phone"
                                    icon={<Phone className="w-4 h-4 text-green-500" />}
                                    value={isEditing ? (
                                        <input
                                            type="tel"
                                            value={editData.number}
                                            onChange={(e) => handleInputChange('number', e.target.value)}
                                            className="w-full border p-2 rounded"
                                        />
                                    ) : adminData.number}
                                />

                                {/* Location */}
                                <ProfileField
                                    label="Location"
                                    icon={<MapPin className="w-4 h-4 text-green-500" />}
                                    value={isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            className="w-full border p-2 rounded"
                                        />
                                    ) : adminData.location}
                                />

                                {/* Experience */}
                                <ProfileField
                                    label="Experience"
                                    icon={<Briefcase className="w-4 h-4 text-green-500" />}
                                    value={isEditing ? (
                                        <input
                                            type="number"
                                            value={editData.years_of_experience}
                                            onChange={(e) => handleInputChange('years_of_experience', parseInt(e.target.value))}
                                            className="w-full border p-2 rounded"
                                        />
                                    ) : `${adminData.years_of_experience} years`}
                                />

                                {/* Business Hours */}
                                <ProfileField
                                    label="Business Hours"
                                    icon={<Clock className="w-4 h-4 text-green-500" />}
                                    value={isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.business_hours}
                                            onChange={(e) => handleInputChange('business_hours', e.target.value)}
                                            className="w-full border p-2 rounded"
                                        />
                                    ) : adminData.business_hours}
                                />

                                {/* Happy Clients (NEW Editable) */}
                                <ProfileField
                                    label="Happy Clients"
                                    icon={<Users className="w-4 h-4 text-green-500" />}
                                    value={isEditing ? (
                                        <input
                                            type="number"
                                            value={editData.happy_clients}
                                            onChange={(e) => handleInputChange('happy_clients', parseInt(e.target.value))}
                                            className="w-full border p-2 rounded"
                                        />
                                    ) : `${adminData.happy_clients}+`}
                                />

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ✅ Reusable ProfileField Component
function ProfileField({ label, icon, value }) {
    return (
        <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                {icon}
                <span className="ml-2">{label}</span>
            </label>
            <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                {value}
            </div>
        </div>
    );
}
