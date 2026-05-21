/**
 * Maps API Service documents for nav. Public links use /services/id/:_id (stable, avoids bad slugs).
 */
export function normalizeServicesForNav(services = []) {
  if (!Array.isArray(services)) return [];
  return [...services]
    .filter((s) => s && s._id && s.title && s.isActive !== false)
    .sort((a, b) => {
      const oa = Number(a.order) || 0;
      const ob = Number(b.order) || 0;
      if (oa !== ob) return oa - ob;
      const tb = new Date(b.createdAt || 0).getTime();
      const ta = new Date(a.createdAt || 0).getTime();
      return tb - ta;
    })
    .map((s) => ({
      _id: s._id,
      slug: s.slug,
      title: s.title,
      description: String(s.shortDescription || "").trim(),
      href: `/services/id/${s._id}`,
      image:
        (s.image && s.image.url) ||
        (Array.isArray(s.gallery) && s.gallery[0] && s.gallery[0].url) ||
        "",
    }));
}
