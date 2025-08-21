import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

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
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            alert('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/inquiries", formData);
            if (response.status === 200) {
                setSubmitted(true);

                setTimeout(() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', message: '' });
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
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">We'll get back to you within 24 hours.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>

            <div className="space-y-6">
                {errorMessage && <p className="text-red-600 font-medium">{errorMessage}</p>}

                <InputField label="Full Name *" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
                <InputField label="Email Address *" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" type="email" />
                <InputField label="Phone Number *" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" type="tel" />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us about your project requirements..."
                    ></textarea>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
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

// Reusable input field
function InputField({ label, name, value, onChange, placeholder, type = 'text' }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder={placeholder}
            />
        </div>
    );
}

// WhatsApp Floating Button Component
function WhatsAppButton() {
     const [user, setUser] = useState({});
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/users/1");
                const userData = res.data.data;
                setUser({ number: userData.number });
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    const handleWhatsAppClick = () => {
        if (!user.number) return; // wait for user to load

        const message = encodeURIComponent(
            "Hello! I'm interested in your construction services. Could we discuss my project requirements?"
        );

        // Ensure full international number, no spaces
        let phoneNumber = user.number.replace(/\D/g, ''); 
        if (!phoneNumber.startsWith('91')) {
            phoneNumber = '91' + phoneNumber; 
        }

        window.open(`https://wa.me/9552679797?text=${message}`, '_blank');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={handleWhatsAppClick}
                disabled={!user.number}
                className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-bounce"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.687" />
                </svg>
            </button>
        </div>
    );
}

// Main Contact Page
function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <Navbar />

            {/* Main Content - Form and Map */}
            <section className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                            <ContactForm />
                        </div>
                        <div className="space-y-8">
                            {/* Map & Business Hours */}
                            <MapAndBusinessHours />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </div>
    );
}

// Map & Business Hours component
function MapAndBusinessHours() {
    const [user, setUser] = useState({});
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/users/1");
                const userData = res.data.data;
                setUser({ businessHours: userData.business_hours });
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);
    return (
        <>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Our Location</h3>
                </div>
                <div className="h-80">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15130.834447713653!2d73.7694!3d18.5596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sBaner%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Rachnakar Enterprises Location"
                    ></iframe>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Business Hours</h3>
                <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-gray-600 font-bold">{user.businessHours}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600 font-bold">Saturday-Sunday (Closed)</span></div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <p className="text-blue-800 text-sm"><strong>Emergency Contact:</strong> Available 24/7 for urgent construction issues.</p>
                </div>
            </div>
        </>
    );
}

export default ContactPage;
