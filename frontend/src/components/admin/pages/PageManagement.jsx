import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../../services/api";
import { toast } from "react-toastify";
import {
  FaSave,
  FaPlus,
  FaTrash,
  FaEye,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const PageManagement = () => {
  const [navbarItems, setNavbarItems] = useState([]);
  // Existing state
  const [themes] = useState([
    { id: "theme1", name: "Modern Business" },
    { id: "theme2", name: "Portfolio" },
    { id: "theme3", name: "E-commerce" },
  ]);

  // New state additions
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [editingSection, setEditingSection] = useState(null);
  const [showThemePreview, setShowThemePreview] = useState(false);
  const [pageData, setPageData] = useState({
    title: "",
    slug: "",
    metaDescription: "",
    isPublished: true,
    sections: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNavbarItems = async () => {
      try {
        const response = await apiService.getAllNavbarItems();
        console.log("response", response);
        // Validate response is array
        if (Array.isArray(response?.data?.data)) {
          setNavbarItems(response.data?.data);
        } else {
          throw new Error("Invalid navbar items format");
        }
      } catch (error) {
        toast.error("Failed to fetch navbar items");
        // Ensure state remains array
        setNavbarItems([]);
      }
    };

    fetchNavbarItems();
  }, []);

  // Load or initialize page data
  const loadPageData = async (slug) => {
    try {
      // Check if page exists
      const response = await apiService.getPublicPage(slug);

      if (response.data) {
        setPageData(response.data);
        setIsEditing(true);
        toast.info("Existing page loaded for editing");
      } else {
        // Initialize new page
        setPageData({
          title: selectedSection.title,
          slug: selectedSection.slug,
          metaDescription: `Page for ${selectedSection.title}`,
          isPublished: true,
          sections: [
            {
              title: "Main Content",
              components: [],
            },
          ],
        });
        setIsEditing(false);
      }
    } catch (error) {
      // If page doesn't exist, create new
      setPageData({
        title: selectedSection.title,
        slug: selectedSection.slug,
        metaDescription: `Page for ${selectedSection.title}`,
        isPublished: true,
        sections: [
          {
            title: "Main Content",
            components: [],
          },
        ],
      });
      setIsEditing(false);
    }
  };

  return <></>;
};

export default PageManagement;
