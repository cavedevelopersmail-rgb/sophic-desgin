import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import PageSeo from "../../../components/PageSeo";
import { DEFAULT_DESCRIPTION, SITE_NAME_FULL, getSiteOrigin } from "../../../constants/siteMeta";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft, LayoutGrid } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

/** Brand primary — used sparingly */
const BRAND = "#00353E";

const themeShell = {
  theme1: "from-stone-50 via-white to-slate-50/80",
  theme2: "from-slate-100/70 via-white to-stone-50",
  theme3: "from-emerald-50/40 via-white to-slate-50",
  theme4: "from-neutral-100/60 via-white to-stone-50",
};

const gridColsMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

function ContentSectionBlock({ section, serviceTitle, index }) {
  const { layout, heading, body, bullets, image } = section;
  const hasImage = Boolean(image?.url);
  const list = (bullets || []).filter(Boolean);

  const bulletList = list.length ? (
    <ul className="mt-5 space-y-2.5">
      {list.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 text-[15px] leading-relaxed text-stone-700 md:text-base"
        >
          <span
            className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: BRAND }}
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  ) : null;

  const prose = (
    <>
      {body ? (
        <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-stone-700 md:text-[17px]">
          {body}
        </div>
      ) : null}
      {bulletList}
    </>
  );

  const sectionCard =
    "rounded-xl border border-stone-200/90 bg-white p-6 shadow-[0_1px_0_0_rgba(0,0,0,0.04)] md:p-8";

  const headingEl = heading ? (
    <h2 className="mb-4 text-xl font-semibold tracking-tight text-stone-900 md:text-2xl">
      {heading}
    </h2>
  ) : null;

  const frameImg = (img, alt, tall) => (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-sm">
      <img
        src={img.url}
        alt={alt}
        className={`w-full object-cover transition duration-300 hover:brightness-[1.02] ${
          tall ? "max-h-[400px] min-h-[220px]" : "h-[260px] md:h-[320px]"
        }`}
      />
    </div>
  );

  if (layout === "imageCenter" && hasImage) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.18) }}
        className={`scroll-mt-[var(--site-header-height)] ${sectionCard}`}
      >
        {heading ? (
          <h2 className="mb-5 text-center text-xl font-semibold tracking-tight text-stone-900 md:text-2xl">
            {heading}
          </h2>
        ) : null}
        <div className="mx-auto max-w-3xl">{frameImg(image, heading || serviceTitle || "", true)}</div>
        <div className="mx-auto mt-7 max-w-2xl md:mt-9">{prose}</div>
      </motion.article>
    );
  }

  if ((layout === "textOnly" || !hasImage) && (heading || body || list.length)) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.18) }}
        className={`max-w-3xl scroll-mt-[var(--site-header-height)] ${sectionCard}`}
      >
        {headingEl}
        {prose}
      </motion.article>
    );
  }

  if (!hasImage) return null;

  const imageFirst = layout === "imageLeft";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.18) }}
      className={`scroll-mt-[var(--site-header-height)] ${sectionCard}`}
    >
      <div className="grid grid-cols-1 items-start gap-8 md:gap-10 lg:grid-cols-2 lg:gap-12">
        <div className={imageFirst ? "order-1" : "order-2 lg:order-2"}>
          {frameImg(image, heading || serviceTitle || "", false)}
        </div>
        <div className={imageFirst ? "order-2" : "order-1 lg:order-1"}>
          {headingEl}
          {prose}
        </div>
      </div>
    </motion.article>
  );
}

function PageBackdrop({ themeKey }) {
  const grad = themeShell[themeKey] || themeShell.theme1;
  return (
    <>
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${grad}`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent"
        aria-hidden
      />
    </>
  );
}

function buildServiceSchema(service, pathname) {
  const origin = getSiteOrigin();
  const url = origin && pathname ? `${origin}${pathname}` : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: (service.shortDescription || "").slice(0, 280) || DEFAULT_DESCRIPTION,
    provider: { "@type": "Organization", name: SITE_NAME_FULL },
    ...(url ? { url } : {}),
  };
}

const ServiceDetailDynamic = () => {
  const { id, slug } = useParams();
  const { pathname } = useLocation();
  const { getServiceBySlug, getServiceById } = useAuth();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadService = async () => {
      setLoading(true);
      setService(null);
      try {
        const response = id
          ? await getServiceById(id)
          : await getServiceBySlug(slug);
        setService(response.data?.service || null);
      } catch (error) {
        console.error("Failed to load service:", error);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    if (id || slug) {
      loadService();
    }
  }, [id, slug, getServiceBySlug, getServiceById]);

  const contentGridClass = useMemo(
    () => gridColsMap[service?.textGridColumns] || gridColsMap[2],
    [service?.textGridColumns]
  );

  const sections = service?.contentSections;
  const themeKey =
    service?.pageTheme && themeShell[service.pageTheme] ? service.pageTheme : "theme1";

  if (loading) {
    return (
      <>
        <PageSeo
          title="MEP service"
          description={DEFAULT_DESCRIPTION}
          pathname={pathname}
          noIndex
        />
        <div className="relative min-h-[50vh] overflow-hidden">
          <PageBackdrop themeKey="theme1" />
          <div className="container-custom relative py-14 md:py-18">
            <div className="mb-8 h-3 w-40 animate-pulse rounded bg-stone-200" />
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-3">
                <div className="h-10 w-4/5 animate-pulse rounded-lg bg-stone-200" />
                <div className="h-3.5 w-full animate-pulse rounded bg-stone-200" />
                <div className="h-3.5 w-full animate-pulse rounded bg-stone-200" />
                <div className="h-3.5 w-3/4 animate-pulse rounded bg-stone-200" />
              </div>
              <div className="h-[280px] animate-pulse rounded-xl bg-stone-200/80" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!service) {
    return (
      <>
        <PageSeo
          title="Service not found"
          description="The requested MEP service could not be found. Browse all services from Sophic Designs."
          pathname={pathname}
          noIndex
        />
        <div className="relative min-h-[60vh] overflow-hidden">
          <PageBackdrop themeKey="theme1" />
          <div className="container-custom relative flex flex-col items-center justify-center py-24 text-center">
            <div className="max-w-md rounded-xl border border-stone-200 bg-white px-8 py-10 shadow-sm">
              <LayoutGrid className="mx-auto mb-4 h-9 w-9 text-stone-500" strokeWidth={1.25} />
              <h1 className="text-lg font-semibold text-stone-900">Service not found</h1>
              <p className="mt-2 text-sm text-stone-600">
                This page may have moved or the link is outdated.
              </p>
              <Link
                to="/services"
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-800 transition hover:bg-stone-50"
              >
                <ArrowLeft className="h-4 w-4" />
                View all services
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const imageLeft = service.heroImagePosition === "left";
  const heroCenter = service.heroImagePosition === "center";

  const detailsBlock =
    (service.details || []).length > 0 ? (
      <div className={`grid gap-3 ${contentGridClass}`}>
        {(service.details || []).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.2) }}
            className="rounded-lg border border-stone-200 bg-stone-50/60 p-4 md:p-5"
          >
            <p className="border-l-2 border-[#00353E] pl-3 text-sm leading-relaxed text-stone-800 md:text-[15px]">
              {item}
            </p>
          </motion.div>
        ))}
      </div>
    ) : null;

  const heroImageEl = service.image?.url ? (
    <img
      src={service.image.url}
      alt={service.title}
      className="h-[280px] w-full rounded-xl border border-stone-200 object-cover shadow-sm md:h-[400px]"
    />
  ) : (
    <div className="flex h-[280px] w-full items-center justify-center rounded-xl border border-dashed border-stone-300 bg-stone-100/80 text-sm text-stone-500 md:h-[400px]">
      Image coming soon
    </div>
  );

  const description =
    (service.shortDescription && service.shortDescription.slice(0, 160)) ||
    (service.longDescription || "").replace(/\s+/g, " ").trim().slice(0, 160) ||
    DEFAULT_DESCRIPTION;

  return (
    <>
      <PageSeo
        title={service.title}
        description={description}
        pathname={pathname}
        image={service.image?.url || undefined}
        keywords={`${service.title}, MEP consultancy, Sophic Designs, HVAC electrical plumbing`}
        type="article"
        jsonLd={buildServiceSchema(service, pathname)}
      />
      <section className="relative overflow-x-hidden pb-16 pt-8 md:pb-20 md:pt-12">
      <PageBackdrop themeKey={themeKey} />

      <div className="container-custom relative max-w-6xl">
        {/* Top bar: wayfinding + quiet back link */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap items-center gap-1 text-sm text-stone-500" aria-label="Breadcrumb">
            <Link to="/" className="transition hover:text-stone-800">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-stone-400" aria-hidden />
            <Link to="/services" className="transition hover:text-stone-800">
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-stone-400" aria-hidden />
            <span className="max-w-[min(100vw-6rem,20rem)] truncate font-medium text-stone-800">
              {service.title}
            </span>
          </nav>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-stone-600 underline decoration-stone-300 underline-offset-4 transition hover:text-[#00353E] hover:decoration-current sm:self-auto"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All services
          </Link>
        </div>

        {heroCenter ? (
          <>
            <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
              <h1 className="text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl md:leading-tight lg:text-[2.75rem]">
                {service.title}
              </h1>
              {service.shortDescription ? (
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-600 md:text-lg">
                  {service.shortDescription}
                </p>
              ) : null}
            </div>
            <div className="mx-auto mb-10 max-w-4xl md:mb-12">{heroImageEl}</div>
            <div className="mx-auto max-w-2xl">
              {service.longDescription ? (
                <p className="whitespace-pre-wrap text-base leading-relaxed text-stone-800 md:text-lg">
                  {service.longDescription}
                </p>
              ) : null}
            </div>
            {detailsBlock ? (
              <div className="mx-auto mt-10 max-w-4xl md:mt-12">{detailsBlock}</div>
            ) : null}
          </>
        ) : (
          <div className="grid grid-cols-1 items-start gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
            <div className={imageLeft ? "order-1" : "order-2 lg:order-1"}>
              <h1 className="text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl lg:text-[2.65rem] lg:leading-tight">
                {service.title}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-stone-700 md:text-lg">
                {service.longDescription || service.shortDescription}
              </p>
              {detailsBlock ? <div className="mt-8">{detailsBlock}</div> : null}
            </div>
            <div className={imageLeft ? "order-2" : "order-1 lg:order-2"}>{heroImageEl}</div>
          </div>
        )}

        {Array.isArray(sections) && sections.length > 0 ? (
          <div
            className={`mx-auto max-w-4xl ${heroCenter || !detailsBlock ? "mt-14 md:mt-16" : "mt-16 md:mt-20"}`}
          >
            <div className="mb-8 border-b border-stone-200 pb-6 md:mb-10">
              <h2 className="text-sm font-medium uppercase tracking-wide text-stone-500">
                Further reading
              </h2>
              <p className="mt-1 text-xl font-semibold text-stone-900 md:text-2xl">Overview &amp; details</p>
            </div>
            <div className="flex flex-col gap-6 md:gap-8">
              {sections.map((section, idx) => (
                <ContentSectionBlock
                  key={section._id || section.image?.publicId || idx}
                  section={section}
                  serviceTitle={service.title}
                  index={idx}
                />
              ))}
            </div>
          </div>
        ) : null}

        {(service.gallery || []).length > 1 ? (
          <div className="mx-auto mt-16 max-w-6xl md:mt-20">
            <div className="mb-6 border-b border-stone-200 pb-5 md:mb-8">
              <h2 className="text-xl font-semibold text-stone-900 md:text-2xl">Gallery</h2>
              <p className="mt-1 text-sm text-stone-600">Selected imagery from this line of work</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {service.gallery.map((img) => (
                <motion.div
                  key={img.publicId}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-24px" }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm"
                >
                  <img
                    src={img.url}
                    alt={service.title}
                    className="h-52 w-full object-cover transition duration-300 hover:opacity-[0.97]"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
    </>
  );
};

export default ServiceDetailDynamic;
