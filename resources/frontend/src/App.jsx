import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import Logo from './assets/Logo.png';
import Loader from "./components/Loader"
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PlantsPage from './pages/PlantsPage';
import ToolsPage from "./pages/ToolsPage"
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ReviewsPage from "./pages/ReviewsPage"
import WatsappButton from './components/WatsappButton';

// Admin pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminProfile from './pages/Admin/AdminProfile';
import ForgotPasswordPage from './pages/Admin/ForgotPasswordPage';
import ResetPasswordPage from './pages/Admin/ResetPasswordPage';
import ManageInquiries from './pages/Admin/ManageInquiries';


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
      <WatsappButton/>
    </>
  )
}

export default App
