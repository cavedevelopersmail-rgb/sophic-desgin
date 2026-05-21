import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  X,
  Eye,
  Edit2,
  Trash2,
  Search,
  Filter,
  Plus,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const LogoManagement = () => {
  const { getLogos, createLogo, getLogoById, updateLogo, deleteLogo } = useAuth();
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        setLoading(true);
        const response = await getLogos();
        console.log(response);
        if (response.data.success) {
          setLogos(response.data.logos);
        }
      } catch (error) {
        console.error("Error fetching logos:", error);
        setError("Failed to fetch logos");
      } finally {
        setLoading(false);
      }
    };
    fetchLogos();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingLogo, setEditingLogo] = useState(null);
  const [newLogo, setNewLogo] = useState({
    companyName: "",
    file: null,
    logoPreview: null,
  });

  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const handleFileSelect = (event, isEdit = false) => {
    const file = event.target.files[0];
    processFile(file, isEdit);
  };

  const processFile = (file, isEdit = false) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, GIF, SVG)");
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (isEdit) {
        setEditingLogo((prev) => ({
          ...prev,
          file: file,
          logoPreview: e.target.result,
        }));
      } else {
        setNewLogo((prev) => ({
          ...prev,
          file: file,
          logoPreview: e.target.result,
        }));
      }
    };
    reader.onerror = () => {
      alert("Error reading file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e, isEdit = false) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0], isEdit);
    }
  };

  const handleUpload = async () => {
    if (newLogo.companyName.trim() && newLogo.file) {
      setUploading(true);
      setError(null);

      const logoData = new FormData();
      logoData.append("companyName", newLogo.companyName);
      logoData.append("file", newLogo.file);

      try {
        const response = await createLogo(logoData);
        console.log(response);
        
        if (response.data.success) {
          setLogos((prev) => [response.data.addLogo, ...prev]);
          resetUploadForm();
        } else {
          setError(response.data.message || "Failed to upload logo");
        }
      } catch (error) {
        console.error("Upload error:", error);
        setError("Failed to upload logo. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleUpdate = async () => {
    if (!editingLogo || !editingLogo.companyName.trim()) return;

    setUpdating(true);
    setError(null);

    const logoData = new FormData();
    logoData.append("companyName", editingLogo.companyName);
    
    // Only append file if a new one was selected
    if (editingLogo.file) {
      logoData.append("file", editingLogo.file);
    }

    try {
      const response = await updateLogo(editingLogo._id, logoData);
      console.log(response);
      
      if (response.data.success) {
        // Update the logos state with the updated logo
        setLogos((prev) => prev.map(logo => 
          logo._id === editingLogo._id ? response.data.updatedLogo : logo
        ));
        resetEditForm();
      } else {
        setError(response.data.message || "Failed to update logo");
      }
    } catch (error) {
      console.error("Update error:", error);
      setError("Failed to update logo. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (logoId) => {
    const logoToDelete = logos.find((logo) => logo._id === logoId);
    if (
      logoToDelete &&
      window.confirm(
        `Are you sure you want to delete the logo for ${logoToDelete.companyName}?`
      )
    ) {
      setDeleting(logoId);
      setError(null);

      try {
        const response = await deleteLogo(logoId);
        console.log(response);
        
        if (response.data.success) {
          setLogos((prev) => prev.filter((logo) => logo._id !== logoId));
        } else {
          setError(response.data.message || "Failed to delete logo");
        }
      } catch (error) {
        console.error("Delete error:", error);
        setError("Failed to delete logo. Please try again.");
      } finally {
        setDeleting(null);
      }
    }
  };

  const resetUploadForm = () => {
    setNewLogo({ companyName: "", file: null, logoPreview: null });
    setShowUploadModal(false);
    setDragActive(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetEditForm = () => {
    setEditingLogo(null);
    setShowEditModal(false);
    setDragActive(false);
    if (editFileInputRef.current) {
      editFileInputRef.current.value = "";
    }
  };

  const toggleStatus = async (logoId) => {
    const logo = logos.find(l => l._id === logoId);
    if (!logo) return;

    const newStatus = logo.status === "active" ? "inactive" : "active";
    
    try {
      const logoData = new FormData();
      logoData.append("companyName", logo.companyName);
      logoData.append("status", newStatus);

      const response = await updateLogo(logoId, logoData);
      
      if (response.data.success) {
        setLogos((prev) =>
          prev.map((logo) =>
            logo._id === logoId
              ? { ...logo, status: newStatus }
              : logo
          )
        );
      }
    } catch (error) {
      console.error("Status toggle error:", error);
      setError("Failed to update logo status");
    }
  };

  const filteredLogos = logos.filter((logo) => {
    const matchesSearch = logo.companyName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || logo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditLogo = async (logoId) => {
    try {
      const response = await getLogoById(logoId);
      console.log(response);
      
      if (response.data.success) {
        const logoData = response.data.logo;
        setEditingLogo({
          ...logoData,
          logoPreview: logoData.logo, // Use existing logo URL as preview
          file: null, // No new file initially
        });
        setShowEditModal(true);
      }
    } catch (error) {
      console.error("Error fetching logo for edit:", error);
      setError("Failed to load logo for editing");
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Logo Management
        </h1>
        <p className="text-gray-600">
          Manage client company logos and branding assets
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right text-red-400 hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Logo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{logos.length}</div>
          <div className="text-sm text-gray-600">Total Logos</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {logos.filter((l) => l.status === "active").length}
          </div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-500">
            {logos.filter((l) => l.status === "inactive").length}
          </div>
          <div className="text-sm text-gray-600">Inactive</div>
        </div>
      </div>

      {/* Logo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredLogos.map((logo) => (
          <div
            key={logo._id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
              <img
                src={logo.logo}
                alt={logo.companyName}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2 truncate">
                {logo.companyName}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>Uploaded: {new Date(logo.createdAt).toLocaleDateString()}</span>
                <button
                  onClick={() => toggleStatus(logo._id)}
                  className={`px-2 py-1 rounded-full text-xs cursor-pointer transition-colors ${
                    logo.status === "active"
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {logo.status}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewImage(logo)}
                  className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  Preview
                </button>
                <button
                  onClick={() => handleEditLogo(logo._id)}
                  className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDelete(logo._id)}
                  disabled={deleting === logo._id}
                  className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors disabled:opacity-50"
                >
                  {deleting === logo._id ? (
                    <div className="w-3 h-3 border-2 border-red-700 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Trash2 className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLogos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Upload className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No logos found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Upload your first client logo to get started"}
          </p>
          {!searchTerm && statusFilter === "all" && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add First Logo
            </button>
          )}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Upload New Logo</h2>
              <button
                onClick={resetUploadForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={newLogo.companyName}
                  onChange={(e) =>
                    setNewLogo((prev) => ({
                      ...prev,
                      companyName: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Image
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center relative transition-colors ${
                    dragActive
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) => handleDrop(e, false)}
                >
                  {newLogo.logoPreview ? (
                    <div className="space-y-4">
                      <div className="w-32 h-32 mx-auto border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <img
                          src={newLogo.logoPreview}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">{newLogo.file?.name}</p>
                        <p>
                          {(newLogo.file?.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setNewLogo((prev) => ({
                            ...prev,
                            file: null,
                            logoPreview: null,
                          }));
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                        }}
                        className="text-sm text-red-600 hover:text-red-800 underline"
                      >
                        Remove image
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload
                        className={`w-8 h-8 mx-auto mb-2 ${
                          dragActive ? "text-blue-500" : "text-gray-400"
                        }`}
                      />
                      <p
                        className={`text-sm mb-2 ${
                          dragActive ? "text-blue-600" : "text-gray-600"
                        }`}
                      >
                        {dragActive
                          ? "Drop your image here"
                          : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF, SVG up to 10MB
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, false)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={resetUploadForm}
                disabled={uploading}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={
                  !newLogo.companyName.trim() || !newLogo.file || uploading
                }
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </>
                ) : (
                  "Upload Logo"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingLogo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Edit Logo</h2>
              <button
                onClick={resetEditForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={editingLogo.companyName}
                  onChange={(e) =>
                    setEditingLogo((prev) => ({
                      ...prev,
                      companyName: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Image
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center relative transition-colors ${
                    dragActive
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) => handleDrop(e, true)}
                >
                  {editingLogo.logoPreview ? (
                    <div className="space-y-4">
                      <div className="w-32 h-32 mx-auto border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <img
                          src={editingLogo.logoPreview}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {editingLogo.file && (
                        <div className="text-sm text-gray-600">
                          <p className="font-medium">{editingLogo.file.name}</p>
                          <p>
                            {(editingLogo.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setEditingLogo((prev) => ({
                            ...prev,
                            file: null,
                            logoPreview: prev.logo, // Reset to original logo
                          }));
                          if (editFileInputRef.current)
                            editFileInputRef.current.value = "";
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                      >
                        {editingLogo.file ? "Remove new image" : "Change image"}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload
                        className={`w-8 h-8 mx-auto mb-2 ${
                          dragActive ? "text-blue-500" : "text-gray-400"
                        }`}
                      />
                      <p
                        className={`text-sm mb-2 ${
                          dragActive ? "text-blue-600" : "text-gray-600"
                        }`}
                      >
                        {dragActive
                          ? "Drop your image here"
                          : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF, SVG up to 10MB
                      </p>
                    </div>
                  )}
                  <input
                    ref={editFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, true)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={resetEditForm}
                disabled={updating}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                disabled={!editingLogo.companyName.trim() || updating}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {updating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  "Update Logo"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {previewImage.companyName}
              </h2>
              <button
                onClick={() => setPreviewImage(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8 mb-4">
              <img
                src={previewImage.logo}
                alt={previewImage.companyName}
                className="max-w-full max-h-96 object-contain"
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>Uploaded: {new Date(previewImage.createdAt).toLocaleDateString()}</p>
              <p>
                Status:{" "}
                <span
                  className={
                    previewImage.status === "active"
                      ? "text-green-600"
                      : "text-gray-600"
                  }
                >
                  {previewImage.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoManagement;