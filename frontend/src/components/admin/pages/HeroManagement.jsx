import React, { useEffect, useState, useCallback } from "react";
import { Plus, Trash2, Save, Loader2, ImageIcon } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const STAT_ICON_OPTIONS = ["Calendar", "MapPin", "Award"];
const FEAT_ICON_OPTIONS = ["ShieldCheck", "Globe", "Zap", "Award"];

const defaultSlide = (layout, i) => {
  const base = {
    title:
      layout === "layout1"
        ? `Slide ${i + 1} title`
        : layout === "layout4"
          ? `Centered headline ${i + 1}`
          : `Headline ${i + 1}`,
    highlight: "Supporting line",
    description: "Short description for this slide.",
    image: { url: "", publicId: "" },
    theme:
      layout === "layout1"
        ? "from-teal-900 via-teal-800 to-teal-700"
        : layout === "layout3"
          ? "from-slate-900/90 via-teal-900/80 to-slate-900/90"
          : "from-slate-900 via-blue-900 to-teal-900",
    layout,
    statTiles:
      layout === "layout1"
        ? [
            { icon: "Calendar", label: "Label", value: "Value" },
            { icon: "MapPin", label: "Label", value: "Value" },
            { icon: "Award", label: "Label", value: "Value" },
          ]
        : [],
    ctaLabel:
      layout === "layout1"
        ? "Contact Us"
        : layout === "layout4"
          ? "Get in touch"
          : "Explore",
    ctaHref: layout === "layout1" || layout === "layout4" ? "#contact" : "#projects",
    topBadge:
      layout === "layout2" || layout === "layout3"
        ? "Badge"
        : layout === "layout4"
          ? "Intro"
          : "",
    statValue: "500+",
    statLabel: "Projects Completed",
    features:
      layout === "layout2"
        ? [
            { icon: "ShieldCheck", text: "Feature one" },
            { icon: "Globe", text: "Feature two" },
          ]
        : [],
    cta2Label: layout === "layout4" ? "Our services" : "",
    cta2Href: layout === "layout4" ? "/services" : "",
  };
  return base;
};

const HeroManagement = () => {
  const { getHero, updateHero } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [autoRotateMs, setAutoRotateMs] = useState(5000);
  const [slides, setSlides] = useState([]);
  const [pendingFiles, setPendingFiles] = useState({});

  const load = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      const { data } = await getHero();
      if (data?.success && data.hero) {
        setSlides(
          (data.hero.slides || []).map((s) => ({
            ...s,
            image: s.image || { url: "", publicId: "" },
            statTiles: s.statTiles || [],
            features: s.features || [],
          }))
        );
        setAutoRotateMs(data.hero.autoRotateMs ?? 5000);
      }
    } catch (e) {
      console.error(e);
      setMessage({ type: "error", text: "Failed to load hero" });
    } finally {
      setLoading(false);
    }
  }, [getHero]);

  useEffect(() => {
    load();
  }, [load]);

  const updateSlide = (idx, patch) => {
    setSlides((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], ...patch };
      return next;
    });
  };

  const updateStatTile = (slideIdx, tileIdx, field, value) => {
    setSlides((prev) => {
      const next = [...prev];
      const tiles = [...(next[slideIdx].statTiles || [])];
      tiles[tileIdx] = { ...tiles[tileIdx], [field]: value };
      next[slideIdx] = { ...next[slideIdx], statTiles: tiles };
      return next;
    });
  };

  const updateFeature = (slideIdx, rowIdx, field, value) => {
    setSlides((prev) => {
      const next = [...prev];
      const rows = [...(next[slideIdx].features || [])];
      rows[rowIdx] = { ...rows[rowIdx], [field]: value };
      next[slideIdx] = { ...next[slideIdx], features: rows };
      return next;
    });
  };

  const addSlide = () => {
    if (slides.length >= 6) return;
    setSlides((prev) => [...prev, defaultSlide("layout1", prev.length)]);
  };

  const removeSlide = (idx) => {
    if (slides.length <= 1) return;
    setSlides((prev) => prev.filter((_, i) => i !== idx));
    setPendingFiles((prev) => {
      const next = { ...prev };
      delete next[idx];
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("slides", JSON.stringify(slides));
      fd.append("autoRotateMs", String(autoRotateMs));
      Object.entries(pendingFiles).forEach(([idx, file]) => {
        if (file) fd.append(`slide${idx}`, file);
      });
      const { data } = await updateHero(fd);
      if (data?.success) {
        setMessage({ type: "ok", text: "Hero saved" });
        setPendingFiles({});
        if (data.hero) {
          setSlides(
            (data.hero.slides || []).map((s) => ({
              ...s,
              image: s.image || { url: "", publicId: "" },
              statTiles: s.statTiles || [],
              features: s.features || [],
            }))
          );
        }
      } else {
        setMessage({ type: "error", text: data?.message || "Save failed" });
      }
    } catch (e) {
      console.error(e);
      setMessage({
        type: "error",
        text: e.response?.data?.message || e.message || "Save failed",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-600">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        Loading hero…
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero (home banner)</h1>
          <p className="text-gray-600 text-sm mt-1">
            Edit carousel slides, CTAs, gradients, and images. Up to 6 slides.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00353E] text-white font-medium hover:bg-[#004d5a] disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save hero
        </button>
      </div>

      {message && (
        <div
          className={`px-4 py-3 rounded-lg text-sm ${
            message.type === "ok"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Auto-rotate interval (ms)
        </label>
        <input
          type="number"
          min={2000}
          max={120000}
          step={500}
          value={autoRotateMs}
          onChange={(e) =>
            setAutoRotateMs(Math.max(2000, Math.min(120000, Number(e.target.value) || 5000)))
          }
          className="w-full max-w-xs border border-gray-300 rounded-lg px-3 py-2"
        />
        <p className="text-xs text-gray-500 mt-1">Between 2000 and 120000 ms.</p>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Slides</h2>
        <button
          type="button"
          onClick={addSlide}
          disabled={slides.length >= 6}
          className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-900 disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
          Add slide
        </button>
      </div>

      <div className="space-y-6">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-b border-gray-200">
              <span className="font-semibold text-gray-800">Slide {idx + 1}</span>
              <button
                type="button"
                onClick={() => removeSlide(idx)}
                disabled={slides.length <= 1}
                className="text-red-600 hover:text-red-800 disabled:opacity-30 text-sm inline-flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600">Layout</label>
                  <select
                    value={slide.layout}
                    onChange={(e) => {
                      const v = e.target.value;
                      const patch = {
                        layout: v,
                        statTiles: [],
                        features: [],
                      };
                      if (v === "layout1") {
                        patch.statTiles = slide.statTiles?.length
                          ? slide.statTiles
                          : defaultSlide("layout1", idx).statTiles;
                      } else if (v === "layout2") {
                        patch.features = slide.features?.length
                          ? slide.features
                          : defaultSlide("layout2", idx).features;
                      } else if (v === "layout4") {
                        patch.cta2Label = slide.cta2Label || defaultSlide("layout4", idx).cta2Label;
                        patch.cta2Href = slide.cta2Href || defaultSlide("layout4", idx).cta2Href;
                      }
                      updateSlide(idx, patch);
                    }}
                    className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="layout1">Layout 1 — image right, stat tiles</option>
                    <option value="layout2">Layout 2 — circular image, features</option>
                    <option value="layout3">Layout 3 — full-width background image</option>
                    <option value="layout4">Layout 4 — centered, dual CTAs</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Gradient (Tailwind)</label>
                  <input
                    type="text"
                    value={slide.theme}
                    onChange={(e) => updateSlide(idx, { theme: e.target.value })}
                    className="mt-1 w-full border rounded-lg px-3 py-2 text-sm font-mono"
                    placeholder="from-teal-900 via-teal-800 to-teal-700"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600">Title</label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => updateSlide(idx, { title: e.target.value })}
                    className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Highlight line</label>
                  <input
                    type="text"
                    value={slide.highlight}
                    onChange={(e) => updateSlide(idx, { highlight: e.target.value })}
                    className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">Description</label>
                <textarea
                  value={slide.description}
                  onChange={(e) => updateSlide(idx, { description: e.target.value })}
                  rows={3}
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              {(slide.layout === "layout3" || slide.layout === "layout4") && (
                <div>
                  <label className="text-xs font-medium text-gray-600">
                    Eyebrow (optional, small line above title)
                  </label>
                  <input
                    type="text"
                    value={slide.topBadge || ""}
                    onChange={(e) => updateSlide(idx, { topBadge: e.target.value })}
                    className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g. Innovation in Engineering"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-gray-600">Image URL (optional if uploading)</label>
                <input
                  type="url"
                  value={slide.image?.url || ""}
                  onChange={(e) =>
                    updateSlide(idx, {
                      image: { ...slide.image, url: e.target.value },
                    })
                  }
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer border rounded-lg px-3 py-2 bg-gray-50 hover:bg-gray-100">
                  <ImageIcon className="h-4 w-4" />
                  Upload image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPendingFiles((p) => ({ ...p, [idx]: file }));
                        e.target.value = "";
                      }
                    }}
                  />
                </label>
                {pendingFiles[idx] && (
                  <span className="text-xs text-teal-700">
                    New file: {pendingFiles[idx].name}
                  </span>
                )}
              </div>

              {slide.layout === "layout1" && (
                <div className="border-t pt-4 space-y-3">
                  <p className="text-sm font-medium text-gray-700">Stat tiles (3)</p>
                  {(slide.statTiles || []).map((tile, ti) => (
                    <div key={ti} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-end">
                      <div>
                        <label className="text-xs text-gray-500">Icon</label>
                        <select
                          value={tile.icon}
                          onChange={(e) =>
                            updateStatTile(idx, ti, "icon", e.target.value)
                          }
                          className="mt-0.5 w-full border rounded-lg px-2 py-1.5 text-sm"
                        >
                          {STAT_ICON_OPTIONS.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Label</label>
                        <input
                          value={tile.label}
                          onChange={(e) =>
                            updateStatTile(idx, ti, "label", e.target.value)
                          }
                          className="mt-0.5 w-full border rounded-lg px-2 py-1.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Value</label>
                        <input
                          value={tile.value}
                          onChange={(e) =>
                            updateStatTile(idx, ti, "value", e.target.value)
                          }
                          className="mt-0.5 w-full border rounded-lg px-2 py-1.5 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {slide.layout === "layout2" && (
                <div className="border-t pt-4 space-y-3">
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-gray-500">Top badge</label>
                      <input
                        value={slide.topBadge || ""}
                        onChange={(e) => updateSlide(idx, { topBadge: e.target.value })}
                        className="mt-0.5 w-full border rounded-lg px-2 py-1.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Stat value</label>
                      <input
                        value={slide.statValue || ""}
                        onChange={(e) => updateSlide(idx, { statValue: e.target.value })}
                        className="mt-0.5 w-full border rounded-lg px-2 py-1.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Stat label</label>
                      <input
                        value={slide.statLabel || ""}
                        onChange={(e) => updateSlide(idx, { statLabel: e.target.value })}
                        className="mt-0.5 w-full border rounded-lg px-2 py-1.5 text-sm"
                      />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Feature rows</p>
                  {(slide.features || []).map((row, ri) => (
                    <div key={ri} className="flex flex-wrap gap-2 items-end">
                      <select
                        value={row.icon}
                        onChange={(e) =>
                          updateFeature(idx, ri, "icon", e.target.value)
                        }
                        className="border rounded-lg px-2 py-1.5 text-sm"
                      >
                        {FEAT_ICON_OPTIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      <input
                        value={row.text}
                        onChange={(e) =>
                          updateFeature(idx, ri, "text", e.target.value)
                        }
                        className="flex-1 min-w-[12rem] border rounded-lg px-2 py-1.5 text-sm"
                        placeholder="Text"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-3 border-t pt-4">
                <div>
                  <label className="text-xs text-gray-500">Primary CTA label</label>
                  <input
                    value={slide.ctaLabel || ""}
                    onChange={(e) => updateSlide(idx, { ctaLabel: e.target.value })}
                    className="mt-0.5 w-full border rounded-lg px-2 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Primary CTA href</label>
                  <input
                    value={slide.ctaHref || ""}
                    onChange={(e) => updateSlide(idx, { ctaHref: e.target.value })}
                    className="mt-0.5 w-full border rounded-lg px-2 py-1.5 text-sm"
                    placeholder="#contact or /path"
                  />
                </div>
              </div>

              {slide.layout === "layout4" && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500">Secondary CTA label</label>
                    <input
                      value={slide.cta2Label || ""}
                      onChange={(e) => updateSlide(idx, { cta2Label: e.target.value })}
                      className="mt-0.5 w-full border rounded-lg px-2 py-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Secondary CTA href</label>
                    <input
                      value={slide.cta2Href || ""}
                      onChange={(e) => updateSlide(idx, { cta2Href: e.target.value })}
                      className="mt-0.5 w-full border rounded-lg px-2 py-1.5 text-sm"
                      placeholder="/services or #section"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroManagement;
