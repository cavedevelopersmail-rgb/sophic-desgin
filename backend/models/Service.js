const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    longDescription: { type: String, trim: true },
    details: [{ type: String, trim: true }],
    image: {
      url: { type: String },
      publicId: { type: String },
    },
    gallery: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    pageTheme: {
      type: String,
      enum: ["theme1", "theme2", "theme3", "theme4"],
      default: "theme1",
    },
    heroImagePosition: {
      type: String,
      enum: ["left", "right", "center"],
      default: "right",
    },
    contentSections: {
      type: [
        {
          heading: { type: String, trim: true, default: "" },
          body: { type: String, trim: true, default: "" },
          bullets: [{ type: String, trim: true }],
          layout: {
            type: String,
            enum: ["textOnly", "imageLeft", "imageRight", "imageCenter"],
            default: "textOnly",
          },
          image: {
            url: { type: String },
            publicId: { type: String },
          },
        },
      ],
      default: [],
    },
    textGridColumns: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: 2,
    },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
