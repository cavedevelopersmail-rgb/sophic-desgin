import { Helmet } from "react-helmet";
import {
  SITE_NAME_SHORT,
  DEFAULT_DESCRIPTION,
  getSiteOrigin,
} from "../constants/siteMeta";

/**
 * @param {{
 *   title?: string,
 *   description?: string,
 *   keywords?: string,
 *   pathname?: string,
 *   image?: string,
 *   type?: string,
 *   jsonLd?: object,
 *   noIndex?: boolean,
 * }} props
 */
export default function PageSeo({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  pathname = "",
  image,
  type = "website",
  jsonLd,
  noIndex = false,
}) {
  const origin = getSiteOrigin();
  const canonical = origin && pathname ? `${origin}${pathname}` : "";
  const resolvedTitle = title
    ? `${title} | ${SITE_NAME_SHORT}`
    : `${SITE_NAME_SHORT} — MEP Consultants Delhi NCR`;

  const ogImage = image && origin && !/^https?:/i.test(image) ? `${origin}${image.startsWith("/") ? image : `/${image}`}` : image || "";

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}

      {/* Open Graph */}
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:site_name" content={SITE_NAME_SHORT} />
      <meta property="og:locale" content="en_IN" />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}

      {canonical ? <link rel="canonical" href={canonical} /> : null}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="googlebot" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="geo.region" content="IN-HR;IN-DL" />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}
