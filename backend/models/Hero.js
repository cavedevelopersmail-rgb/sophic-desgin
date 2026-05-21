const mongoose = require("mongoose");

const statTileSchema = new mongoose.Schema(
  {
    icon: { type: String, default: "Calendar" },
    label: { type: String, default: "" },
    value: { type: String, default: "" },
  },
  { _id: false }
);

const featureRowSchema = new mongoose.Schema(
  {
    icon: { type: String, default: "ShieldCheck" },
    text: { type: String, default: "" },
  },
  { _id: false }
);

const slideSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    highlight: { type: String, default: "" },
    description: { type: String, default: "" },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    theme: {
      type: String,
      default: "from-teal-900 via-teal-800 to-teal-700",
    },
    layout: {
      type: String,
      enum: ["layout1", "layout2", "layout3", "layout4"],
      default: "layout1",
    },
    statTiles: { type: [statTileSchema], default: [] },
    ctaLabel: { type: String, default: "Contact Us" },
    ctaHref: { type: String, default: "#contact" },
    topBadge: { type: String, default: "" },
    statValue: { type: String, default: "" },
    statLabel: { type: String, default: "" },
    features: { type: [featureRowSchema], default: [] },
    cta2Label: { type: String, default: "" },
    cta2Href: { type: String, default: "#projects" },
  },
  { _id: false }
);

const heroSchema = new mongoose.Schema(
  {
    slides: {
      type: [slideSchema],
      validate: {
        validator(v) {
          return Array.isArray(v) && v.length >= 1 && v.length <= 6;
        },
        message: "Hero must have between 1 and 6 slides",
      },
    },
    autoRotateMs: {
      type: Number,
      default: 5000,
      min: 2000,
      max: 120000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", heroSchema);
