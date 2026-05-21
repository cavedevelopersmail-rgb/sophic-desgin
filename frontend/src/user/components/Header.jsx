import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { normalizeServicesForNav } from "../../utils/serviceNav";

/** Time before flyouts close after pointer leaves (crossing nav → mega menu gap). */
const DROPDOWN_CLOSE_DELAY_MS = 600;

const buildNavigation = (serviceItems) => [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  {
    name: "Services",
    href: "/services",
    megaMenu: true,
    dropdownItems: serviceItems,
  },
  { name: "Industries", href: "/industries" },
  { name: "Projects", href: "/projects" },
  { name: "Leaders", href: "/leaders" },
  { name: "Blogs", href: "/allBlogs" },
  { name: "Credentials", href: "/credentials" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const { getServices } = useAuth();
  const [navServiceItems, setNavServiceItems] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const navigation = useMemo(
    () => buildNavigation(navServiceItems),
    [navServiceItems]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await getServices();
        if (cancelled) return;
        if (data?.success && Array.isArray(data.services)) {
          setNavServiceItems(normalizeServicesForNav(data.services));
        }
      } catch (e) {
        console.error("Failed to load services for navigation:", e);
      } finally {
        if (!cancelled) setServicesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [getServices]);

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setMobileDropdown(null);
    setActiveDropdown(null);
  };

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      {/* Added container padding for desktop spacing */}
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center pl-2 lg:pl-0">
            {/* Add max height and width to control logo size */}

            <Link
              to="/"
              className="group block select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00353E] focus-visible:ring-offset-2 rounded-md pb-0.5"
              aria-label="Sophic Designs Private Limited home"
            >
              <span className="relative block font-semibold text-[#00353E] tracking-tight text-lg sm:text-xl leading-none transition-all duration-500 ease-out group-hover:text-teal-800 group-hover:tracking-tight sm:group-hover:tracking-wide">
                Sophic Designs
                <span
                  className="pointer-events-none absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-teal-500 to-[#00353E] rounded-full opacity-90 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 motion-reduce:scale-x-100 motion-reduce:opacity-70"
                  aria-hidden
                />
              </span>
              <span className="mt-1 block text-[0.58rem] sm:text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-slate-500 transition-colors duration-300 group-hover:text-[#00353E]/80">
                Private Limited
              </span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item, index) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => {
                  clearTimeout(timeoutRef.current);
                  setActiveDropdown(item.name);
                }}
                onMouseLeave={() => {
                  timeoutRef.current = setTimeout(() => {
                    setActiveDropdown(null);
                  }, DROPDOWN_CLOSE_DELAY_MS);
                }}
              >
                {item.name === "Contact" ? (
                  // Added right margin to contact button
                  <Link
                    to={item.href}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 group mr-2 shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                  >
                    {item.name}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                  </Link>
                ) : (
                  <Link
                    to={item.href}
                    className={`relative flex items-center text-gray-700 font-medium py-2 px-1 transition-colors duration-300 after:absolute after:left-1 after:right-1 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-teal-500/90 after:transition-transform after:duration-300 after:ease-out hover:text-teal-600 hover:after:scale-x-100 motion-reduce:hover:after:scale-x-0 ${
                      activeDropdown === item.name
                        ? "text-teal-600 after:scale-x-100"
                        : ""
                    } ${index === 0 ? "ml-2" : ""}`}
                  >
                    {item.name}
                    {(item.dropdown || item.megaMenu) && (
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform duration-300 ease-out ${
                          activeDropdown === item.name
                            ? "rotate-180 text-teal-600"
                            : "group-hover:rotate-180"
                        }`}
                      />
                    )}
                  </Link>
                )}

                {/* Mega Menu Dropdown */}
                {item.megaMenu && activeDropdown === item.name && (
                  <div
                    ref={dropdownRef}
                    className="fixed left-0 right-0 w-full top-[var(--site-header-height)] h-[calc(100dvh-var(--site-header-height))] z-50 overflow-y-auto overscroll-contain animate-megamenu-panel motion-reduce:animate-none motion-reduce:opacity-100"
                    onMouseEnter={() => {
                      clearTimeout(timeoutRef.current);
                      setActiveDropdown(item.name);
                    }}
                    onMouseLeave={() => {
                      timeoutRef.current = setTimeout(() => {
                        setActiveDropdown(null);
                      }, DROPDOWN_CLOSE_DELAY_MS);
                    }}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent motion-reduce:hidden" />
                    <div className="w-full min-h-full bg-gradient-to-b from-slate-50/90 via-white to-white border-t border-gray-200/90 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]">
                      <div className="relative w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-8 lg:py-10 pb-12 overflow-hidden">
                        <div
                          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl motion-reduce:hidden animate-megamenu-fade-up"
                          style={{ animationDelay: "120ms" }}
                          aria-hidden
                        />
                        <div
                          className="pointer-events-none absolute top-1/3 -left-32 h-48 w-48 rounded-full bg-[#00353E]/5 blur-3xl motion-reduce:hidden animate-megamenu-fade-up"
                          style={{ animationDelay: "200ms" }}
                          aria-hidden
                        />
                        <p
                          className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-teal-600 mb-2 animate-megamenu-fade-up motion-reduce:animate-none motion-reduce:opacity-100"
                          style={{ animationDelay: "60ms" }}
                        >
                          Our services
                        </p>
                        <span
                          className="mb-4 block h-0.5 w-20 max-w-[min(12rem,40%)] origin-left rounded-full bg-gradient-to-r from-teal-500 to-[#00353E] animate-megamenu-line motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:scale-x-100"
                          style={{ animationDelay: "100ms" }}
                          aria-hidden
                        />
                        <h2
                          className="text-xl sm:text-2xl font-bold text-[#00353E] tracking-tight mb-8 lg:mb-10 max-w-4xl animate-megamenu-fade-up motion-reduce:animate-none motion-reduce:opacity-100"
                          style={{ animationDelay: "140ms" }}
                        >
                          Engineering disciplines we lead end-to-end
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 xl:gap-8 w-full max-w-[1920px] mx-auto">
                          {servicesLoading && item.dropdownItems.length === 0 ? (
                            <p className="text-slate-600 col-span-full py-8">
                              Loading services…
                            </p>
                          ) : !servicesLoading &&
                            item.dropdownItems.length === 0 ? (
                            <div className="col-span-full py-8 text-center space-y-3">
                              <p className="text-slate-600">
                                No active services yet. Visit the{" "}
                                <Link
                                  to="/services"
                                  className="text-teal-600 font-medium hover:underline"
                                  onClick={closeAllMenus}
                                >
                                  services page
                                </Link>{" "}
                                or{" "}
                                <Link
                                  to="/contact"
                                  className="text-teal-600 font-medium hover:underline"
                                  onClick={closeAllMenus}
                                >
                                  contact us
                                </Link>
                                .
                              </p>
                            </div>
                          ) : (
                            item.dropdownItems.map((service, index) => (
                              <Link
                                key={service.slug || service._id || index}
                                to={service.href}
                                className="group relative block p-4 sm:p-5 rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-sm hover:border-teal-200/90 hover:shadow-xl hover:shadow-slate-900/10 hover:-translate-y-1 motion-reduce:hover:translate-y-0 transition-all duration-300 ease-out animate-megamenu-card motion-reduce:animate-none motion-reduce:opacity-100 overflow-hidden"
                                style={{
                                  animationDelay: `${180 + index * 65}ms`,
                                }}
                                onClick={closeAllMenus}
                              >
                                <span
                                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
                                  aria-hidden
                                >
                                  <span className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.04] via-transparent to-[#00353E]/[0.06]" />
                                </span>
                                <div className="relative h-44 sm:h-48 w-full bg-slate-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden ring-1 ring-slate-100 group-hover:ring-teal-200/50 transition-[box-shadow,ring-color] duration-300">
                                  {service.image ? (
                                    <img
                                      src={service.image}
                                      alt=""
                                      className="object-cover h-full w-full transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:group-hover:scale-100"
                                    />
                                  ) : (
                                    <span className="px-4 text-center text-xs font-medium text-slate-400 leading-snug line-clamp-3">
                                      {service.title}
                                    </span>
                                  )}
                                  <span
                                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 motion-reduce:hidden group-hover:opacity-100 group-hover:animate-megamenu-shimmer"
                                    aria-hidden
                                  />
                                </div>
                                <h3 className="relative font-semibold text-base sm:text-lg text-[#00353E] group-hover:text-teal-600 mb-2 tracking-tight leading-snug transition-colors duration-300">
                                  {service.title}
                                </h3>
                                <p className="relative text-sm text-slate-600 leading-relaxed line-clamp-4 transition-colors duration-300 group-hover:text-slate-700">
                                  {service.description ||
                                    "View details for this service."}
                                </p>
                              </Link>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Regular Dropdown Menu */}
                {item.dropdown &&
                  !item.megaMenu &&
                  activeDropdown === item.name && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                      onMouseEnter={() => {
                        clearTimeout(timeoutRef.current);
                        setActiveDropdown(item.name);
                      }}
                      onMouseLeave={() => {
                        timeoutRef.current = setTimeout(() => {
                          setActiveDropdown(null);
                        }, DROPDOWN_CLOSE_DELAY_MS);
                      }}
                      style={{
                        opacity: activeDropdown === item.name ? 1 : 0,
                        transform: `translateY(${
                          activeDropdown === item.name ? 0 : "-10px"
                        })`,
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                      }}
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                          onClick={closeAllMenus}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </nav>
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-teal-600 p-2 rounded-md"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 overflow-hidden animate-megamenu-fade-up motion-reduce:animate-none motion-reduce:opacity-100">
            <div className="py-4 space-y-2 px-4">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="border-b border-gray-100 pb-3 last:border-b-0"
                >
                  <div className="flex justify-between items-center">
                    <Link
                      to={item.href}
                      className={`block py-3 ${
                        item.name === "Contact"
                          ? "bg-blue-600 text-white px-4 py-3 rounded-lg w-full text-center"
                          : "text-gray-700 hover:text-teal-600 font-medium"
                      }`}
                      onClick={closeAllMenus}
                    >
                      {item.name}
                    </Link>

                    {(item.dropdown || item.megaMenu) &&
                      item.name !== "Contact" && (
                        <button
                          onClick={() =>
                            setMobileDropdown(
                              mobileDropdown === item.name ? null : item.name
                            )
                          }
                          className="p-2 ml-2"
                        >
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-300 ${
                              mobileDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                  </div>

                  {/* Mobile Services Dropdown - Added scrollbar */}
                  {item.megaMenu &&
                    mobileDropdown === item.name &&
                    item.name !== "Contact" && (
                      <div
                        className="ml-2 mt-2 space-y-3 pr-2 overflow-y-auto max-h-[40vh] transition-all duration-300 custom-scrollbar"
                        style={{
                          maxHeight:
                            mobileDropdown === item.name ? "40vh" : "0",
                        }}
                      >
                        {servicesLoading && item.dropdownItems.length === 0 ? (
                          <p className="text-sm text-gray-500 px-3 py-2">
                            Loading services…
                          </p>
                        ) : (
                          item.dropdownItems.map((service, index) => (
                            <Link
                              key={service.slug || service._id || index}
                              to={service.href}
                              className="block p-3 bg-gray-50 rounded-lg transition-all duration-300"
                              onClick={closeAllMenus}
                            >
                              <h3 className="font-semibold text-gray-900">
                                {service.title}
                              </h3>
                              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                {service.description}
                              </p>
                            </Link>
                          ))
                        )}
                      </div>
                    )}

                  {/* Regular Mobile Dropdown - Added scrollbar */}
                  {item.dropdown &&
                    !item.megaMenu &&
                    mobileDropdown === item.name &&
                    item.name !== "Contact" && (
                      <div
                        className="ml-4 space-y-1 pr-2 overflow-y-auto max-h-[40vh] transition-all duration-300 custom-scrollbar"
                        style={{
                          maxHeight:
                            mobileDropdown === item.name ? "40vh" : "0",
                        }}
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            className="block py-2 px-3 text-sm text-gray-600 hover:text-teal-600 bg-gray-50 rounded transition-colors duration-200"
                            onClick={closeAllMenus}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
