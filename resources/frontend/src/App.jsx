import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import ManageProjects from './pages/admin/ManageProjects';
// import ManageServices from './pages/admin/ManageServices';
// import ManageTestimonials from './pages/admin/ManageTestimonials';
// import ManageInquiries from './pages/admin/ManageInquiries';

// 🔒 Simple Private Route Wrapper
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // store Sanctum token after login
  return token ? children : <Navigate to="/admin/login" />;
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      {/* <Route path="/admin/dashboard" element={
        <PrivateRoute>
          <AdminDashboard />
        </PrivateRoute>
      }>
        <Route path="projects" element={<ManageProjects />} />
        <Route path="services" element={<ManageServices />} />
        <Route path="testimonials" element={<ManageTestimonials />} />
        <Route path="inquiries" element={<ManageInquiries />} />
      </Route> */}
    </Routes>
  )
}

export default App
