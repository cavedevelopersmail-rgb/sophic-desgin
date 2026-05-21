import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import PageSeo from "../../components/PageSeo";

function htmlToExcerpt(html, maxLen = 160) {
  if (!html || typeof html !== "string") return "";
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length <= maxLen ? text : `${text.slice(0, maxLen).trim()}…`;
}

const BlogPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
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
      } catch {
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
  const description =
    htmlToExcerpt(blog.content) ||
    `Insights from Sophic Designs on MEP engineering and projects. Published ${format(new Date(blog.publishedAt), "MMMM d, yyyy")}.`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description,
    datePublished: blog.publishedAt,
    ...(blog.image ? { image: blog.image } : {}),
    publisher: {
      "@type": "Organization",
      name: "Sophic Designs Pvt. Ltd.",
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <PageSeo
        title={blog.title}
        description={description}
        pathname={pathname}
        image={coverImage.startsWith("http") ? coverImage : undefined}
        keywords={`${blog.title}, MEP blog, Sophic Designs, engineering India`}
        type="article"
        jsonLd={articleLd}
      />
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
        <div className="w-full mt-2 rounded-2xl border border-green-100 bg-white px-6 py-7 shadow-md">
          <div
            className="prose max-w-none text-base text-gray-700"
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />
        </div>
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
