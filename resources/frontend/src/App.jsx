import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import Logo from './assets/Logo.png';
import Loader from "./components/Loader"
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PlantsPage from './pages/PlantsPage';
import ToolsPage from "./pages/ToolsPage"
import ContactPage from './pages/ContactPage';
import ReviewsPage from "./pages/ReviewsPage"


import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';

// Admin pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminProfile from './pages/Admin/AdminProfile';
import ForgotPasswordPage from './pages/Admin/ForgotPasswordPage';
import ResetPasswordPage from './pages/Admin/ResetPasswordPage';

import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageProjects from './pages/Admin/ManageProjects';
import ManageServices from './pages/Admin/ManageServices';
import ManageTestimonials from './pages/Admin/ManageTestimonials';
import ManageInquiries from './pages/Admin/ManageInquiries';
import AddProjectForm from './pages/Admin/AddProjectForm';
import AddServiceForm from './pages/Admin/AddServiceForm';
import AddTestimonialForm from './pages/Admin/AddTestimonialForm';
import EditServiceForm from './pages/Admin/EditServiceForm';
import EditProjectForm from './pages/Admin/EditProjectForm';
import EditTestimonialForm from './pages/Admin/EditTestimonialForm';

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
      <Loader Logo={Logo}/>
    ); 
  }


  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/plants" element={<PlantsPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/admin/reset-password" element={<ResetPasswordPage />} />

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
        <Route path="/admin/addTestimonial" element={
          <PrivateRoute><AddTestimonialForm /></PrivateRoute>
        } />
        <Route path="/admin/editService/:id" element={
          <PrivateRoute><EditServiceForm /></PrivateRoute>
        } />
        <Route path="/admin/editProject/:id" element={
          <PrivateRoute><EditProjectForm /></PrivateRoute>
        } />
        <Route path="/admin/editTestimonial/:id" element={
          <PrivateRoute><EditTestimonialForm /></PrivateRoute>
        } />
        <Route path="/admin/profile" element={
          <PrivateRoute><AdminProfile /></PrivateRoute>
        } />
      </Routes>
    </>
  )
}

export default App
