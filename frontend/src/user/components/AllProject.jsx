import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getPrincipalExperiencePlusLabel } from "../../utils/principalExperience";

const AllProject = () => {
  const { getProjects } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        const raw = response?.data?.projects;
        const mappedProjects = Array.isArray(raw)
          ? raw.map((project) => ({
              name: project.title,
              location: project.location,
              year: project.year,
              type: project.category,
              image: project.images?.[0]?.url || "",
              details: project.description,
              innovation: project.highlights?.[0] || "",
              features: project.highlights || [],
              isFeatured: project.featured,
            }))
          : [];
        setProjects(mappedProjects);
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
        console.error("Project fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [getProjects]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-xl text-[#00353E]">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-red-500 text-xl max-w-md text-center p-6 bg-red-50 rounded-lg">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#00353E] text-white rounded hover:bg-[#002229] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#00353E" }}
          >
            Our Portfolio of Excellence
          </h1>
          <div className="w-32 h-1.5 bg-[#00353E] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our innovative MEP solutions across diverse sectors - from
            hyperscale data centers to luxury hospitality and critical
            infrastructure.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: "200+", label: "Projects Completed" },
            { value: "15", label: "Industry Sectors" },
            { value: getPrincipalExperiencePlusLabel(), label: "Years Experience" },
            { value: "98%", label: "Client Retention" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg text-center border border-gray-100 shadow-sm"
            >
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: "#00353E" }}
              >
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {/* Project Image */}
              <div className="h-56 overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed w-full h-full flex items-center justify-center">
                    <span className="text-gray-500 text-sm">
                      {project.name} Image
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* Project Header */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3
                      className="text-xl font-bold"
                      style={{ color: "#00353E" }}
                    >
                      {project.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm">{project.location}</span>
                      {project.year && <span className="mx-2">•</span>}
                      {project.year && (
                        <span className="text-sm">{project.year}</span>
                      )}
                    </div>
                  </div>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full capitalize"
                    style={{ backgroundColor: "#e6f7ff", color: "#00353E" }}
                  >
                    {project.type}
                  </span>
                </div>

                {/* Project Details */}
                {project.details && (
                  <p className="text-gray-700 mt-3 mb-4">{project.details}</p>
                )}

                {/* Innovation Highlight */}
                {project.innovation && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        style={{ color: "#00353E" }}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span
                        className="font-semibold"
                        style={{ color: "#00353E" }}
                      >
                        Innovation
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">
                      {project.innovation}
                    </p>
                  </div>
                )}

                {/* Features List */}
                <div className="mt-5">
                  <h4 className="font-medium mb-2" style={{ color: "#00353E" }}>
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Industry Sectors Section */}
        <div className="mt-20 pt-12 border-t">
          <h2
            className="text-3xl font-bold text-center mb-4"
            style={{ color: "#00353E" }}
          >
            Industry Sectors We Serve
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Our MEP expertise spans across diverse sectors, delivering tailored
            solutions for each industry's unique requirements.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Data Centers", icon: "📊", projects: "15+" },
              { name: "Healthcare", icon: "🏥", projects: "12+" },
              { name: "Hospitality", icon: "🏨", projects: "20+" },
              { name: "Residential", icon: "🏠", projects: "45+" },
              { name: "Commercial", icon: "🏢", projects: "30+" },
              { name: "Industrial", icon: "🏭", projects: "18+" },
              { name: "Institutional", icon: "🎓", projects: "25+" },
              { name: "Infrastructure", icon: "🌉", projects: "22+" },
            ].map((sector, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{sector.icon}</div>
                <h3
                  className="font-bold text-lg mb-1"
                  style={{ color: "#00353E" }}
                >
                  {sector.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {sector.projects} projects
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProject;
