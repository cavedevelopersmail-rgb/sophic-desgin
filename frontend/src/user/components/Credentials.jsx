import React from "react";
import { Award, Shield, CheckCircle, Star } from "lucide-react";

const Credentials = () => {
  const certifications = [
    {
      id: 1,
      name: "NFPA",
      fullName: "National Fire Protection Association",
      description: "Certified for fire safety and protection systems design",
      icon: Shield,
      color: "bg-red-100 text-red-600",
    },
    {
      id: 2,
      name: "NBC",
      fullName: "National Building Code",
      description: "Compliance with Indian building standards and regulations",
      icon: CheckCircle,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      name: "LEED",
      fullName: "Leadership in Energy and Environmental Design",
      description: "Green building design and sustainability certification",
      icon: Star,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      name: "ASHRAE",
      fullName:
        "American Society of Heating, Refrigerating and Air-Conditioning Engineers",
      description: "HVAC systems design and energy efficiency standards",
      icon: Award,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const memberships = [
    "Institution of Engineers (India)",
    "Indian Society of Heating, Refrigerating and Air Conditioning Engineers",
    "Fire and Security Association of India",
    "Indian Green Building Council",
    "Confederation of Indian Industry",
  ];

  const achievements = [
    {
      title: "Excellence in MEP Design",
      year: "2023",
      organization: "Indian Building Congress",
    },
    {
      title: "Sustainable Engineering Award",
      year: "2022",
      organization: "Green Building Council",
    },
    {
      title: "Innovation in Fire Safety",
      year: "2021",
      organization: "FSAI",
    },
  ];

  return (
    <section
      id="credentials"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Credentials & Certifications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to excellence is validated through industry-leading
            certifications and professional memberships.
          </p>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Professional Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => {
              const IconComponent = cert.icon;

              return (
                <div
                  key={cert.id}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 ${cert.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {cert.name}
                  </h4>
                  <p className="text-sm font-medium text-gray-600 mb-3">
                    {cert.fullName}
                  </p>
                  <p className="text-sm text-gray-500">{cert.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Professional Memberships */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Professional Memberships
            </h3>
            <ul className="space-y-4">
              {memberships.map((membership, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{membership}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Awards & Recognition
            </h3>
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="border-l-4 border-teal-600 pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {achievement.organization}
                  </p>
                  <p className="text-sm text-teal-600 font-medium">
                    {achievement.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quality Standards */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Quality Standards We Follow
            </h3>
            <p className="text-gray-600">
              Ensuring excellence through adherence to international standards
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-teal-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ISO 9001:2015
              </h4>
              <p className="text-sm text-gray-600">
                Quality Management Systems
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Award className="h-6 w-6 text-teal-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ASHRAE Standards
              </h4>
              <p className="text-sm text-gray-600">HVAC Design Guidelines</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-teal-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                BIS Standards
              </h4>
              <p className="text-sm text-gray-600">
                Bureau of Indian Standards
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-teal-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                IGBC Standards
              </h4>
              <p className="text-sm text-gray-600">
                Green Building Certification
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
