import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Upload,
  Star,
  StarOff,
  Loader,
} from "lucide-react";
import { api, useAuth } from "../../../context/AuthContext";

const ProjectManagement = () => {
  const { getProjects } = useAuth();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiLoading, setApiLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'edit'
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    year: "",
    category: "",
    description: "",
    highlights: [],
    scope: "",
    value: "",
    featured: false,
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [highlightInput, setHighlightInput] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      const response = await getProjects();

      if (response.data.success) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      location: "",
      year: "",
      category: "",
      description: "",
      highlights: [],
      scope: "",
      value: "",
      featured: false,
    });
    setImages([]);
    setExistingImages([]);
    setHighlightInput("");
  };

  const openCreateModal = () => {
    resetForm();
    setModalMode("create");
    setSelectedProject(null);
    setShowModal(true);
  };

  const openEditModal = (project) => {
    setFormData({
      title: project.title || "",
      location: project.location || "",
      year: project.year || "",
      category: project.category || "",
      description: project.description || "",
      highlights: project.highlights || [],
      scope: project.scope || "",
      value: project.value || "",
      featured: project.featured || false,
    });
    setExistingImages(project.images || []);
    setImages([]);
    setModalMode("edit");
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        highlights: [...prev.highlights, highlightInput.trim()],
      }));
      setHighlightInput("");
    }
  };

  const removeHighlight = (index) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  const removeExistingImage = (publicId) => {
    setExistingImages((prev) =>
      prev.filter((img) => img.publicId !== publicId)
    );
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.title || !formData.description || !formData.category) {
      alert(
        "Please fill in all required fields (Title, Description, Category)"
      );
      return;
    }

    const formDataToSend = new FormData();

    // Add text fields
    formDataToSend.append("title", formData.title);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("year", formData.year);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("scope", formData.scope);
    formDataToSend.append("value", formData.value);
    formDataToSend.append("featured", formData.featured);
    formDataToSend.append("highlights", JSON.stringify(formData.highlights));

    // Add images
    images.forEach((image) => {
      formDataToSend.append("files", image);
    });

    // For edit mode, add keepImages array
    if (modalMode === "edit") {
      const keepImagesIds = existingImages.map((img) => img.publicId);
      formDataToSend.append("keepImages", JSON.stringify(keepImagesIds));
    }
    try {
      setApiLoading(true);

      let response;
      if (modalMode === "create") {
        response = await api.post("/project", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await api.put(
          `/project/${selectedProject._id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.data.success) {
        await fetchProjects();
        setShowModal(false);
        resetForm();
      } else {
        alert(response.data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while saving the project");
    } finally {
      setApiLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      setApiLoading(true);
      const response = await api.delete(`/project/${projectId}`);

      if (response.data.success) {
        await fetchProjects();
        setDeleteConfirm(null);
      } else {
        alert(response.data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("An error occurred while deleting the project");
    } finally {
      setApiLoading(false);
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Project Management
          </h1>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            Add New Project
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Project Image */}
              <div className="h-48 bg-gray-200 relative">
                {project.images && project.images.length > 0 ? (
                  <img
                    src={project.images[0].url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
                {project.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white p-1 rounded">
                    <Star size={16} fill="white" />
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{project.category}</p>
                <div className="flex gap-1">
                  {project.location && (
                    <p className="text-sm text-gray-500 mb-2">
                      📍 {project.location}
                    </p>
                  )}
                  {project.year && (
                    <p className="text-sm text-gray-500 mb-2">
                      📅 {project.year}
                    </p>
                  )}
                </div>

                <span className="flex gap-0.5 flex-wrap ">
                  {project.highlights.map((highlight, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-gray-500 bg-blue-400/20 px-1 py-1 border-blue-400 mb-2"
                    >
                      {highlight}
                    </p>
                  ))}
                </span>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {project.description}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => openEditModal(project)}
                    className="text-blue-600 hover:text-blue-800 p-2"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(project._id)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found</p>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">
                    {modalMode === "create"
                      ? "Create New Project"
                      : "Edit Project"}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Location and Year */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year
                      </label>
                      <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Scope and Value */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Scope
                      </label>
                      <input
                        type="text"
                        name="scope"
                        value={formData.scope}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Value
                      </label>
                      <input
                        type="text"
                        name="value"
                        value={formData.value}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Featured */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Featured Project
                    </label>
                  </div>

                  {/* Highlights */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Highlights
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={highlightInput}
                        onChange={(e) => setHighlightInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addHighlight())
                        }
                        placeholder="Add highlight..."
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={addHighlight}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                        >
                          {highlight}
                          <button
                            type="button"
                            onClick={() => removeHighlight(index)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Existing Images (Edit Mode) */}
                  {modalMode === "edit" && existingImages.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Images
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {existingImages.map((image) => (
                          <div key={image.publicId} className="relative">
                            <img
                              src={image.url}
                              alt="Project"
                              className="w-full h-20 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                removeExistingImage(image.publicId)
                              }
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New Images */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {modalMode === "edit" ? "Add New Images" : "Images"}
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex justify-end gap-2 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      {apiLoading ? (
                        <Loader className="animate-spin" />
                      ) : modalMode === "create" ? (
                        "Create Project"
                      ) : (
                        "Update Project"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this project? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  {apiLoading ? <Loader className="animate-spin" /> : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;
