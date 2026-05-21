const mongoose = require("mongoose");

const logoSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: 'active'
  },
  uploadedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Logo", logoSchema);
