import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Testimonial from "./components/Testimonial/Testimonial";
import BlogsComp from "./components/Blogs/BlogsComp";
import DevisPage from "./components/DevisPage";
import RegisterForm from "./components/RegisterForm";
import AOS from "aos";
import Payment from "./components/Payment";
import "aos/dist/aos.css";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./adminDashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatBotToggle from "./chatbot/ChatBotToggle";
import { ChatProvider } from "./chatbot/ChatContext";

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 900,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <AuthProvider>
      <ChatProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Contact Us" element={<Contact />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/*" element={<Navigate to="/Home" />} />
          </Routes>
          <ChatBotToggle />
        </Router>
      </ChatProvider>
    </AuthProvider>
  );
};

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <Services />
    <Testimonial />
    <BlogsComp />
    <Footer />
  </>
);

const Login = () => (
  <>
    <Navbar />
    <LoginForm />
    <Footer />
  </>
);

const Register = () => (
  <>
    <Navbar />
    <RegisterForm />
    <Footer />
  </>
);

const Contact = () => (
  <>
    <Navbar />
    <DevisPage />
    <Footer />
  </>
);

export default App;
