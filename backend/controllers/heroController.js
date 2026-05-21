const Hero = require("../models/Hero");
const cloudinary = require("../config/cloudinary");
const getDataUri = require("../config/dataUri");

const DEFAULT_SLIDES = [
  {
    title: "Systems That Work.",
    highlight: "Expertise That Lasts.",
    description:
      "Leading MEP consultancy delivering innovative engineering solutions across INDIA and beyond since 2014.",
    image: {
      url: "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1200",
      publicId: "",
    },
    theme: "from-teal-900 via-teal-800 to-teal-700",
    layout: "layout1",
    statTiles: [
      { icon: "Calendar", label: "Established", value: "2014" },
      { icon: "MapPin", label: "HQ", value: "Delhi NCR" },
      { icon: "Award", label: "Specialty", value: "MEP Experts" },
    ],
    ctaLabel: "Contact Us",
    ctaHref: "#contact",
    topBadge: "",
    statValue: "",
    statLabel: "",
    features: [],
    cta2Label: "",
    cta2Href: "#projects",
  },
  {
    title: "Future-Ready Designs.",
    highlight: "Sustainable MEP Solutions.",
    description:
      "We specialize in green building designs and energy-efficient systems for modern infrastructure.",
    image: {
      url: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200",
      publicId: "",
    },
    theme: "from-slate-900 via-blue-900 to-teal-900",
    layout: "layout2",
    statTiles: [],
    ctaLabel: "Explore Our Work",
    ctaHref: "#projects",
    topBadge: "Innovation in Engineering",
    statValue: "500+",
    statLabel: "Projects Completed",
    features: [
      { icon: "ShieldCheck", text: "Quality Assured Standards" },
      { icon: "Globe", text: "Pan India Presence" },
    ],
    cta2Label: "",
    cta2Href: "",
  },
];

function normalizeSlides(input) {
  if (!Array.isArray(input) || input.length === 0) {
    return JSON.parse(JSON.stringify(DEFAULT_SLIDES));
  }
  return input.slice(0, 6).map((s, i) => {
    const def = DEFAULT_SLIDES[i] || DEFAULT_SLIDES[0];
    const statTiles = Array.isArray(s.statTiles)
      ? s.statTiles.map((t) => ({
          icon: String(t.icon || "Calendar"),
          label: String(t.label || ""),
          value: String(t.value || ""),
        }))
      : JSON.parse(JSON.stringify(def.statTiles || []));
    const features = Array.isArray(s.features)
      ? s.features.map((f) => ({
          icon: String(f.icon || "ShieldCheck"),
          text: String(f.text || ""),
        }))
      : JSON.parse(JSON.stringify(def.features || []));

    const allowedLayouts = ["layout1", "layout2", "layout3", "layout4"];
    const layout = allowedLayouts.includes(s.layout) ? s.layout : "layout1";

    return {
      title: s.title != null ? String(s.title) : def.title,
      highlight: s.highlight != null ? String(s.highlight) : def.highlight,
      description: s.description != null ? String(s.description) : def.description,
      image: {
        url: s.image?.url != null ? String(s.image.url) : def.image.url,
        publicId: s.image?.publicId != null ? String(s.image.publicId) : def.image.publicId || "",
      },
      theme: s.theme != null && String(s.theme).trim() ? String(s.theme).trim() : def.theme,
      layout,
      statTiles,
      ctaLabel: s.ctaLabel != null ? String(s.ctaLabel) : def.ctaLabel,
      ctaHref: s.ctaHref != null ? String(s.ctaHref) : def.ctaHref,
      topBadge: s.topBadge != null ? String(s.topBadge) : def.topBadge,
      statValue: s.statValue != null ? String(s.statValue) : def.statValue,
      statLabel: s.statLabel != null ? String(s.statLabel) : def.statLabel,
      features,
      cta2Label: s.cta2Label != null ? String(s.cta2Label) : def.cta2Label,
      cta2Href: s.cta2Href != null ? String(s.cta2Href) : def.cta2Href,
    };
  });
}

exports.getHero = async (req, res) => {
  try {
    let doc = await Hero.findOne();
    if (!doc) {
      doc = await Hero.create({
        slides: JSON.parse(JSON.stringify(DEFAULT_SLIDES)),
        autoRotateMs: 5000,
      });
    }
    res.json({ success: true, hero: doc });
  } catch (error) {
    console.error("getHero", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

exports.updateHero = async (req, res) => {
  try {
    let slidesPayload;
    try {
      const raw = req.body.slides;
      slidesPayload = typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: "Invalid slides JSON",
      });
    }

    let slides = normalizeSlides(slidesPayload);
    const autoRotateMs = Math.min(
      120000,
      Math.max(2000, parseInt(req.body.autoRotateMs, 10) || 5000)
    );

    const existing = await Hero.findOne();

    const uploadBuffer = async (file) => {
      const fileUri = getDataUri(file);
      const uploaded = await cloudinary.uploader.upload(fileUri.content, {
        folder: "sophic/hero",
      });
      return { url: uploaded.secure_url, publicId: uploaded.public_id };
    };

    for (let i = 0; i < slides.length; i++) {
      const field = `slide${i}`;
      const fileArr = req.files && req.files[field];
      const file = fileArr && fileArr[0];
      if (file) {
        const oldPid = existing?.slides?.[i]?.image?.publicId;
        if (oldPid) {
          try {
            await cloudinary.uploader.destroy(oldPid);
          } catch (_) {}
        }
        const { url, publicId } = await uploadBuffer(file);
        slides[i].image = { url, publicId };
      } else if (
        existing?.slides?.[i]?.image?.url &&
        (!slides[i].image?.url || String(slides[i].image.url).trim() === "")
      ) {
        slides[i].image = { ...existing.slides[i].image };
      }
    }

    let doc;
    if (existing) {
      existing.slides = slides;
      existing.autoRotateMs = autoRotateMs;
      doc = await existing.save();
    } else {
      doc = await Hero.create({ slides, autoRotateMs });
    }

    res.json({ success: true, message: "Hero updated", hero: doc });
  } catch (error) {
    console.error("updateHero", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
