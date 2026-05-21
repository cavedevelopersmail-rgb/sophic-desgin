import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  MapPin,
  Calendar,
  ShieldCheck,
  Globe,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const ICONS = {
  Calendar,
  MapPin,
  Award,
  ShieldCheck,
  Globe,
  Zap,
};

function DynamicIcon({ name, className }) {
  const C = ICONS[name] || Calendar;
  return <C className={className} />;
}

function CtaLink({ href, className, children }) {
  if (!href) return null;
  if (href.startsWith("http") || href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

const Hero = () => {
  const { getHero } = useAuth();
  const [hero, setHero] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await getHero();
        if (!cancelled && data?.success && data.hero?.slides?.length) {
          setHero(data.hero);
        } else if (!cancelled) {
          setLoadError(true);
        }
      } catch (e) {
        console.error("Hero load failed:", e);
        if (!cancelled) setLoadError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [getHero]);

  const slides = hero?.slides || [];
  const autoMs = hero?.autoRotateMs ?? 5000;

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoMs);
    return () => clearInterval(timer);
  }, [slides.length, autoMs]);

  useEffect(() => {
    if (currentSlide >= slides.length) setCurrentSlide(0);
  }, [slides.length, currentSlide]);

  const slide = slides[currentSlide];
  const themeClass = useMemo(
    () => slide?.theme?.trim() || "from-teal-900 via-teal-800 to-teal-700",
    [slide?.theme]
  );
  const isBgImageLayout = slide?.layout === "layout3" && Boolean(slide?.image?.url);

  if (!slide) {
    if (loadError) {
      return (
        <section
          id="home"
          className="relative min-h-[320px] flex items-center bg-slate-800 text-white"
        >
          <div className="max-w-7xl mx-auto px-4 py-16 text-center w-full">
            <p className="text-slate-300">
              Hero content could not be loaded. Check API and save Hero in admin.
            </p>
          </div>
        </section>
      );
    }
    return (
      <section
        id="home"
        className="relative min-h-[400px] flex items-center bg-gradient-to-br from-slate-800 to-slate-900 animate-pulse"
      />
    );
  }

  const renderSlideContent = () => {
    if (slide.layout === "layout2") {
      return (
        <motion.div
          key={`s-${currentSlide}-l2`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55 }}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          <div className="relative order-2 lg:order-1">
            {slide.image?.url ? (
              <img
                src={slide.image.url}
                alt=""
                className="rounded-full aspect-square object-cover border-8 border-yellow-400/20 shadow-2xl w-full max-w-md mx-auto lg:mx-0"
              />
            ) : null}
            {slide.statValue ? (
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-teal-900 p-6 rounded-2xl shadow-xl hidden md:block max-w-[11rem]">
                <p className="font-bold text-2xl">{slide.statValue}</p>
                <p className="text-sm font-semibold">{slide.statLabel}</p>
              </div>
            ) : null}
          </div>

          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            {slide.topBadge ? (
              <div className="inline-block px-4 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-bold tracking-widest uppercase">
                {slide.topBadge}
              </div>
            ) : null}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              {slide.title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mt-2">
                {slide.highlight}
              </span>
            </h1>
            <p className="text-lg text-blue-100">{slide.description}</p>

            <div className="space-y-4">
              {(slide.features || []).map((f, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="p-3 bg-white/10 rounded-full group-hover:bg-yellow-400 transition-colors text-white group-hover:text-teal-900">
                    <DynamicIcon name={f.icon} className="h-6 w-6" />
                  </div>
                  <p className="text-lg font-medium">{f.text}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <CtaLink
                href={slide.ctaHref}
                className="group border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-teal-900 transition-all inline-flex items-center"
              >
                {slide.ctaLabel} <Zap className="ml-2 h-5 w-5 fill-current" />
              </CtaLink>
            </div>
          </div>
        </motion.div>
      );
    }

    if (slide.layout === "layout3") {
      return (
        <motion.div
          key={`s-${currentSlide}-l3`}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl mx-auto text-center px-2"
        >
          {slide.topBadge ? (
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-yellow-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6 border border-white/10">
              {slide.topBadge}
            </div>
          ) : null}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-md">
            {slide.title}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 mt-2">
              {slide.highlight}
            </span>
          </h1>
          {slide.description ? (
            <p className="mt-6 text-lg sm:text-xl text-teal-50 leading-relaxed max-w-2xl mx-auto">
              {slide.description}
            </p>
          ) : null}
          <div className="mt-10">
            <CtaLink
              href={slide.ctaHref}
              className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-teal-900 font-bold py-3 px-8 rounded-full shadow-lg transition-colors"
            >
              {slide.ctaLabel} <ArrowRight className="ml-2 h-5 w-5" />
            </CtaLink>
          </div>
        </motion.div>
      );
    }

    if (slide.layout === "layout4") {
      return (
        <motion.div
          key={`s-${currentSlide}-l4`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center px-2"
        >
          {slide.topBadge ? (
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300/95 mb-5">
              {slide.topBadge}
            </p>
          ) : null}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            {slide.title}
          </h1>
          <p className="mt-4 text-2xl sm:text-3xl font-semibold text-yellow-400">{slide.highlight}</p>
          {slide.description ? (
            <p className="mt-6 text-lg sm:text-xl text-teal-100 leading-relaxed max-w-2xl mx-auto">
              {slide.description}
            </p>
          ) : null}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <CtaLink
              href={slide.ctaHref}
              className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-teal-900 font-bold py-3 px-8 rounded-lg inline-flex items-center justify-center"
            >
              {slide.ctaLabel} <ArrowRight className="ml-2 h-5 w-5" />
            </CtaLink>
            {slide.cta2Label && slide.cta2Href ? (
              <CtaLink
                href={slide.cta2Href}
                className="w-full sm:w-auto border-2 border-white/85 text-white font-bold py-3 px-8 rounded-lg inline-flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                {slide.cta2Label}
              </CtaLink>
            ) : null}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={`s-${currentSlide}-l1`}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.55 }}
        className="grid lg:grid-cols-2 gap-8 items-center"
      >
        <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              {slide.title}
              <span className="block text-yellow-400 mt-2">{slide.highlight}</span>
            </h1>
            <p className="text-lg sm:text-xl text-teal-100 leading-relaxed">
              {slide.description}
            </p>
          </div>

          {(slide.statTiles || []).length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(slide.statTiles || []).map((tile, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg border border-white/10"
                >
                  <DynamicIcon name={tile.icon} className="h-6 w-6 text-yellow-400 shrink-0" />
                  <div className="text-xs sm:text-sm min-w-0">
                    <b>{tile.label}</b>
                    <br />
                    {tile.value}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row gap-4">
            <CtaLink
              href={slide.ctaHref}
              className="bg-yellow-500 hover:bg-yellow-600 text-teal-900 font-bold py-3 px-6 rounded-lg inline-flex items-center justify-center"
            >
              {slide.ctaLabel} <ArrowRight className="ml-2 h-5 w-5" />
            </CtaLink>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          {slide.image?.url ? (
            <img
              src={slide.image.url}
              alt=""
              className="rounded-2xl shadow-2xl border-4 border-white/10 w-full object-cover max-h-[min(520px,70vh)]"
            />
          ) : null}
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="home"
      className={`relative min-h-[600px] md:min-h-[700px] flex items-center transition-colors duration-1000 text-white overflow-hidden ${
        isBgImageLayout ? "bg-slate-900" : `bg-gradient-to-br ${themeClass}`
      }`}
    >
      {isBgImageLayout ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image.url})` }}
            aria-hidden
          />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${themeClass} opacity-[0.82]`}
            aria-hidden
          />
          <div className="absolute inset-0 bg-black/25 pointer-events-none" aria-hidden />
        </>
      ) : (
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <AnimatePresence mode="wait">{renderSlideContent()}</AnimatePresence>

        {slides.length > 1 ? (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
            {slides.map((_, index) => (
              <button
                type="button"
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 transition-all duration-300 rounded-full ${
                  currentSlide === index ? "w-8 bg-yellow-400" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Hero;
