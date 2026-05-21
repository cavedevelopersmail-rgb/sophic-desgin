require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Import routes
const adminRoutes = require("./routes/adminRoutes");
const termsRoutes = require("./routes/termsRoutes");
const privacyRoutes = require("./routes/privacyRoutes");
const blogRoutes = require("./routes/blogRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const logoRoutes = require("./routes/logoRoutes");
const projectRoutes = require("./routes/projectRouters");
const contactRoutes = require("./routes/contactRoute");
const serviceRoutes = require("./routes/serviceRoutes");
const themeRoutes = require("./routes/themeRoutes");
const heroRoutes = require("./routes/heroRoutes");
const { seedThemesIfEmpty } = require("./controllers/themeController");
const app = express();
const PORT = process.env.PORT || 3010;

// Connect to MongoDB
connectDB()
  .then(() => seedThemesIfEmpty())
  .catch((error) => console.error("Theme seed failed:", error.message));

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
);

// Serve static files
app.use(express.static("static"));

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/terms", termsRoutes);
app.use("/api/privacy", privacyRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/logo", logoRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/themes", themeRoutes);
app.use("/api/hero", heroRoutes);
// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Serve main page
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/index.html"));
});

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
