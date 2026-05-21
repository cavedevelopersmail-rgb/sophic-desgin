import React from "react";
import Services from "./Services";

/** Full-page services listing; detail pages use stable `/services/id/:id` (optional slug URL still supported). */
const ServicesPage = () => {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <Services compactTop pageVariant="standalone" />
    </div>
  );
};

export default ServicesPage;
