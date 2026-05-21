const Terms = require("../models/Terms");

// Get latest Terms
const getTerms = async (req, res) => {
  try {
    const terms = await Terms.find();
    if (!terms) {
      return res.status(400).json({
        success: false,
        message: "No Terms & condition found",
      });
    }
    res.status(200).json({
      success: true,
      terms,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Save or Update Terms
const saveTerms = async (req, res) => {
  const { content } = req.body;
  try {
    let terms = await Terms.findOne();
  
    if (terms) {
      terms.content = content;
      terms.lastUpdated = new Date();
      await terms.save();
    } else {
      terms = await Terms.create({ content });
    }
    res.status(200).json({
      success: true,
      message: "Terms saved",
      terms,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ 
      success: false,
      message: "Server error"
    });
  }
};

module.exports = {
  getTerms,
  saveTerms,
};
