import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const BlogCardsSection = () => {
  const { getBlogs } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await getBlogs();
        console.log("----------------------->>>>>>>>>>>>", response);
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

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext();
    } else if (touchEnd - touchStart > 50) {
      handlePrev();
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= blogs.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? blogs.length - 1 : prevIndex - 1
    );
  };

  // Calculate visible blogs based on screen size and total blogs
  const getVisibleBlogs = () => {
    if (blogs.length === 0) return [];

    // Always show only one blog if there's only one available
    if (blogs.length === 1) {
      return [blogs[0]];
    }

    // For multiple blogs, show based on screen size
    if (windowWidth < 768) {
      return [blogs[currentIndex]];
    } else if (windowWidth < 1024) {
      return [
        blogs[currentIndex % blogs.length],
        blogs[(currentIndex + 1) % blogs.length],
      ];
    } else {
      return [
        blogs[currentIndex % blogs.length],
        blogs[(currentIndex + 1) % blogs.length],
        blogs[(currentIndex + 2) % blogs.length],
      ];
    }
  };

  const visibleBlogs = getVisibleBlogs();

  // Determine grid columns based on visible blogs count
  const getGridColumns = () => {
    if (visibleBlogs.length === 1) return "grid-cols-1";
    if (visibleBlogs.length === 2) return "md:grid-cols-2";
    return "md:grid-cols-2 lg:grid-cols-3";
  };

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
            Latest Insights
          </h2>
          <div className="w-24 h-1 bg-[#2ECC97] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our latest articles on sustainability, innovation, and
            industry trends.
          </p>
        </div>

        <div
          className="relative"
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Dynamic grid columns based on visible blog count */}
          <div className={`grid grid-cols-1 ${getGridColumns()} gap-8`}>
            {visibleBlogs.map((blog) => (
              <div
                key={blog.id}
                className={`bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
                  blogs.length === 1 ? "max-w-2xl mx-auto" : ""
                }`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-[#2ECC97] text-white text-sm font-semibold px-3 py-1 rounded-full">
                    New
                  </div>
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

          {/* Navigation Arrows - Only show if there are multiple blogs */}
          {blogs.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 focus:outline-none transition-all md:block hidden"
                aria-label="Previous blog"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#2ECC97]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 focus:outline-none transition-all md:block hidden"
                aria-label="Next blog"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#2ECC97]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Mobile indicators */}
        {blogs.length > 1 && (
          <div className="flex justify-center mt-8 md:hidden">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full ${
                  currentIndex === index ? "bg-[#2ECC97]" : "bg-gray-300"
                }`}
                aria-label={`Go to blog ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/allBlogs"
            className="inline-block bg-[#2ECC97] hover:bg-[#25b083] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogCardsSection;
