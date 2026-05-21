import React from "react";
import { Building2, Factory, GraduationCap, Landmark } from "lucide-react";

const Industries = () => {
  const industries = [
    {
      id: 1,
      title: "Real Estate",
      icon: Building2,
      description:
        "Residential and commercial developments with integrated MEP solutions",
      projects: "200+ Projects",
      specialties: [
        "High-rise residential complexes",
        "Commercial office buildings",
        "Mixed-use developments",
        "Luxury housing projects",
      ],
    },
    {
      id: 2,
      title: "Industrial",
      icon: Factory,
      description:
        "Manufacturing facilities and industrial complexes with specialized systems",
      projects: "150+ Projects",
      specialties: [
        "Manufacturing plants",
        "Warehouses and logistics",
        "Process industries",
        "Clean room facilities",
      ],
    },
    {
      id: 3,
      title: "Institutional",
      icon: GraduationCap,
      description:
        "Educational and healthcare facilities requiring specialized MEP design",
      projects: "100+ Projects",
      specialties: [
        "Educational institutions",
        "Healthcare facilities",
        "Research laboratories",
        "Sports complexes",
      ],
    },
    {
      id: 4,
      title: "Government",
      icon: Landmark,
      description:
        "Public sector projects with stringent compliance and safety requirements",
      projects: "75+ Projects",
      specialties: [
        "Government offices",
        "Public infrastructure",
        "Defense facilities",
        "Municipal buildings",
      ],
    },
  ];

  return (
    <section
      id="industries"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Industries We Serve
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering specialized MEP solutions across diverse sectors, each
            with unique requirements and industry standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry) => {
            const IconComponent = industry.icon;

            return (
              <div
                key={industry.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-600 transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-teal-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {industry.title}
                  </h3>
                  <div className="text-sm font-semibold text-teal-600 mb-3">
                    {industry.projects}
                  </div>
                </div>

                <p className="text-gray-600 text-center mb-6">
                  {industry.description}
                </p>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-center">
                    Specialties:
                  </h4>
                  <ul className="space-y-2">
                    {industry.specialties.map((specialty, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mr-3 flex-shrink-0"></div>
                        {specialty}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Impact Across Industries
            </h3>
            <p className="text-gray-600">
              Delivering excellence across diverse sectors since 2014
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">525+</div>
              <div className="text-gray-600">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">30M+</div>
              <div className="text-gray-600">Sq.Ft. Designed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">15+</div>
              <div className="text-gray-600">States Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
