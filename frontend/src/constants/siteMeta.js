/**
 * Site branding & default SEO — Sophic Designs (company profile).
 * Set VITE_SITE_URL=https://yourdomain.com for correct canonical / Open Graph URLs in production.
 */
export const SITE_NAME_FULL = "Sophic Designs Pvt. Ltd.";
export const SITE_NAME_SHORT = "Sophic Designs";

export const DEFAULT_TITLE =
  "Sophic Designs | MEP Consultants Delhi NCR — Mechanical Electrical Plumbing";

export const DEFAULT_DESCRIPTION =
  "Sophic Designs Pvt. Ltd. — MEP engineering consultants based in Delhi (registered) & Faridabad design office. Design of mechanical, electrical, plumbing & fire-life-safety systems for hospitals, hotels, datacenters, residential, commercial & industrial projects — concept to commissioning.";

export const DEFAULT_KEYWORDS =
  "MEP consultants Delhi, MEP design Faridabad, mechanical electrical plumbing consultancy, HVAC consultants India, fire protection design, ELV consultancy, NBC compliant MEP, datacenter MEP design, Sophic Designs";

/** @returns {string} Origin without trailing slash */
export function getSiteOrigin() {
  const fromEnv =
    typeof import.meta.env.VITE_SITE_URL === "string"
      ? import.meta.env.VITE_SITE_URL.trim().replace(/\/$/, "")
      : "";
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return "";
}

export const ROUTE_SEO = {
  "/": {
    title: "MEP Consultants Delhi NCR | Mechanical, Electrical & Plumbing",
    description: DEFAULT_DESCRIPTION,
    keywords:
      "MEP consultants, Delhi NCR, Faridabad, HVAC design, fire protection engineering, plumbing design",
  },
  "/about": {
    title: "About Us — MEP Engineering Practice",
    description:
      "Learn about Sophic Designs: MEP consultancy since 2014, multidisciplinary team, code-compliant design across India.",
    keywords: "about Sophic Designs, principal consultant MEP, ASHRAE ISHRAE firm",
  },
  "/services": {
    title: "Our Services — MEP Design & Advisory",
    description:
      "Public health engineering, fire protection & life safety, HVAC, electrical, LV/ELV, and miscellaneous MEP systems — feasibility through commissioning.",
    keywords:
      "MEP services India, HVAC design consultancy, electrical design consultancy, ELV IBMS DCIM",
  },
  "/industries": {
    title: "Industries & Sectors We Serve",
    description:
      "MEP consultancy for hospitals, hotels, datacenters, malls, airports, highways, institutional, residential and industrial projects.",
    keywords: "hospital MEP, hotel HVAC, datacenter cooling, airport MEP, industrial piping",
  },
  "/projects": {
    title: "Projects & Experience",
    description:
      "Selected project experience across residential, hospitality, offices, infrastructure, industries, and specialised facilities.",
    keywords: "MEP projects India, consulting portfolio, turnkey design assignments",
  },
  "/credentials": {
    title: "Credentials & Certifications",
    description:
      "Company credentials and professional capabilities for MEP design, peer review and statutory liaison.",
    keywords: "MEP credentials, engineering certifications, consultancy qualifications",
  },
  "/contact": {
    title: "Contact Us — Delhi & Faridabad Offices",
    description:
      "Contact Sophic Designs for MEP design appointments: Registered office Delhi NCR Design Office Sector-48 Faridabad. Tel +91 129 2461122, Mobile +91 9910034808.",
    keywords: "contact MEP consultants, Sophic Designs email sjameep@gmail.com, Faridabad MEP office",
  },
  "/leaders": {
    title: "Leadership Team",
    description:
      "Principal consultants and senior specialists in electrical, mechanical, HVAC, LV/IBMS and public health engineering.",
    keywords: "Sophic Designs team, principal consultant MEP, senior consultants",
  },
  "/privacy": {
    title: "Privacy Policy",
    description: "Privacy policy for Sophic Designs website.",
    keywords: "",
  },
  "/terms": {
    title: "Terms of Use",
    description: "Terms of use for Sophic Designs website.",
    keywords: "",
  },
  "/allBlogs": {
    title: "Blog — Insights & Updates",
    description: "Articles and updates from Sophic Designs on MEP engineering and projects.",
    keywords: "MEP blog, engineering insights",
  },
};
