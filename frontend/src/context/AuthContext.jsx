import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";

// Create Auth Context
export const AuthContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const logoutRef = useRef(() => {});
  const isLoggingOutRef = useRef(false);

  // Memoized setAuthToken with stable reference
  const setAuthToken = useCallback((token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, []);

  // Memoized logout function
  const logout = useCallback(
    async ({ skipServerLogout = false } = {}) => {
      if (isLoggingOutRef.current) return;
      isLoggingOutRef.current = true;

      try {
        const hasToken = !!localStorage.getItem("token");
        if (!skipServerLogout && hasToken) {
          await api.post("/admin/logout");
        }
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        localStorage.removeItem("token");
        setAuthToken(null);
        setUser(null);
        isLoggingOutRef.current = false;
      }
    },
    [setAuthToken]
  );

  // Set logout reference during render
  logoutRef.current = logout;

  // Add response interceptor to handle token expiration
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        const requestUrl = error.config?.url || "";
        const isAuthEndpoint =
          requestUrl.includes("/admin/login") ||
          requestUrl.includes("/admin/logout");

        if (error.response?.status === 401 && !isAuthEndpoint) {
          logoutRef.current({ skipServerLogout: true });
        }
        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, []);

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        setAuthToken(token);
        try {
          const response = await api.get("/admin/profile");
          setUser(response.data.admin);
        } catch (error) {
          if (error.response?.status === 401) {
            localStorage.removeItem("token");
          }
          console.error("Authentication error:", error);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [setAuthToken]);

  // Memoized login function
  const login = useCallback(
    async (credentials) => {
      try {
        const response = await api.post("/admin/login", credentials);
        const { token, admin } = response.data;

        localStorage.setItem("token", token);
        setAuthToken(token);
        setUser(admin);
        return admin;
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
      }
    },
    [setAuthToken]
  );

  // API functions
  // Contact Management
  const createContact = (contactData) => api.post("/contacts", contactData);

  const getAllContacts = (page = 1, limit = 10, status = "", search = "") =>
    api.get("/contacts", {
      params: {
        page,
        limit,
        ...(status && { status }),
        ...(search && { search }),
      },
    });

  const getContactById = (id) => api.get(`/contacts/${id}`);

  const updateContact = (id, updateData) =>
    api.put(`/contacts/${id}`, updateData);

  const deleteContact = (id) => api.delete(`/contacts/${id}`);

  const addNoteToContact = (id, content) =>
    api.post(`/contacts/${id}/notes`, { content });

  // Admin Profile
  const getAdminProfile = () => api.get("/admin/profile");
  const updateAdminProfile = (profileData) =>
    api.put("/admin/profile", profileData);

  // Terms & Conditions
  const getTerms = () => api.get("/terms");
  const updateTerms = (termsData) => api.post("/terms", termsData);

  // Privacy Policy
  const getPrivacy = () => api.get("/privacy");
  const updatePrivacy = (privacyData) => api.post("/privacy", privacyData);

  // Blog Management
  const getBlogs = (page = 1, limit = 10) =>
    api.get(`/blogs?page=${page}&limit=${limit}`);
  const getBlogById = (id) => api.get(`/blogs/${id}`);
  const getBlogBySlug = (slug) => api.get(`/blogs/slug/${slug}`);
  const createBlog = (blogData) =>
    api.post("/blogs", blogData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  const updateBlog = (id, blogData) =>
    api.put(`/blogs/${id}`, blogData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  const deleteBlog = (id) => api.delete(`/blogs/${id}`);

  // Reviews Management
  const getReviews = (page = 1, limit = 10) =>
    api.get(`/reviews?page=${page}&limit=${limit}`);
  const getReviewStats = () => api.get("/reviews/stats");
  const getReviewById = (id) => api.get(`/reviews/${id}`);
  const createReview = (reviewData) =>
    api.post("/reviews", reviewData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  const updateReview = (id, reviewData) =>
    api.put(`/reviews/${id}`, reviewData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  const deleteReview = (id) => api.delete(`/reviews/${id}`);

  // Logo management
  const createLogo = (logoData) =>
    api.post("/logo", logoData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  const updateLogo = (id, logoData) =>
    api.put(`/logo/${id}`, logoData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  const getLogoById = (id) => api.get(`/logo/${id}`);
  const getLogos = () => api.get("/logo");
  const deleteLogo = (id) => api.delete(`/logo/${id}`);
  // Project Management
  const getProjects = () => api.get("/project");
  const getProjectById = (id) => api.get(`/project/${id}`);
  // Service Management
  const getServices = (includeInactive = false) =>
    api.get(`/services${includeInactive ? "?includeInactive=true" : ""}`);
  const getServiceBySlug = (slug) => api.get(`/services/slug/${slug}`);
  const getServiceById = (id) => api.get(`/services/id/${id}`);
  const createService = (serviceData) =>
    api.post("/services", serviceData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  const updateService = (id, serviceData) =>
    api.put(`/services/${id}`, serviceData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  const deleteService = (id) => api.delete(`/services/${id}`);
  // Hero (landing)
  const getHero = () => api.get("/hero");
  const updateHero = (formData) =>
    api.put("/hero", formData, {
      transformRequest: [
        (data, headers) => {
          if (data instanceof FormData) {
            delete headers["Content-Type"];
          }
          return data;
        },
      ],
    });
  // Theme Management
  const getThemes = () => api.get("/themes");
  const getActiveTheme = () => api.get("/themes/active");
  const createTheme = (themeData) => api.post("/themes", themeData);
  const activateTheme = (id) => api.put(`/themes/${id}/activate`);

  // System Health
  const checkHealth = () => api.get("/health");

  // Memoized context value
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      loading,
      isAuthenticated: !!user,
      // Contact API methods
      createContact, // Added contact submission method
      getAllContacts,
      getContactById,
      updateContact,
      deleteContact,
      addNoteToContact,
      // Other API methods
      getAdminProfile,
      updateAdminProfile,
      getTerms,
      updateTerms,
      getPrivacy,
      updatePrivacy,
      getBlogs,
      getBlogById,
      getBlogBySlug,
      createBlog,
      updateBlog,
      deleteBlog,
      getReviews,
      getReviewStats,
      getReviewById,
      createReview,
      updateReview,
      deleteReview,
      createLogo,
      updateLogo,
      getLogoById,
      getLogos,
      deleteLogo,
      checkHealth,
      api,
      getProjectById,
      getProjects,
      getServices,
      getServiceBySlug,
      getServiceById,
      createService,
      updateService,
      deleteService,
      getHero,
      updateHero,
      getThemes,
      getActiveTheme,
      createTheme,
      activateTheme,
    }),
    [user, login, logout, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
