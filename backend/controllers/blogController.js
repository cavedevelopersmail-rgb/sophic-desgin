const getDataUri = require("../config/dataUri");
const cloudinary = require("../config/cloudinary");
const Blog = require("../models/Blog");

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const published = req.query.published !== "false"; // Default to published only
    const featured = req.query.featured === "true"; // Filter for featured blogs

    let query = {};

    // Filter by published status
    if (published) {
      query.published = true;
    }

    // Filter by featured status if requested
    if (featured) {
      query.featured = true;
    }

    // Filter by status if provided
    if (req.query.status) {
      query.status = req.query.status;
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get blog by slug
// @route   GET /api/blogs/slug/:slug
// @access  Public
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Create blog
// @route   POST /api/blogs
// @access  Private (Admin only)
const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      tags,
      published,
      author,
      featured,
      status,
      slug,
    } = req.body;

    console.log(
      title
   
    );
    const file = req.file;

    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and author are required",
      });
    }

    // Upload image to cloudinary
    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }
    const blogData = {
      title,
      content,
      author,
      excerpt: excerpt || "",
      tags: tags
        ? Array.isArray(tags)
          ? tags
          : tags.split(",").map((tag) => tag.trim())
        : [],
      published: published === "true",
      featured: featured === "true",
      image: cloudResponse?.secure_url,
      status:
        status ||
        (published === true || published === "true" ? "published" : "draft"),
    };

    // Add custom slug if provided
    if (slug) {
      blogData.slug = slug;
    }

    const blog = await Blog.create(blogData);
    await blog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Blog with this slug already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private (Admin only)
const updateBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      tags,
      published,
      author,
      featured,
      status,
      slug,
    } = req.body;

    const file = req.file;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Update fields if provided
    // Upload image to cloudinary
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      blog.image = cloudResponse?.secure_url;
    }
    if (title !== undefined) blog.title = title;
    if (content !== undefined) blog.content = content;
    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (author !== undefined) blog.author = author;
    if (featured !== undefined)
      blog.featured = featured === true || featured === "true";
    if (slug !== undefined) blog.slug = slug;

    if (tags !== undefined) {
      blog.tags = Array.isArray(tags)
        ? tags
        : tags.split(",").map((tag) => tag.trim());
    }

    if (published !== undefined) {
      blog.published = published === true || published === "true";
    }

    if (status !== undefined) {
      blog.status = status;
    }

    // If neither status nor published is provided, sync them
    if (status === undefined && published !== undefined) {
      blog.status = blog.published ? "published" : "draft";
    } else if (published === undefined && status !== undefined) {
      blog.published = status === "published";
    }

    await blog.save();

    res.json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Blog with this slug already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private (Admin only)
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getBlogs,
  getBlog,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
};
