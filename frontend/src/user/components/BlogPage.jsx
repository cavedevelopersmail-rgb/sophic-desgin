import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet";

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlogById } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogById(id);
        if (response.data && response.data.success) {
          setBlog(response.data.blog);
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        setError("Failed to load blog content");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, getBlogById]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center">
        {error}
      </div>
    );
  if (!blog) return null;

  const cleanContent = DOMPurify.sanitize(blog.content);
  const coverImage = blog.image || "/default-cover.jpg";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Helmet>
        <title>{blog.title} | Blog</title>
      </Helmet>
      {/* BREADCRUMB - optional */}
      <div className="text-xs text-gray-500 mb-2 w-full">
        Home / Blog / {blog.title}
      </div>
      <div className="pt-8 max-w-2xl mx-auto flex flex-col items-center">
        {/* MAIN IMAGE */}
        <div className="w-full">
          <img
            src={coverImage}
            alt={blog.title}
            className="w-full h-[260px] md:h-[340px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-green-600 mt-6 mb-2 text-center">
          {blog.title}
        </h1>
<div> {/* CONTENT CARD */}
        <div className=" w-full mt-2 bg-white rounded-2xl shadow-md border border-green-100 px-6 py-7">
          <div
            className="prose max-w-none text-gray-700 text-base"
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />
        </div></div>
       
      </div>
      {/* DATE */}
      <div className="flex items-center justify-center mb-4">
        <div className="text-sm text-[#4bc174] bg-[#ebfaef] rounded px-3 py-1 font-medium">
          {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
