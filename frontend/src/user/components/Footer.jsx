import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Linkedin, Twitter, Facebook } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { normalizeServicesForNav } from "../../utils/serviceNav";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { getServices } = useAuth();
  const [footerServices, setFooterServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await getServices();
        if (cancelled) return;
        if (data?.success && Array.isArray(data.services)) {
          setFooterServices(normalizeServicesForNav(data.services));
        }
      } catch (e) {
        console.error("Failed to load services for footer:", e);
      } finally {
        if (!cancelled) setServicesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [getServices]);

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Industries", href: "/industries" },
    { name: "Projects", href: "/projects" },
    { name: "Credentials", href: "/credentials" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Added horizontal padding for mobile and adjusted for larger screens */}
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="text-2xl font-bold text-teal-400 mb-4">
                Sophic Designs private limited
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Leading MEP consultancy delivering innovative engineering
                solutions across INDIA and beyond since 2014.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services from CMS */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Our Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/services"
                    className="text-teal-400/90 hover:text-teal-300 transition-colors text-sm font-medium"
                  >
                    All services
                  </Link>
                </li>
                {servicesLoading && footerServices.length === 0 ? (
                  <li className="text-gray-500 text-sm">Loading…</li>
                ) : (
                  footerServices.map((service) => (
                    <li key={service.slug || service._id}>
                      <Link
                        to={service.href}
                        className="text-gray-300 hover:text-teal-400 transition-colors"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-teal-400 mt-1 mr-3 flex-shrink-0" />
                  <div className="space-y-2 text-gray-400 text-sm">
                    <p>
                      <span className="text-gray-300">Registered (New Delhi)</span>
                      <br />
                      179 A, 1st Fl., Back Side, Jeewan Nagar, near Muthoot
                      Corp., New Delhi - 110014
                    </p>
                    <p>
                      <span className="text-gray-300">Corporate (Faridabad)</span>
                      <br />
                      H. No. 351, Sector-48, near CIA Chowk, Faridabad - 121001
                      (HR)
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-teal-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-gray-300 space-y-1">
                    <a
                      href="tel:+919910034808"
                      className="block hover:text-teal-400 transition-colors"
                    >
                      Mob: +91 99100 34808
                    </a>
                    <a
                      href="tel:+911292461122"
                      className="block hover:text-teal-400 transition-colors"
                    >
                      Tel: +91 129 2461122
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-teal-400 mr-3" />
                  <a
                    href="mailto:sjamep@gmail.com"
                    className="text-gray-300 hover:text-teal-400 transition-colors text-sm break-all"
                  >
                    sjamep@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Sophic Designs private limited . All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                Terms of Service
              </Link>
              <a
                href="#"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
