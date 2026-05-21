import React from "react";
import Contact from "../Contact";
import AudiovisualSystems from "../../../assets/lowVoltage/AudiovisualSystems.jpg";
import SystemIntegration from "../../../assets/lowVoltage/SystemIntegration.jpg";
import CommunicationSystems from "../../../assets/lowVoltage/CommunicationSystems.jpg";
import SecuritySystems from "../../../assets/lowVoltage/SecuritySystems.jpg";
import NetworkInfrastructure from "../../../assets/lowVoltage/NetworkInfrastructure.jpg";
import AutomationSystems from "../../../assets/lowVoltage/AutomationSystems.jpg";

const LowVoltageSystems = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
          Low Voltage Systems
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Designing smart, secure, and interconnected building operations
          through integrated low-power systems
        </p>
      </div>

      {/* Core Objective */}
      <section className="mb-20 bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-2xl shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-purple-800 mb-6 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-3 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Core Objective
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            To enable smart, secure, and interconnected building operations
            through integrated low-power systems that optimize functionality,
            enhance safety, and improve user experience.
          </p>
        </div>
      </section>

      {/* Key Components */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-purple-800 mb-10 text-center">
          Key System Components & Functions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Security */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-800">
                Security Systems
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={SecuritySystems}
                alt="Security camera installation"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                IP cameras with analytics (facial recognition, motion tracking)
              </li>
              <li>Biometric access control and card readers</li>
              <li>Intrusion detection sensors and alarms</li>
              <li>Perimeter security and turnstile systems</li>
            </ul>
          </div>

          {/* Communication */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-800">
                Communication Systems
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={CommunicationSystems}
                alt="Structured cabling system"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Structured cabling (Cat 6/6A, fiber optics)</li>
              <li>Public address (PA) and intercom systems</li>
              <li>Voice over IP (VoIP) telephony</li>
              <li>Emergency communication systems</li>
            </ul>
          </div>

          {/* Automation */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-800">
                Automation Systems
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={AutomationSystems}
                alt="Building automation control panel"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Integrated Building Management Systems (IBMS/BAS)</li>
              <li>Centralized control of HVAC, lighting, security</li>
              <li>Smart lighting and blind controls</li>
              <li>Voice-controlled automation systems</li>
            </ul>
          </div>

          {/* Audiovisual */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-800">
                Audiovisual Systems
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={AudiovisualSystems}
                alt="Conference room AV system"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Digital signage and information displays</li>
              <li>Conference room AV systems</li>
              <li>Background music and paging systems</li>
              <li>Video conferencing solutions</li>
            </ul>
          </div>

          {/* Network Infrastructure */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-500 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-800">
                Network Infrastructure
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={NetworkInfrastructure}
                alt="Data center infrastructure"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Data center design and implementation</li>
              <li>Wi-Fi mesh networks and access points</li>
              <li>Server room planning and optimization</li>
              <li>Network security infrastructure</li>
            </ul>
          </div>

          {/* Integration */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-teal-500 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-800">
                System Integration
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={SystemIntegration}
                alt="System integration control room"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Unified platforms (BACnet, KNX, Modbus)</li>
              <li>Interoperability between subsystems</li>
              <li>Centralized monitoring and control</li>
              <li>Custom API development for integration</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Design Considerations */}
      <section className="mb-20 bg-purple-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-semibold text-purple-800 mb-8 text-center">
          Design & Engineering Considerations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "System Integration",
              desc: "Unified platforms (BACnet, KNX) for interoperability",
            },
            {
              title: "Cybersecurity",
              desc: "Encryption, VLANs, regular firmware updates",
            },
            {
              title: "Scalability",
              desc: "Modular design for future tech upgrades",
            },
            {
              title: "Cable Management",
              desc: "Pathways, containment, labeling standards",
            },
            {
              title: "Redundancy Planning",
              desc: "Failover systems for critical operations",
            },
            {
              title: "Energy Efficiency",
              desc: "Low-power components and smart controls",
            },
            {
              title: "User Experience",
              desc: "Intuitive interfaces and control systems",
            },
            {
              title: "Compliance Standards",
              desc: "Meeting industry regulations and certifications",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg text-purple-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Applications */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-purple-800 mb-8 text-center flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-3 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          Applications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Smart Buildings",
              desc: "Office complexes and commercial spaces",
            },
            {
              title: "Educational Campuses",
              desc: "Schools, universities, and research centers",
            },
            {
              title: "Industrial Facilities",
              desc: "Manufacturing plants and warehouses",
            },
            {
              title: "Healthcare Institutions",
              desc: "Hospitals, clinics, and medical centers",
            },
            {
              title: "Transportation Hubs",
              desc: "Airports, train stations, and bus terminals",
            },
            {
              title: "Hospitality Venues",
              desc: "Hotels, resorts, and conference centers",
            },
          ].map((app, index) => (
            <div
              key={index}
              className="border border-purple-100 rounded-xl p-6 bg-gradient-to-br from-white to-purple-50 hover:to-purple-100 transition-all"
            >
              <h3 className="text-xl font-bold text-purple-700 mb-3">
                {app.title}
              </h3>
              <p className="text-gray-600">{app.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default LowVoltageSystems;
