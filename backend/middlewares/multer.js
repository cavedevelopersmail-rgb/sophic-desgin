const multer = require("multer");

// Use memory storage
const storage = multer.memoryStorage();

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // accept the file
  } else {
    cb(new Error("Only image files are allowed!"), false); // reject the file
  }
};

// Configure multer instance with common settings
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB max file size
  },
});

// Single file upload middleware
const singleUpload = upload.single("file");

// Multiple files upload middleware (max 10 images)
const multipleUpload = upload.array("files", 10);

// Service editor: hero/gallery + per-section images
const serviceFilesUpload = upload.fields([
  { name: "files", maxCount: 10 },
  { name: "sectionImages", maxCount: 24 },
]);

const heroSlidesUpload = upload.fields([
  { name: "slide0", maxCount: 1 },
  { name: "slide1", maxCount: 1 },
  { name: "slide2", maxCount: 1 },
  { name: "slide3", maxCount: 1 },
  { name: "slide4", maxCount: 1 },
  { name: "slide5", maxCount: 1 },
]);

module.exports = {
  singleUpload,
  multipleUpload,
  serviceFilesUpload,
  heroSlidesUpload,
};
