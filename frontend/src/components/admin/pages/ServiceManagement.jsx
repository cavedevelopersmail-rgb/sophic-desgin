import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  Eye,
  GripVertical,
  ImagePlus,
  ListPlus,
  Plus,
  Edit,
  Trash2,
  X,
  Layers,
  List,
  ExternalLink,
  Wand2,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const ACCENT = "#00353E";

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

function slugifyFromTitle(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function validateSlugClient(slug) {
  const s = String(slug || "").trim();
  if (s.length < 2) return "Slug must be at least 2 characters (or fix the title).";
  if (s.length > 120) return "Slug is too long (max 120 characters).";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s)) {
    return "Slug may only use lowercase letters, numbers, and single hyphens.";
  }
  if (RESERVED_SLUGS.has(s)) {
    return `The slug "${s}" is reserved. Use something descriptive (e.g. xyz-service → rename the service title).`;
  }
  return null;
}

const defaultMetaForm = {
  title: "",
  slug: "",
  shortDescription: "",
  longDescription: "",
  detailsText: "",
  order: 0,
  isActive: true,
  pageTheme: "theme1",
  heroImagePosition: "right",
  textGridColumns: 2,
  images: [],
};

const themeSurfaceClass = {
  theme1: "bg-white",
  theme2: "bg-slate-50",
  theme3: "bg-teal-50",
  theme4: "bg-zinc-100",
};

const textGridClass = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

const layoutOptions = [
  { value: "textOnly", label: "Text only", icon: List },
  { value: "imageLeft", label: "Image left", icon: AlignLeft },
  { value: "imageRight", label: "Image right", icon: AlignRight },
  { value: "imageCenter", label: "Image center • text below", icon: AlignCenter },
];

const newLocalId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `s-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const emptySection = () => ({
  localId: newLocalId(),
  heading: "",
  body: "",
  bullets: [],
  layout: "imageLeft",
  imagePublicId: null,
  file: null,
  previewUrl: null,
  removeImage: false,
});

function sectionFromServer(s) {
  return {
    localId: newLocalId(),
    heading: s.heading || "",
    body: s.body || "",
    bullets: Array.isArray(s.bullets) ? [...s.bullets] : [],
    layout: layoutOptions.some((o) => o.value === s.layout) ? s.layout : "textOnly",
    imagePublicId: s.image?.publicId || null,
    file: null,
    previewUrl: s.image?.url || null,
    removeImage: false,
  };
}

const ServiceManagement = () => {
  const { getServices, createService, updateService, deleteService } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [meta, setMeta] = useState(defaultMetaForm);
  const [contentSections, setContentSections] = useState([]);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [previewOpen, setPreviewOpen] = useState(true);
  const [activeSectionTab, setActiveSectionTab] = useState(0);

  const fetchServices = async () => {
    try {
      const response = await getServices(true);
      setServices(response.data?.services || []);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setMeta(defaultMetaForm);
    setContentSections([]);
    setActiveSectionTab(0);
    setIsModalOpen(true);
  };

  const openEdit = (service) => {
    setEditing(service);
    setMeta({
      title: service.title || "",
      slug: service.slug || "",
      shortDescription: service.shortDescription || "",
      longDescription: service.longDescription || "",
      detailsText: (service.details || []).join("\n"),
      order: service.order || 0,
      isActive: service.isActive,
      pageTheme: service.pageTheme || "theme1",
      heroImagePosition: service.heroImagePosition || "right",
      textGridColumns: service.textGridColumns || 2,
      images: [],
    });
    const raw = service.contentSections;
    setContentSections(Array.isArray(raw) && raw.length ? raw.map(sectionFromServer) : []);
    setActiveSectionTab(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    setMeta(defaultMetaForm);
    setContentSections([]);
    setPreviewOpen(true);
    setActiveSectionTab(0);
  };

  const addSection = () => {
    setContentSections((prev) => {
      const next = [...prev, emptySection()];
      setActiveSectionTab(next.length - 1);
      return next;
    });
  };

  const removeSection = (idx) => {
    setContentSections((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      setActiveSectionTab((t) => (next.length ? Math.min(t, next.length - 1) : 0));
      return next;
    });
  };

  const moveSection = (idx, dir) => {
    setContentSections((prev) => {
      const j = idx + dir;
      if (j < 0 || j >= prev.length) return prev;
      const copy = [...prev];
      [copy[idx], copy[j]] = [copy[j], copy[idx]];
      setActiveSectionTab(j);
      return copy;
    });
  };

  const updateSection = useCallback((idx, patch) => {
    setContentSections((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], ...patch };
      return copy;
    });
  }, []);

  const addBullet = (idx) => {
    setContentSections((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], bullets: [...copy[idx].bullets, ""] };
      return copy;
    });
  };

  const setBullet = (sIdx, bIdx, value) => {
    setContentSections((prev) => {
      const copy = [...prev];
      const bullets = [...copy[sIdx].bullets];
      bullets[bIdx] = value;
      copy[sIdx] = { ...copy[sIdx], bullets };
      return copy;
    });
  };

  const removeBullet = (sIdx, bIdx) => {
    setContentSections((prev) => {
      const copy = [...prev];
      copy[sIdx] = {
        ...copy[sIdx],
        bullets: copy[sIdx].bullets.filter((_, i) => i !== bIdx),
      };
      return copy;
    });
  };

  const handleSectionImage = (idx, fileList) => {
    const file = fileList?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setContentSections((prev) => {
      const copy = [...prev];
      const prevUrl = copy[idx].previewUrl;
      if (prevUrl && prevUrl.startsWith("blob:")) URL.revokeObjectURL(prevUrl);
      copy[idx] = {
        ...copy[idx],
        file,
        previewUrl: url,
        removeImage: false,
        imagePublicId: null,
      };
      return copy;
    });
  };

  const clearSectionImage = (idx) => {
    setContentSections((prev) => {
      const copy = [...prev];
      const prevUrl = copy[idx].previewUrl;
      if (prevUrl && prevUrl.startsWith("blob:")) URL.revokeObjectURL(prevUrl);
      copy[idx] = {
        ...copy[idx],
        file: null,
        previewUrl: null,
        imagePublicId: null,
        removeImage: true,
      };
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const proposedSlug = slugifyFromTitle(meta.slug || meta.title);
    const slugErr = validateSlugClient(proposedSlug);
    if (slugErr) {
      alert(slugErr);
      return;
    }
    setSaving(true);
    try {
      const templates = contentSections.map((s) => ({
        heading: s.heading,
        body: s.body,
        bullets: s.bullets.map((b) => b.trim()).filter(Boolean),
        layout: s.layout,
        imagePublicId: s.file ? null : s.removeImage ? null : s.imagePublicId || null,
        removeImage: Boolean(s.removeImage) && !s.file,
      }));

      const sectionImageIndices = [];
      contentSections.forEach((s, idx) => {
        if (s.file) sectionImageIndices.push(idx);
      });

      const payload = new FormData();
      payload.append("title", meta.title);
      payload.append("slug", meta.slug);
      payload.append("shortDescription", meta.shortDescription);
      payload.append("longDescription", meta.longDescription);
      payload.append("details", meta.detailsText);
      payload.append("order", String(meta.order));
      payload.append("isActive", String(meta.isActive));
      payload.append("pageTheme", meta.pageTheme);
      payload.append("heroImagePosition", meta.heroImagePosition);
      payload.append("textGridColumns", String(meta.textGridColumns));
      payload.append("contentSections", JSON.stringify(templates));
      payload.append("sectionImageIndices", JSON.stringify(sectionImageIndices));

      meta.images.forEach((image) => payload.append("files", image));
      contentSections.forEach((s) => {
        if (s.file) payload.append("sectionImages", s.file);
      });

      if (editing?.gallery?.length) {
        payload.append(
          "keepGallery",
          JSON.stringify(editing.gallery.map((img) => img.publicId))
        );
      }

      if (editing?._id) {
        await updateService(editing._id, payload);
      } else {
        await createService(payload);
      }

      await fetchServices();
      closeModal();
    } catch (error) {
      console.error("Failed to save service:", error);
      alert("Could not save service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await deleteService(id);
      await fetchServices();
    } catch (error) {
      console.error("Failed to delete service:", error);
      alert("Could not delete service");
    }
  };

  const previewDetails = useMemo(
    () =>
      meta.detailsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    [meta.detailsText]
  );

  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return services;
    return services.filter(
      (service) =>
        service.title?.toLowerCase().includes(q) ||
        service.slug?.toLowerCase().includes(q) ||
        service.shortDescription?.toLowerCase().includes(q)
    );
  }, [services, query]);

  const activeSection = contentSections[activeSectionTab];

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[40vh] text-slate-600">
        Loading services…
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gradient-to-b from-slate-100 via-slate-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 rounded-2xl text-white p-6 shadow-lg" style={{ backgroundColor: ACCENT }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Service Management</h1>
              <p className="text-sm text-teal-100/95 mt-1 max-w-xl">
                Build rich service pages with sections, side-by-side layouts, centered imagery, and
                bullet lists — with a live preview.
              </p>
            </div>
            <button
              type="button"
              onClick={openCreate}
              className="bg-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-sm hover:bg-slate-50 transition shrink-0"
              style={{ color: ACCENT }}
            >
              <Plus size={18} />
              New service
            </button>
          </div>
          <div className="mt-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full md:w-96 px-4 py-2.5 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/40"
              placeholder="Search by title, slug, description…"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md hover:-translate-y-0.5 transition duration-200 overflow-hidden"
            >
              {service.image?.url ? (
                <img
                  src={service.image.url}
                  alt={service.title}
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="h-44 flex items-center justify-center text-slate-400 bg-slate-100 text-sm">
                  No hero image
                </div>
              )}
              <div className="p-5">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="font-semibold text-lg text-slate-900 leading-snug">{service.title}</h2>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${
                      service.isActive
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-600 mb-0.5 break-all">
                  /services/id/{String(service._id)}
                </p>
                <p className="text-sm text-slate-500 mb-2">slug: /{service.slug}</p>
                <p className="text-xs text-slate-500 mb-3">
                  {(service.contentSections || []).length} content section
                  {(service.contentSections || []).length !== 1 ? "s" : ""} · Theme {service.pageTheme}
                </p>
                <p className="text-sm text-slate-700 line-clamp-3">{service.shortDescription}</p>
                <div className="flex flex-wrap justify-end gap-2 mt-4">
                  <a
                    href={`/services/id/${service._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                  >
                    <ExternalLink size={14} />
                    Open page
                  </a>
                  <button
                    type="button"
                    onClick={() => openEdit(service)}
                    className="p-2.5 text-blue-700 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
                    aria-label="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(service._id)}
                    className="p-2.5 text-red-700 bg-red-50 rounded-xl hover:bg-red-100 transition"
                    aria-label="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredServices.length === 0 ? (
          <div className="mt-10 text-center text-slate-500">No services found.</div>
        ) : null}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px] z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white sm:rounded-2xl rounded-t-2xl w-full max-w-6xl max-h-[100dvh] sm:max-h-[94vh] overflow-hidden shadow-2xl border border-slate-200/80 flex flex-col">
            <div
              className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-slate-200 shrink-0"
              style={{ background: `linear-gradient(105deg, ${ACCENT} 0%, #0a5c6b 100%)` }}
            >
              <div className="flex items-center gap-2 text-white min-w-0">
                <Layers className="shrink-0 opacity-90" size={22} />
                <h3 className="text-lg sm:text-xl font-semibold truncate">
                  {editing ? "Edit service" : "Create service"}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 rounded-lg text-white/90 hover:bg-white/10 transition shrink-0"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 flex-1 min-h-0 overflow-hidden">
              <div className="overflow-y-auto p-4 sm:p-6 border-b xl:border-b-0 xl:border-r border-slate-200 bg-white">
                <form onSubmit={handleSubmit} className="space-y-5" id="service-editor-form">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Title
                      </label>
                      <input
                        className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#00353E]/20 focus:border-[#00353E]/40 outline-none transition"
                        placeholder="Service title"
                        value={meta.title}
                        onChange={(e) => setMeta((p) => ({ ...p, title: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        URL slug (readable backup link)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <input
                          className="flex-1 min-w-[12rem] border border-slate-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#00353E]/20 outline-none"
                          placeholder="e.g. fire-protection-life-safety"
                          value={meta.slug}
                          onChange={(e) => setMeta((p) => ({ ...p, slug: e.target.value }))}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setMeta((p) => ({ ...p, slug: slugifyFromTitle(p.title) }))
                          }
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 shrink-0"
                        >
                          <Wand2 size={16} />
                          From title
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Public pages use{" "}
                        <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">
                          /services/id/&lt;MongoDB id&gt;
                        </code>{" "}
                        so links stay stable. Slug must not be generic words like{" "}
                        <code className="text-[11px]">done</code> — use a descriptive segment.
                      </p>
                      {editing?._id ? (
                        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs space-y-1.5">
                          <p className="font-semibold text-slate-700">Public URLs</p>
                          <p className="font-mono break-all text-slate-700">
                            <span className="text-slate-500 font-sans">Stable: </span>
                            /services/id/{String(editing._id)}
                          </p>
                          <p className="font-mono break-all text-slate-600">
                            <span className="text-slate-500 font-sans">Slug: </span>/
                            {(meta.slug || editing.slug || "").trim() || "—"}
                          </p>
                          <a
                            href={`/services/id/${editing._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-teal-700 font-medium hover:underline"
                          >
                            <ExternalLink size={14} />
                            Preview live page
                          </a>
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Sort order
                      </label>
                      <input
                        type="number"
                        className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none"
                        value={meta.order}
                        onChange={(e) =>
                          setMeta((p) => ({ ...p, order: Number(e.target.value || 0) }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Short description
                    </label>
                    <textarea
                      className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#00353E]/20 outline-none resize-y min-h-[80px]"
                      rows={3}
                      placeholder="Card & intro summary"
                      value={meta.shortDescription}
                      onChange={(e) =>
                        setMeta((p) => ({ ...p, shortDescription: e.target.value }))
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Long description (hero area)
                    </label>
                    <textarea
                      className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#00353E]/20 outline-none resize-y min-h-[96px]"
                      rows={4}
                      placeholder="Main paragraph under the title…"
                      value={meta.longDescription}
                      onChange={(e) =>
                        setMeta((p) => ({ ...p, longDescription: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Quick feature lines (optional)
                    </label>
                    <textarea
                      className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none font-mono text-sm"
                      rows={4}
                      placeholder={"One highlight per line (legacy grid under hero)"}
                      value={meta.detailsText}
                      onChange={(e) => setMeta((p) => ({ ...p, detailsText: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Page theme
                      </label>
                      <select
                        className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2.5 bg-white"
                        value={meta.pageTheme}
                        onChange={(e) => setMeta((p) => ({ ...p, pageTheme: e.target.value }))}
                      >
                        <option value="theme1">Classic white</option>
                        <option value="theme2">Soft slate</option>
                        <option value="theme3">Premium teal</option>
                        <option value="theme4">Neutral minimal</option>
                      </select>
                    </div>
                    <label className="flex items-center gap-2 mt-6 sm:mt-8 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={meta.isActive}
                        onChange={(e) => setMeta((p) => ({ ...p, isActive: e.target.checked }))}
                        className="rounded border-slate-300"
                      />
                      <span className="text-sm text-slate-700">Published (active)</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Hero image
                      </label>
                      <select
                        className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2.5 bg-white"
                        value={meta.heroImagePosition}
                        onChange={(e) =>
                          setMeta((p) => ({ ...p, heroImagePosition: e.target.value }))
                        }
                      >
                        <option value="left">Beside text · image left</option>
                        <option value="right">Beside text · image right</option>
                        <option value="center">Center · image above text</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Feature grid columns
                      </label>
                      <select
                        className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2.5 bg-white"
                        value={meta.textGridColumns}
                        onChange={(e) =>
                          setMeta((p) => ({ ...p, textGridColumns: Number(e.target.value) }))
                        }
                      >
                        <option value={1}>1 column</option>
                        <option value={2}>2 columns</option>
                        <option value={3}>3 columns</option>
                        <option value={4}>4 columns</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Hero & gallery images
                    </label>
                    <label className="mt-1.5 flex flex-col sm:flex-row sm:items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-4 cursor-pointer hover:bg-slate-50/80 transition">
                      <ImagePlus className="text-slate-400 mx-auto sm:mx-0" size={22} />
                      <span className="text-sm text-slate-600 text-center">
                        Upload gallery ({meta.images.length} new) · first image = hero
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) =>
                          setMeta((p) => ({
                            ...p,
                            images: Array.from(e.target.files || []),
                          }))
                        }
                      />
                    </label>
                    {editing?.gallery?.length ? (
                      <p className="text-xs text-slate-500 mt-1.5">
                        Existing gallery: {editing.gallery.length} image(s) — add files to append.
                      </p>
                    ) : null}
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                        <Layers size={18} className="text-[#00353E]" />
                        Content sections
                      </p>
                      <button
                        type="button"
                        onClick={addSection}
                        className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-xl text-white shadow-sm hover:opacity-95 transition"
                        style={{ backgroundColor: ACCENT }}
                      >
                        <Plus size={16} />
                        Add section
                      </button>
                    </div>

                    <div className="flex gap-1 flex-wrap border-b border-slate-200/80 pb-2 min-h-[40px] items-center">
                      {contentSections.length === 0 ? (
                        <span className="text-xs text-slate-500 italic px-1">
                          No sections yet — use “Add section”
                        </span>
                      ) : (
                        contentSections.map((s, idx) => (
                          <button
                            key={s.localId}
                            type="button"
                            onClick={() => setActiveSectionTab(idx)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                              activeSectionTab === idx
                                ? "text-white shadow"
                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                            }`}
                            style={
                              activeSectionTab === idx
                                ? { backgroundColor: ACCENT }
                                : undefined
                            }
                          >
                            {s.heading?.trim() || `Section ${idx + 1}`}
                          </button>
                        ))
                      )}
                    </div>

                    {activeSection ? (
                      <div className="space-y-4 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                        <div className="flex flex-wrap items-center gap-2 justify-between">
                          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                            <GripVertical size={14} className="text-slate-400" />
                            Section {activeSectionTab + 1} editor
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => moveSection(activeSectionTab, -1)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-40"
                              disabled={activeSectionTab === 0}
                              aria-label="Move up"
                            >
                              <ArrowUp size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveSection(activeSectionTab, 1)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-40"
                              disabled={activeSectionTab === contentSections.length - 1}
                              aria-label="Move down"
                            >
                              <ArrowDown size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeSection(activeSectionTab)}
                              className="p-1.5 rounded-lg border border-red-100 text-red-600 hover:bg-red-50 ml-1"
                              aria-label="Remove section"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-500">Heading</label>
                          <input
                            className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 outline-none"
                            placeholder="Section heading"
                            value={activeSection.heading}
                            onChange={(e) =>
                              updateSection(activeSectionTab, { heading: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-500">
                            Body copy
                          </label>
                          <textarea
                            className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none resize-y min-h-[100px] text-slate-800 leading-relaxed"
                            placeholder="Write paragraphs for this section…"
                            value={activeSection.body}
                            onChange={(e) =>
                              updateSection(activeSectionTab, { body: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-500 flex items-center justify-between gap-2">
                            <span>Bullet points</span>
                            <button
                              type="button"
                              onClick={() => addBullet(activeSectionTab)}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide px-2 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                            >
                              <ListPlus size={14} />
                              Add bullet
                            </button>
                          </label>
                          <div className="mt-2 space-y-2">
                            {activeSection.bullets.length === 0 ? (
                              <p className="text-xs text-slate-400 italic py-2">
                                No bullets yet — use “Add bullet” for checklist-style content.
                              </p>
                            ) : (
                              activeSection.bullets.map((bullet, bi) => (
                                <div key={bi} className="flex gap-2 items-start">
                                  <span
                                    className="mt-2.5 w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: ACCENT }}
                                  />
                                  <input
                                    className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
                                    value={bullet}
                                    placeholder="Bullet text"
                                    onChange={(e) =>
                                      setBullet(activeSectionTab, bi, e.target.value)
                                    }
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeBullet(activeSectionTab, bi)}
                                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 shrink-0"
                                    aria-label="Remove bullet"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-500">
                            Layout & image
                          </label>
                          <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {layoutOptions.map((opt) => {
                              const Icon = opt.icon;
                              const sel = activeSection.layout === opt.value;
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() =>
                                    updateSection(activeSectionTab, { layout: opt.value })
                                  }
                                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-[11px] font-medium transition ${
                                    sel
                                      ? "border-[#00353E] bg-[#00353E]/5 text-[#00353E]"
                                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                  }`}
                                >
                                  <Icon size={18} className={sel ? "text-[#00353E]" : ""} />
                                  {opt.label}
                                </button>
                              );
                            })}
                          </div>

                          {activeSection.layout !== "textOnly" ? (
                            <div className="mt-3">
                              {activeSection.previewUrl ? (
                                <div className="relative rounded-xl overflow-hidden border border-slate-200">
                                  <img
                                    src={activeSection.previewUrl}
                                    alt=""
                                    className="w-full h-40 object-cover"
                                  />
                                  <div className="flex gap-2 p-2 bg-slate-50 border-t border-slate-200">
                                    <label className="flex-1 text-center text-xs font-medium py-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-white">
                                      Replace
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) =>
                                          handleSectionImage(activeSectionTab, e.target.files)
                                        }
                                      />
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => clearSectionImage(activeSectionTab)}
                                      className="flex-1 text-xs font-medium py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <label className="flex items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-slate-50 transition">
                                  <ImagePlus className="text-slate-400" size={22} />
                                  <span className="text-sm text-slate-600">
                                    Section image (optional)
                                  </span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleSectionImage(activeSectionTab, e.target.files)
                                    }
                                  />
                                </label>
                              )}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : contentSections.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-slate-200 bg-white py-10 px-4 text-center text-sm text-slate-500">
                        Add one or more sections for image + text layouts and bullet lists, or leave empty
                        and use only the hero + quick feature lines.
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 text-white rounded-xl py-3 font-semibold shadow-md hover:opacity-95 disabled:opacity-60 transition"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {saving ? "Saving…" : editing ? "Update service" : "Create service"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewOpen((prev) => !prev)}
                      className="px-5 rounded-xl border border-slate-200 flex items-center justify-center gap-2 font-medium text-slate-700 hover:bg-slate-50 xl:hidden"
                    >
                      <Eye size={16} />
                      {previewOpen ? "Hide preview" : "Show preview"}
                    </button>
                  </div>
                </form>
              </div>

              {previewOpen ? (
                <div className="overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-slate-100 to-slate-50 min-h-[280px] xl:min-h-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">
                    Live preview
                  </p>
                  <div
                    className={`rounded-2xl border border-slate-200/90 shadow-lg overflow-hidden ${
                      themeSurfaceClass[meta.pageTheme]
                    }`}
                  >
                    <div className="p-5 sm:p-8">
                      {meta.heroImagePosition === "center" ? (
                        <>
                          <div className="text-center max-w-3xl mx-auto">
                            <h4 className="text-2xl sm:text-3xl font-bold text-slate-900">
                              {meta.title || "Service title"}
                            </h4>
                            {(meta.shortDescription || meta.longDescription) && (
                              <p className="text-slate-600 mt-3 leading-relaxed text-sm sm:text-base">
                                {meta.shortDescription ||
                                  "Short intro appears here under the title."}
                              </p>
                            )}
                          </div>
                          <div className="mt-8 max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                            <div className="h-48 flex items-center justify-center text-slate-500 text-sm">
                              Hero image (center)
                            </div>
                          </div>
                          <div className="mt-8 max-w-3xl mx-auto">
                            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                              {meta.longDescription ||
                                "Main long description shows below the hero image."}
                            </p>
                          </div>
                          <div
                            className={`mt-8 grid gap-3 max-w-5xl mx-auto ${
                              textGridClass[meta.textGridColumns]
                            }`}
                          >
                            {(previewDetails.length
                              ? previewDetails
                              : ["Feature highlight"]
                            )
                              .slice(0, 8)
                              .map((detail, idx) => (
                                <div
                                  key={idx}
                                  className="bg-white/90 border border-slate-200 rounded-xl p-3 text-sm text-slate-700"
                                >
                                  {detail}
                                </div>
                              ))}
                          </div>
                        </>
                      ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                          <div
                            className={
                              meta.heroImagePosition === "left"
                                ? "order-2 lg:order-1"
                                : "order-2 lg:order-2"
                            }
                          >
                            <h4 className="text-2xl sm:text-3xl font-bold text-slate-900">
                              {meta.title || "Service title"}
                            </h4>
                            <p className="text-slate-600 mt-3 leading-relaxed">
                              {meta.longDescription ||
                                meta.shortDescription ||
                                "Long description preview."}
                            </p>
                            <div
                              className={`mt-6 grid gap-3 ${textGridClass[meta.textGridColumns]}`}
                            >
                              {(previewDetails.length
                                ? previewDetails
                                : ["Feature highlight"]
                              )
                                .slice(0, 8)
                                .map((detail, idx) => (
                                  <div
                                    key={idx}
                                    className="bg-white/90 border border-slate-200 rounded-xl p-3 text-sm text-slate-700"
                                  >
                                    {detail}
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div
                            className={
                              meta.heroImagePosition === "left"
                                ? "order-1 lg:order-2"
                                : "order-1 lg:order-1"
                            }
                          >
                            <div className="h-52 rounded-2xl bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 text-sm font-medium">
                              Hero · {meta.heroImagePosition}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-10 space-y-12 border-t border-slate-200/80 pt-10">
                        {contentSections.map((sec, si) => (
                          <div key={sec.localId}>
                            {sec.layout === "imageCenter" && sec.previewUrl ? (
                              <>
                                {sec.heading ? (
                                  <h5 className="text-xl font-semibold text-center text-slate-900 mb-4">
                                    {sec.heading}
                                  </h5>
                                ) : null}
                                <div className="rounded-2xl overflow-hidden border border-slate-200 max-w-3xl mx-auto">
                                  <img
                                    src={sec.previewUrl}
                                    alt=""
                                    className="w-full h-48 object-cover"
                                  />
                                </div>
                                <div className="max-w-3xl mx-auto mt-5">
                                  {sec.body ? (
                                    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                                      {sec.body}
                                    </p>
                                  ) : null}
                                  {sec.bullets.filter(Boolean).length > 0 ? (
                                    <ul className="mt-4 space-y-2">
                                      {sec.bullets.filter(Boolean).map((b, i) => (
                                        <li key={i} className="flex gap-2">
                                          <span
                                            className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                                            style={{ backgroundColor: ACCENT }}
                                          />
                                          <span className="text-slate-700 text-sm">{b}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : null}
                                </div>
                              </>
                            ) : sec.layout === "textOnly" || !sec.previewUrl ? (
                              <div>
                                {sec.heading ? (
                                  <h5 className="text-xl font-semibold text-slate-900 mb-3">
                                    {sec.heading}
                                  </h5>
                                ) : null}
                                {sec.body ? (
                                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                                    {sec.body}
                                  </p>
                                ) : null}
                                {sec.bullets.filter(Boolean).length > 0 ? (
                                  <ul className="mt-4 space-y-2">
                                    {sec.bullets.filter(Boolean).map((b, i) => (
                                      <li key={i} className="flex gap-2">
                                        <span
                                          className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                                          style={{ backgroundColor: ACCENT }}
                                        />
                                        <span className="text-slate-700 text-sm">{b}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : null}
                              </div>
                            ) : (
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                <div
                                  className={
                                    sec.layout === "imageLeft"
                                      ? "order-1"
                                      : "order-2 lg:order-2"
                                  }
                                >
                                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                                    <img
                                      src={sec.previewUrl}
                                      alt=""
                                      className="w-full h-52 object-cover"
                                    />
                                  </div>
                                </div>
                                <div
                                  className={
                                    sec.layout === "imageLeft"
                                      ? "order-2"
                                      : "order-1 lg:order-1"
                                  }
                                >
                                  {sec.heading ? (
                                    <h5 className="text-xl font-semibold text-slate-900 mb-3">
                                      {sec.heading}
                                    </h5>
                                  ) : null}
                                  {sec.body ? (
                                    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                                      {sec.body}
                                    </p>
                                  ) : null}
                                  {sec.bullets.filter(Boolean).length > 0 ? (
                                    <ul className="mt-4 space-y-2">
                                      {sec.bullets.filter(Boolean).map((b, i) => (
                                        <li key={i} className="flex gap-2">
                                          <span
                                            className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                                            style={{ backgroundColor: ACCENT }}
                                          />
                                          <span className="text-slate-700 text-sm">{b}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : null}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-10 pt-6 border-t border-slate-200/80">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                          New gallery files
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {Array.from({
                            length: Math.min(Math.max(meta.images.length, 1), 6),
                          }).map((_, idx) => (
                            <div
                              key={idx}
                              className="aspect-square rounded-lg bg-slate-200 border border-slate-300"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
