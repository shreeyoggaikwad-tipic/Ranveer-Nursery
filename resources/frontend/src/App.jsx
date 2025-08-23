import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';

// Admin pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminProfile from './pages/Admin/AdminProfile';
import ForgotPasswordPage from './pages/Admin/ForgotPasswordPage';
import ResetPasswordPage from './pages/Admin/ResetPasswordPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageServices from './pages/Admin/ManageServices';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageInquiries from './pages/Admin/ManageInquiries';
import AddProjectForm from './pages/Admin/AddProjectForm';
import AddServiceForm from './pages/Admin/AddServiceForm';
import EditServiceForm from './pages/Admin/EditServiceForm';
import EditProjectForm from './pages/Admin/EditProjectForm';

// 🔒 Simple Private Route Wrapper
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // store Sanctum token after login
  return token ? children : <Navigate to="/admin/login" />;
}



function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching initial data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time if needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center
                      animate-bounce-slow">
          <span className="text-white font-bold text-3xl">R</span>
        </div>
        <h1 className="mt-5 text-2xl font-bold text-gray-900 animate-pulse">
          Rachnakar Enterprises
        </h1>
      </div>
    ); // Show loading logo
  }


  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailsPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/admin/reset-password/:token" element={<ResetPasswordPage />} />

        <Route path="/admin/dashboard" element={
          <PrivateRoute><AdminDashboard /></PrivateRoute>
        } />
        <Route path="/admin/projects" element={
          <PrivateRoute><ManageProjects /></PrivateRoute>
        } />
        <Route path="/admin/services" element={
          <PrivateRoute><ManageServices /></PrivateRoute>
        } />
        <Route path="/admin/testimonials" element={
          <PrivateRoute><ManageTestimonials /></PrivateRoute>
        } />
        <Route path="/admin/inquiries" element={
          <PrivateRoute><ManageInquiries /></PrivateRoute>
        } />
        <Route path="/admin/addProject" element={
          <PrivateRoute><AddProjectForm /></PrivateRoute>
        } />
        <Route path="/admin/addService" element={
          <PrivateRoute><AddServiceForm /></PrivateRoute>
        } />
        <Route path="/admin/editService/:id" element={
          <PrivateRoute><EditServiceForm /></PrivateRoute>
        } />
        <Route path="/admin/editProject/:id" element={
          <PrivateRoute><EditProjectForm /></PrivateRoute>
        } />
        <Route path="/admin/profile" element={
          <PrivateRoute><AdminProfile /></PrivateRoute>
        } />
      </Routes>
    </>
  )
}

export default App
