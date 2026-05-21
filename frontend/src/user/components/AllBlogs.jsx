import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AllBlogs = () => {
  const { getBlogs } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        if (response.data && response.data.success) {
          const formattedBlogs = response.data.blogs.map((blog) => ({
            id: blog._id,
            title: blog.title,
            excerpt: blog.excerpt,
            image: blog.image,
            publishedAt: new Date(blog.publishedAt).toLocaleDateString(),
          }));
          setBlogs(formattedBlogs);
        } else {
          setError("Failed to load blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Error loading blog content");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [getBlogs]);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2ECC97] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-500 mb-4">⚠️ {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#2ECC97] text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">No blogs available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            All Insights
          </h2>
          <div className="w-24 h-1 bg-[#2ECC97] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore all our articles on sustainability, innovation, and industry
            trends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/blog/${blog.id}`}
                    className="inline-block relative group"
                  >
                    <span className="text-[#2ECC97] font-semibold">
                      View Details
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2ECC97] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <span className="text-sm text-gray-500">
                    {blog.publishedAt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllBlogs;
