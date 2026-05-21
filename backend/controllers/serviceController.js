const Service = require("../models/Service");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");
const getDataUri = require("../config/dataUri");

const normalizeSlug = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

/** Slugs that break routing, SEO, or are commonly mistaken (e.g. "done" from test data). */
const RESERVED_SLUGS = new Set([
  "id",
  "slug",
  "new",
  "create",
  "edit",
  "admin",
  "api",
  "done",
  "test",
  "null",
  "undefined",
  "services",
  "settings",
  "static",
  "assets",
  "health",
]);

function assertSlugAllowed(slug) {
  if (!slug || String(slug).length < 2) {
    throw new Error("Slug must be at least 2 characters");
  }
  if (String(slug).length > 120) {
    throw new Error("Slug is too long (max 120 characters)");
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Slug may only use lowercase letters, numbers, and single hyphens between words");
  }
  if (RESERVED_SLUGS.has(slug)) {
    throw new Error(
      'This URL slug is reserved or too generic (e.g. "done"). Use a clear name like fire-protection-life-safety.'
    );
  }
}

const parseDetails = (details) => {
  if (!details) return [];
  if (Array.isArray(details)) return details.filter(Boolean);
  if (typeof details === "string") {
    try {
      const parsed = JSON.parse(details);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch {
      return details
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }
  return [];
};

const parseJsonArray = (raw) => {
  if (raw === undefined || raw === null || raw === "") return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};

const parseContentSectionTemplates = (raw) => {
  const arr = parseJsonArray(raw);
  return arr.map((item) => ({
    heading: typeof item.heading === "string" ? item.heading.trim() : "",
    body: typeof item.body === "string" ? item.body.trim() : "",
    bullets: Array.isArray(item.bullets)
      ? item.bullets.map((b) => String(b || "").trim()).filter(Boolean)
      : [],
    layout: ["textOnly", "imageLeft", "imageRight", "imageCenter"].includes(item.layout)
      ? item.layout
      : "textOnly",
    imagePublicId:
      item.imagePublicId && typeof item.imagePublicId === "string" ? item.imagePublicId : null,
    removeImage: item.removeImage === true || item.removeImage === "true",
  }));
};

const getGalleryFiles = (req) => {
  if (Array.isArray(req.files)) return req.files;
  if (req.files && Array.isArray(req.files.files)) return req.files.files;
  return [];
};

const getSectionImageFiles = (req) =>
  req.files && Array.isArray(req.files.sectionImages) ? req.files.sectionImages : [];

const uploadBufferToCloudinary = async (file) => {
  const fileUri = getDataUri(file);
  const uploaded = await cloudinary.uploader.upload(fileUri.content);
  return { url: uploaded.secure_url, publicId: uploaded.public_id };
};

const buildContentSections = async (templates, sectionFiles, sectionImageIndices) => {
  const sections = templates.map((t) => ({
    heading: t.heading,
    body: t.body,
    bullets: t.bullets,
    layout: t.layout,
    image: undefined,
  }));

  const indices = parseJsonArray(sectionImageIndices).map((n) =>
    Number.isFinite(Number(n)) ? Number(n) : -1
  );

  if (sectionFiles.length && indices.length !== sectionFiles.length) {
    throw new Error("sectionImages and sectionImageIndices length mismatch");
  }

  for (let i = 0; i < sectionFiles.length; i++) {
    const idx = indices[i];
    if (idx < 0 || idx >= sections.length) continue;
    const uploaded = await uploadBufferToCloudinary(sectionFiles[i]);
    sections[idx].image = { url: uploaded.url, publicId: uploaded.publicId };
  }

  for (let i = 0; i < templates.length; i++) {
    const t = templates[i];
    const hadNewUpload = sections[i].image && sections[i].image.publicId;
    if (hadNewUpload) continue;
    if (t.removeImage) {
      sections[i].image = undefined;
      continue;
    }
    if (t.imagePublicId) {
      sections[i].image = { publicId: t.imagePublicId, url: "" };
    }
  }

  return sections.map((s) => {
    const out = {
      heading: s.heading,
      body: s.body,
      bullets: s.bullets,
      layout: s.layout,
    };
    if (s.image?.publicId && s.image?.url) {
      out.image = { url: s.image.url, publicId: s.image.publicId };
    } else if (s.image?.publicId && !s.image?.url) {
      out.image = { publicId: s.image.publicId, url: "" };
    }
    return out;
  });
};

/** After merge, fill url for kept section images from previous doc or gallery */
const hydrateSectionImageUrls = (sections, prevSections, gallery) => {
  const urlByPublicId = new Map();
  (gallery || []).forEach((img) => {
    if (img?.publicId) urlByPublicId.set(img.publicId, img.url);
  });
  (prevSections || []).forEach((s) => {
    if (s?.image?.publicId && s.image.url) {
      urlByPublicId.set(s.image.publicId, s.image.url);
    }
  });

  return sections.map((s) => {
    if (!s.image?.publicId) return { ...s, image: undefined };
    const url = s.image.url || urlByPublicId.get(s.image.publicId) || "";
    if (!url) return { ...s, image: undefined };
    return { ...s, image: { url, publicId: s.image.publicId } };
  });
};

const collectSectionImagePublicIds = (sections) =>
  (sections || []).map((s) => s.image?.publicId).filter(Boolean);

exports.getServices = async (req, res) => {
  try {
    const query = req.query.includeInactive === "true" ? {} : { isActive: true };
    const services = await Service.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

exports.getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/** Public: load by MongoDB _id — site URLs use /services/id/:id */
exports.getServiceByIdPublic = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid service id" });
    }
    const service = await Service.findOne({ _id: id, isActive: true });
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const {
      title,
      slug,
      shortDescription,
      longDescription,
      details,
      order,
      isActive,
      pageTheme,
      heroImagePosition,
      textGridColumns,
      contentSections: contentSectionsRaw,
      sectionImageIndices,
    } = req.body;
    if (!title || !shortDescription) {
      return res
        .status(400)
        .json({ success: false, message: "Title and shortDescription are required" });
    }

    const finalSlug = normalizeSlug(slug || title);
    try {
      assertSlugAllowed(finalSlug);
    } catch (e) {
      return res.status(400).json({ success: false, message: e.message });
    }
    const exists = await Service.findOne({ slug: finalSlug });
    if (exists) {
      return res.status(409).json({ success: false, message: "Service slug already exists" });
    }

    let image = null;
    let gallery = [];
    const files = getGalleryFiles(req);
    if (files.length) {
      const uploadedImages = await Promise.all(files.map((file) => uploadBufferToCloudinary(file)));
      image = uploadedImages[0];
      gallery = uploadedImages;
    }

    const templates = parseContentSectionTemplates(contentSectionsRaw);
    const sectionFiles = getSectionImageFiles(req);
    let contentSections = [];
    try {
      contentSections = await buildContentSections(templates, sectionFiles, sectionImageIndices);
    } catch (e) {
      return res.status(400).json({ success: false, message: e.message });
    }
    contentSections = hydrateSectionImageUrls(contentSections, [], gallery);

    const service = await Service.create({
      title,
      slug: finalSlug,
      shortDescription,
      longDescription,
      details: parseDetails(details),
      image,
      gallery,
      pageTheme: pageTheme || "theme1",
      heroImagePosition: ["left", "right", "center"].includes(heroImagePosition)
        ? heroImagePosition
        : "right",
      textGridColumns: Number(textGridColumns) || 2,
      contentSections,
      order: Number.isNaN(Number(order)) ? 0 : Number(order),
      isActive: isActive === undefined ? true : String(isActive) === "true",
    });

    res.status(201).json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const prevSectionImages = collectSectionImagePublicIds(service.contentSections);

    const {
      title,
      slug,
      shortDescription,
      longDescription,
      details,
      order,
      isActive,
      pageTheme,
      heroImagePosition,
      textGridColumns,
      keepGallery = [],
      contentSections: contentSectionsRaw,
      sectionImageIndices,
    } = req.body;

    if (title !== undefined) service.title = title;
    if (shortDescription !== undefined) service.shortDescription = shortDescription;
    if (longDescription !== undefined) service.longDescription = longDescription;
    if (details !== undefined) service.details = parseDetails(details);
    if (order !== undefined) service.order = Number.isNaN(Number(order)) ? service.order : Number(order);
    if (isActive !== undefined) service.isActive = String(isActive) === "true";
    if (pageTheme !== undefined) service.pageTheme = pageTheme;
    if (heroImagePosition !== undefined) {
      service.heroImagePosition = ["left", "right", "center"].includes(heroImagePosition)
        ? heroImagePosition
        : service.heroImagePosition;
    }
    if (textGridColumns !== undefined)
      service.textGridColumns = Number(textGridColumns) || service.textGridColumns;

    if (slug !== undefined || title !== undefined) {
      const nextSlug = normalizeSlug(slug || title || service.title);
      try {
        assertSlugAllowed(nextSlug);
      } catch (e) {
        return res.status(400).json({ success: false, message: e.message });
      }
      const conflict = await Service.findOne({ slug: nextSlug, _id: { $ne: service._id } });
      if (conflict) {
        return res.status(409).json({ success: false, message: "Service slug already exists" });
      }
      service.slug = nextSlug;
    }

    let keepGalleryArray = [];
    if (typeof keepGallery === "string") {
      try {
        keepGalleryArray = JSON.parse(keepGallery);
      } catch {
        keepGalleryArray = keepGallery.split(",").map((id) => id.trim());
      }
    } else if (Array.isArray(keepGallery)) {
      keepGalleryArray = keepGallery;
    }

    const imagesToDelete = (service.gallery || []).filter(
      (img) => !keepGalleryArray.includes(img.publicId)
    );
    await Promise.all(imagesToDelete.map((img) => cloudinary.uploader.destroy(img.publicId)));

    service.gallery = (service.gallery || []).filter((img) => keepGalleryArray.includes(img.publicId));

    const galleryFiles = getGalleryFiles(req);
    if (galleryFiles.length) {
      const uploadedImages = await Promise.all(
        galleryFiles.map((file) => uploadBufferToCloudinary(file))
      );
      service.gallery.push(...uploadedImages);
    }

    service.image = service.gallery[0] || null;

    if (contentSectionsRaw !== undefined) {
      const templates = parseContentSectionTemplates(contentSectionsRaw);
      const sectionFiles = getSectionImageFiles(req);
      let contentSections = [];
      try {
        contentSections = await buildContentSections(templates, sectionFiles, sectionImageIndices);
      } catch (e) {
        return res.status(400).json({ success: false, message: e.message });
      }
      contentSections = hydrateSectionImageUrls(
        contentSections,
        service.contentSections,
        service.gallery
      );

      const nextIds = collectSectionImagePublicIds(contentSections);
      const toRemove = prevSectionImages.filter((id) => !nextIds.includes(id));
      await Promise.all(toRemove.map((id) => cloudinary.uploader.destroy(id)));

      service.contentSections = contentSections;
    }

    await service.save();
    res.json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const ids = new Set([
      ...(service.gallery || []).map((img) => img.publicId),
      ...collectSectionImagePublicIds(service.contentSections),
      service.image?.publicId,
    ]);
    await Promise.all([...ids].filter(Boolean).map((id) => cloudinary.uploader.destroy(id)));

    res.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
