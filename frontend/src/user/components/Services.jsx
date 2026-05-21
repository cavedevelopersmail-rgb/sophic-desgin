import React, { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Services = ({ compactTop = false }) => {
  const { getServices } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data?.services || []);
      } catch (error) {
        console.error("Failed to load services:", error);
      }
    };

    fetchServices();
  }, [getServices]);

  const sectionClass = compactTop
    ? "bg-white pt-6 sm:pt-8 pb-12 md:pb-16 overflow-x-hidden"
    : "section-padding bg-white overflow-x-hidden";

  return (
    <section id="services" className={sectionClass}>
      <div className="container-custom">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive MEP engineering solutions tailored to meet the unique
            requirements of every project, from concept to completion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
              <div
                key={service._id}
                className="min-w-0 flex flex-col bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {service.image?.url && (
                  <div className="w-full h-44 shrink-0 overflow-hidden bg-slate-100">
                    <img
                      src={service.image.url}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                      <Settings className="h-6 w-6 text-teal-600" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 break-words">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-4 break-words line-clamp-6 sm:line-clamp-none">
                    {service.shortDescription}
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate(`/services/id/${service._id}`)}
                    className="mt-auto w-full py-2.5 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
              Our team of experts can design tailored MEP solutions that
              perfectly match your project requirements and budget constraints.
            </p>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 bg-white text-teal-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Discuss Your Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
