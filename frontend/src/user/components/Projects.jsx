import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  Calendar,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { getProjects } = useAuth();
  const [projects, setProjects] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        const mappedProjects = response?.data?.projects?.map((project) => ({
          id: project.id,
          title: project.title,
          location: project.location,
          year: project.year,
          category: project.category,
          image: project.images?.[0]?.url || "",
          description: project.description,
          highlights: project.highlights || [],
          scope: project.scope,
          value: project.value,
          isFeatured: project.featured,
        }));

        // Filter featured projects
        const featured = mappedProjects.filter((project) => project.isFeatured);

        setProjects(mappedProjects);
        setFeaturedProjects(featured);
        setCurrentSlide(0); // Reset to first slide
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
        console.error("Project fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [getProjects]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length
    );
  };

  const currentProject = featuredProjects[currentSlide];

  if (loading) {
    return (
      <section
        id="projects"
        className="max-w-7xl mx-auto px-4 py-16 text-center"
      >
        <p>Loading projects...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="projects"
        className="max-w-7xl mx-auto px-4 py-16 text-center"
      >
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  // Don't render featured projects section if there are no featured projects
  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing our expertise through successful project deliveries
            across various sectors and scales.
          </p>
        </div>

        {/* Project Slider */}
        <div className="relative bg-gray-50 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative h-96 lg:h-auto">
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Project Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {featuredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? "bg-white" : "bg-white/50"
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12">
              <div className="mb-6">
                <div className="flex items-center space-x-4 text-sm text-teal-600 mb-2">
                  <span className="bg-teal-100 px-3 py-1 rounded-full">
                    {currentProject.category}
                  </span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {currentProject.year}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentProject.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {currentProject.location}
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {currentProject.description}
              </p>

              {/* Project Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-teal-600">
                    {currentProject.scope}
                  </div>
                  <div className="text-sm text-gray-600">Project Scope</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-teal-600">
                    {currentProject.value}
                  </div>
                  <div className="text-sm text-gray-600">Project Value</div>
                </div>
              </div>

              {/* Technical Highlights */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Technical Highlights:
                </h4>
                <ul className="space-y-2">
                  {currentProject.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* All Projects CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Explore Our Complete Portfolio
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Discover more of our successful projects and see how we've helped
              clients achieve their engineering goals across various industries.
            </p>
            <a href="#contact" className="btn-primary">
              Request Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
