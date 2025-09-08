import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import Logo from './assets/Logo.png';
import Loader from "./components/Loader"
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PlantsPage from './pages/PlantsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
// import ReviewsPage from "./pages/ReviewsPage"
// import ToolsPage from "./pages/ToolsPage"
import WatsappButton from './components/WatsappButton';

// Admin pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminProfile from './pages/Admin/AdminProfile';
import ForgotPasswordPage from './pages/Admin/ForgotPasswordPage';
import ResetPasswordPage from './pages/Admin/ResetPasswordPage';
import ManageInquiries from './pages/Admin/ManageInquiries';

// 🔒 Simple Private Route Wrapper
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/admin/login" />;
}

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Loader Logo={Logo} />
    );
  }

  // ✅ Hide WhatsApp button on admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/plants" element={<PlantsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        {/* <Route path="/reviews" element={<ReviewsPage />} /> */}
        {/* <Route path="/tools" element={<ToolsPage />} /> */}
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/admin/reset-password" element={<ResetPasswordPage />} />
        <Route path="/admin/inquiries" element={
          <PrivateRoute><ManageInquiries /></PrivateRoute>
        } />
        <Route path="/admin/profile" element={
          <PrivateRoute><AdminProfile /></PrivateRoute>
        } />
      </Routes>

      {/* Only show on non-admin routes */}
      {!isAdminRoute && <WatsappButton />}
    </>
  )
}

export default App;
