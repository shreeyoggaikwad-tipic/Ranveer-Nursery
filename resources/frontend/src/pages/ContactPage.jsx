import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import host from '../utils/host';

// Contact Form Component
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.name) {
            alert('Please fill in your name');
            return;
        } else if (!/^[A-Za-z\s]{1,100}$/.test(formData.name)) {
            alert('Name must contain only alphabets and spaces, and be at most 100 characters long');
            return;
        } else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            // ✅ Only check if email is not empty
            alert('Please enter a valid email address');
            return;
        } else if (!/^[9876]\d{9}$/.test(formData.phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        } else if (!/^[\s\S]{10,500}$/.test(formData.message)) {
            alert('Message must be between 10 and 500 characters');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const response = await axios.post(`${host}/api/inquiries`, formData);
            if (response.status >= 200 && response.status < 300) {
                setSubmitted(true);
                setFormData({ name: '', email: '', phone: '', message: '' });
                setTimeout(() => {
                    setSubmitted(false);
                }, 3000);
            }
        } catch (error) {
            console.error("Error submitting contact form:", error);
            setErrorMessage('Failed to send your message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };



    if (submitted) {
        return (
            <div className="bg-white p-10 rounded-3xl shadow-xl text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 text-3xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
                <p className="text-gray-600">Your message has been received. We’ll get back to you soon!</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-100 animate-fade-in">
            <h3 className="text-3xl font-bold text-green-800 mb-6">🌱 Send Us a Message</h3>
            <p className="text-gray-500 mb-6">We’d love to hear from you! Fill out the form below and we’ll respond as quickly as possible.</p>

            <div className="space-y-6">
                {errorMessage && <p className="text-red-600 font-medium">{errorMessage}</p>}

                <InputField
                    label="Full Name *"
                    name="name"
                    value={formData.name}
                    onChange={(e) => {
                        // Allow only alphabets and spaces, max 100 chars
                        const onlyAlphabets = e.target.value.replace(/[^A-Za-z\s]/g, "").slice(0, 100);
                        setFormData({ ...formData, name: onlyAlphabets });
                    }}
                    placeholder="Enter your full name"
                    required
                />
                <InputField label="Email Address (optional)" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" type="email" />
                <InputField
                    label="Phone Number *"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, ""); // remove non-digits
                        setFormData({ ...formData, phone: onlyDigits.slice(0, 10) }); // max 10 digits
                    }}
                    placeholder="Enter your phone number"
                    type="tel"
                    required
                />

                <div>
                    <label className="block text-sm font-semibold text-green-700 mb-2">Message *</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us about your project requirements..."
                    ></textarea>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                        </div>
                    ) : (
                        'Send Message'
                    )}
                </button>
            </div>
        </div>
    );
}

function InputField({ label, name, value, onChange, placeholder, type = 'text' }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-green-700 mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder={placeholder}
            />
        </div>
    );
}

function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
            <Navbar />
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                            <ContactForm />
                        </div>
                        <div className="space-y-8">
                            <MapAndBusinessHours />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

function MapAndBusinessHours() {

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchStats = async () => {
            try {

                // Fetch user (assuming 1st user = admin)
                const userRes = await axios.get(`${host}/api/users/1`);
                const user = userRes.data.data;

                setUser(user);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        }
        fetchStats();
    }, []);


    return (
        <>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <div className="p-6">
                    <h3 className="text-2xl font-bold text-green-800 mb-4">📍 Our Location</h3>
                </div>
                <div className="h-80">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15135.80530187668!2d74.1077792151833!3d18.485863852577438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sA%2Fp.%20Koregaon%20Mul%2C%20Pune%20Solapur%20Road%2C%20Near%20Uruli%20Kanchan%2C%20tal.%20Haveli%2C%20Pune-412202%20NH9!5e0!3m2!1sen!2sin!4v1757313204232!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Nursery Location"
                    ></iframe>
                </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <h3 className="text-2xl font-bold text-green-800 mb-6">🕒 Business Hours</h3>
                <div className="space-y-3 text-gray-700 font-medium">
                    <div>Monday-Saturday: <span className="text-red-500">{user?.business_hours}</span></div>
                    <div>Sunday: <span className="text-red-500">Closed</span></div>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-xl">
                    <p className="text-green-700 text-sm"><strong>Contact:</strong> Available 24/7 for any issues or help.</p>
                </div>
            </div>
        </>
    );
}

export default ContactPage;
