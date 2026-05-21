import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./user/components/Header";
import Footer from "./user/components/Footer";
import LandingPage from "./user/components/LandingPage";
import About from "./user/components/About";
import Industries from "./user/components/Industries";
import Credentials from "./user/components/Credentials";
import Contact from "./user/components/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ServiceDetailDynamic from "./user/components/service/ServiceDetailDynamic";
import ServicesPage from "./user/components/ServicesPage";
import ScrollToTop from "./components/ScrollToTop";
import Leaders from "./components/admin/pages/Leaders";
import Privacy from "./user/components/Privacy";
import Terms from "./user/components/Terms";
import AllProject from "./user/components/AllProject";
import BlogPage from "./user/components/BlogPage";
import AllBlogs from "./user/components/AllBlogs";
// add vercel deploy now

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00353E]"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/admin/login" replace />;
};

const LandingPageLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="w-full flex-1 min-w-0 overflow-x-hidden pt-[var(--site-header-height)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Routes>
            {/* User routes with layout */}
            <Route element={<LandingPageLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/blog/:id" element={<BlogPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/allBlogs" element={<AllBlogs />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/leaders" element={<Leaders />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/id/:id" element={<ServiceDetailDynamic />} />
              <Route path="/services/:slug" element={<ServiceDetailDynamic />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/projects" element={<AllProject />} />
              <Route path="/credentials" element={<Credentials />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
