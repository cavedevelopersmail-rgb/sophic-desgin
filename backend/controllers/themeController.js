const Theme = require("../models/Theme");

const defaultThemes = [
  {
    name: "Default Teal",
    key: "default-teal",
    isActive: true,
    config: {
      primaryColor: "#0f766e",
      secondaryColor: "#00353E",
      accentColor: "#9ACD32",
      backgroundColor: "#ffffff",
      textColor: "#111827",
      fontFamily: "Inter, sans-serif",
    },
  },
  {
    name: "Royal Blue",
    key: "royal-blue",
    isActive: false,
    config: {
      primaryColor: "#1d4ed8",
      secondaryColor: "#1e3a8a",
      accentColor: "#22c55e",
      backgroundColor: "#f8fafc",
      textColor: "#0f172a",
      fontFamily: "Inter, sans-serif",
    },
  },
];

exports.seedThemesIfEmpty = async () => {
  const count = await Theme.countDocuments();
  if (count === 0) {
    await Theme.insertMany(defaultThemes);
  }
};

exports.getThemes = async (_req, res) => {
  try {
    const themes = await Theme.find().sort({ createdAt: 1 });
    res.json({ success: true, themes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

exports.getActiveTheme = async (_req, res) => {
  try {
    const theme = await Theme.findOne({ isActive: true });
    if (!theme) {
      return res.status(404).json({ success: false, message: "No active theme found" });
    }
    res.json({ success: true, theme });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

exports.createTheme = async (req, res) => {
  try {
    const { name, key, config } = req.body;
    if (!name || !key) {
      return res.status(400).json({ success: false, message: "Name and key are required" });
    }

    const existing = await Theme.findOne({ key: key.trim().toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: "Theme key already exists" });
    }

    const theme = await Theme.create({
      name: name.trim(),
      key: key.trim().toLowerCase(),
      isActive: false,
      config,
    });

    res.status(201).json({ success: true, theme });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

exports.activateTheme = async (req, res) => {
  try {
    const { id } = req.params;
    const theme = await Theme.findById(id);
    if (!theme) {
      return res.status(404).json({ success: false, message: "Theme not found" });
    }

    await Theme.updateMany({}, { $set: { isActive: false } });
    theme.isActive = true;
    await theme.save();

    res.json({ success: true, theme, message: "Theme activated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
