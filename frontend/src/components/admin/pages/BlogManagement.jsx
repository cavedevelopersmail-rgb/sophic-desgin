import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar,
  User,
  Tag,
  Image,
  X,
  Loader,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const BlogManagement = () => {
  const { getBlogs, createBlog, updateBlog, deleteBlog } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    status: "draft",
    tags: "",
    featured: false,
    file: "",
  });

  // API call to fetch the blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getBlogs();

        if (response.data.success) {
          setBlogs(response.data.blogs || []);
          setFilteredBlogs(response.data.blogs || []);
        } else {
          setError("Failed to fetch blogs");
          setBlogs([]);
          setFilteredBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Error loading blogs. Please try again.");
        setBlogs([]);
        setFilteredBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [getBlogs]);

  // Filter blogs based on search and status
  useEffect(() => {
    let filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.tags &&
          blog.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    );

    if (selectedStatus !== "all") {
      filtered = filtered.filter((blog) => blog.status === selectedStatus);
    }

    setFilteredBlogs(filtered);
  }, [searchTerm, selectedStatus, blogs]);

  const changeEventHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      author: "",
      status: "draft",
      tags: "",
      featured: false,
      image: "",
    });
    setImagePreview(null);
    setError("");
    setIsModalOpen(true);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || "",
      content: blog.content || "",
      excerpt: blog.excerpt || "",
      author: blog.author || "",
      status: blog.status || "draft",
      tags: blog.tags ? blog.tags.join(", ") : "",
      featured: blog.featured || false,
      image: blog.image || "",
    });
    setImagePreview(blog.image || null);
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        setLoading(true);
        const response = await deleteBlog(id);

        if (response.data.success) {
          // Remove the deleted blog from state
          setBlogs(blogs.filter((blog) => blog._id !== id && blog.id !== id));
          setFilteredBlogs(
            filteredBlogs.filter((blog) => blog._id !== id && blog.id !== id)
          );
        } else {
          setError(response.data.message || "Failed to delete blog");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        setError("Error deleting blog. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, image: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const rawData = new FormData();
      rawData.append("title", formData.title);
      rawData.append("content", formData.content);
      rawData.append("excerpt", formData.excerpt);
      rawData.append("author", formData.author);
      rawData.append("status", formData.status);
      rawData.append("tags", formData.tags);
      rawData.append("featured", formData.featured);
      rawData.append("published", formData.status === "published");

      if (formData.file) {
        rawData.append("file", formData.file);
      }

      let response;
      if (editingBlog) {
        // Update existing blog
        response = await updateBlog(editingBlog._id || editingBlog.id, rawData);

        if (response.data.success) {
          // Update the blog in state
          const updatedBlogs = blogs.map((blog) =>
            blog._id === editingBlog._id || blog.id === editingBlog.id
              ? { ...blog, ...response.data.blog }
              : blog
          );
          setBlogs(updatedBlogs);
        }
      } else {
        // Create new blog
        response = await createBlog(rawData);

        if (response.data.success) {
          // Add the new blog to state
          setBlogs([response.data.blog, ...blogs]);
        }
      }
      if (response.data.success) {
        setIsModalOpen(false);
        setEditingBlog(null);
        setImagePreview(null);
        setFormData({
          title: "",
          content: "",
          excerpt: "",
          author: "",
          status: "draft",
          tags: "",
          featured: false,
          file: "",
        });
      } else {
        setError(response.data.message || "Failed to save blog post");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      setError(error.response.data.message || "Error saving blog post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      published: "bg-green-100 text-green-800 border-green-200",
      draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
      archived: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full border ${
          statusStyles[status] || statusStyles.draft
        }`}
      >
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Draft"}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <Loader className="w-5 h-5 animate-spin" />
            <span>Loading blogs...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Blog Management
        </h1>
        <p className="text-gray-600">
          Manage your blog posts, create new content, and track performance.
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search blogs..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Create Button */}
          <button
            onClick={handleCreate}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Blog
          </button>
        </div>
      </div>

      {/* Blog List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {filteredBlogs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-600">
              {blogs.length === 0
                ? "Create your first blog post to get started."
                : "Try adjusting your search or filters."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id || blog.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Blog Image */}
                  <div className="flex-shrink-0">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-24 h-16 object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-24 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center ${
                        blog.image ? "hidden" : ""
                      }`}
                    >
                      <Image className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {blog.title}
                      </h3>
                      {blog.featured && (
                        <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                      {getStatusBadge(blog.status)}
                    </div>

                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {blog.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(blog.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {blog.tags && blog.tags.length > 0 ? (
                          <>
                            {blog.tags.slice(0, 2).join(", ")}
                            {blog.tags.length > 2 &&
                              ` +${blog.tags.length - 2}`}
                          </>
                        ) : (
                          "No tags"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(blog)}
                      disabled={loading}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id || blog.id)}
                      disabled={loading}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl mx-auto w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Error Display in Modal */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.title}
                  onChange={changeEventHandler}
                  name="title"
                />
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Blog Image
                </label>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-48 h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* File Upload */}
                  <div className="flex-1">
                    <label className="block text-xs text-gray-600 mb-1">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
                  </div>

                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.excerpt}
                  onChange={changeEventHandler}
                  placeholder="Brief description of the blog post..."
                  name="excerpt"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  rows={12}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.content}
                  onChange={changeEventHandler}
                  name="content"
                  placeholder="Write your blog content here..."
                />
              </div>

              {/* Row with Author, Status, Tags */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.author}
                    onChange={changeEventHandler}
                    name="author"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.status}
                    onChange={changeEventHandler}
                    name="status"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.tags}
                    onChange={changeEventHandler}
                    name="tags"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </div>

              {/* Featured */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={formData.featured}
                  onChange={changeEventHandler}
                  name="featured"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 text-sm text-gray-700"
                >
                  Mark as featured post
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setError("");
                  }}
                  disabled={submitting}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:bg-blue-400 flex items-center gap-2"
                >
                  {submitting && <Loader className="w-4 h-4 animate-spin" />}
                  {submitting
                    ? "Saving..."
                    : editingBlog
                    ? "Update Blog"
                    : "Create Blog"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
