import { useLocation } from "react-router-dom";
import PageSeo from "./PageSeo";
import {
  ROUTE_SEO,
  SITE_NAME_FULL,
  DEFAULT_DESCRIPTION,
  getSiteOrigin,
} from "../constants/siteMeta";

/**
 * Paths where child routes set dynamic Helmet meta (blogs, service detail via slug/id).
 */
function shouldDeferRouteSeoToChild(pathname) {
  if (pathname.startsWith("/blog/")) return true;
  if (pathname.startsWith("/services/id/")) return true;
  const m = pathname.match(/^\/services\/([^/]+)$/);
  if (!m || pathname === "/services") return false;
  return m[1] !== "id";
}

function organizationLd(origin) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": origin ? `${origin}/#organization` : undefined,
        name: SITE_NAME_FULL,
        alternateName: "Sophic Designs",
        url: origin || undefined,
        email: "sjameep@gmail.com",
        telephone: "+91-129-2461122",
        description:
          "Mechanical, Electrical & Plumbing (MEP) consulting engineers serving healthcare, hospitality, infrastructure, residential, datacenter and industrial clients across India.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "H.No. 351, Sector 48, Near Noorani Masjid, Near Muthoot Corp.",
          addressLocality: "Faridabad",
          postalCode: "121001",
          addressRegion: "Haryana",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 28.4316,
          longitude: 77.3144,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "India",
        },
      },
    ],
  };
}

/** Default meta for landing layout pages (excluding blog & service-detail children). */
export default function LayoutSeo() {
  const { pathname } = useLocation();
  if (shouldDeferRouteSeoToChild(pathname)) return null;

  const cfg = ROUTE_SEO[pathname];
  const origin = getSiteOrigin();
  const title = cfg?.title ?? "";
  const description = cfg?.description ?? DEFAULT_DESCRIPTION;
  const keywords = cfg?.keywords;

  return (
    <PageSeo
      title={title}
      description={description}
      keywords={keywords}
      pathname={pathname}
      jsonLd={pathname === "/" ? organizationLd(origin) : undefined}
    />
  );
}
