const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    key: { type: String, required: true, unique: true, trim: true, lowercase: true },
    isActive: { type: Boolean, default: false },
    config: {
      primaryColor: { type: String, default: "#0f766e" },
      secondaryColor: { type: String, default: "#00353E" },
      accentColor: { type: String, default: "#9ACD32" },
      backgroundColor: { type: String, default: "#ffffff" },
      textColor: { type: String, default: "#111827" },
      fontFamily: { type: String, default: "Inter, sans-serif" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Theme", themeSchema);
