import React from "react";
import {
  Flame,
  Fan,
  Snowflake,
  Refrigerator,
  Filter,
  ClipboardList,
  LayoutGrid,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Contact from "../Contact";
import ControlSystems from "../../../assets/HVAC/ControlSystems.jpg";
import IAQManagement from "../../../assets/HVAC/IAQManagement.jpg";
import RefrigerationSystems from "../../../assets/HVAC/RefrigerationSystems.jpg";
import AirConditioning from "../../../assets/HVAC/AirConditioning.jpg";
import HeatingSystems from "../../../assets/HVAC/HeatingSystems.jpg";
import VentilationSystems from "../../../assets/HVAC/VentilationSystems.jpg";

const HvacRefrigeration = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          HVAC & Refrigeration Systems
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Designing optimal thermal comfort, indoor air quality, and precise
          climate control solutions for all environments
        </p>
      </div>

      {/* Core Objective */}
      <section className="mb-20 bg-gradient-to-r from-blue-50 to-sky-50 p-8 rounded-2xl shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6 flex items-center">
            <ClipboardList className="mr-3 text-blue-600" size={28} />
            Core Objective
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            To ensure optimal thermal comfort, indoor air quality (IAQ), and
            precise climate control for occupants and processes through advanced
            heating, ventilation, air conditioning, and refrigeration solutions.
          </p>
        </div>
      </section>

      {/* Key Components */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-blue-800 mb-10 text-center">
          Key System Components & Functions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Heating */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Flame className="text-orange-500 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Heating Systems
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={HeatingSystems}
                alt="Heating Systems"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>High-efficiency boilers and furnaces</li>
              <li>Heat pump systems (air/ground source)</li>
              <li>Radiant floor heating solutions</li>
              <li>District heating integration</li>
            </ul>
          </div>

          {/* Ventilation */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Fan className="text-blue-500 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Ventilation Systems
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={VentilationSystems}
                alt="Ventilation Systems"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Air handling units (AHUs) design</li>
              <li>Energy recovery ventilators (ERVs)</li>
              <li>Ductwork optimization and balancing</li>
              <li>Demand-controlled ventilation</li>
            </ul>
          </div>

          {/* Air Conditioning */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Snowflake className="text-cyan-500 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Air Conditioning
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={AirConditioning}
                alt="Air Conditioning"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Centralized: Chilled water plants</li>
              <li>Cooling tower optimization</li>
              <li>Decentralized: VRF/VRV systems</li>
              <li>High-efficiency split units</li>
            </ul>
          </div>

          {/* Refrigeration */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Refrigerator className="text-indigo-500 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Refrigeration Systems
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={RefrigerationSystems}
                alt="Refrigeration Systems"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Commercial cold storage solutions</li>
              <li>Industrial process chillers</li>
              <li>Walk-in freezers and refrigerators</li>
              <li>Cascade refrigeration systems</li>
            </ul>
          </div>

          {/* IAQ Management */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Filter className="text-emerald-500 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                IAQ Management
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={IAQManagement}
                alt="IAQ Management"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>HEPA/UV filtration systems</li>
              <li>Precision humidity control</li>
              <li>CO₂ monitoring and ventilation</li>
              <li>VOC and particulate management</li>
            </ul>
          </div>

          {/* Control Systems */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-500 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-800">
                Control Systems
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={ControlSystems}
                alt="Control Systems"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Building Automation Systems (BAS)</li>
              <li>Smart zoning and scheduling</li>
              <li>IoT-enabled monitoring</li>
              <li>Predictive maintenance solutions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Design Considerations */}
      <section className="mb-20 bg-blue-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-semibold text-blue-800 mb-8 text-center">
          Design & Engineering Considerations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Precise Load Calculation",
              desc: "Manual J/J-like methods for accurate sizing",
            },
            {
              title: "Energy Efficiency",
              desc: "High SEER/COP equipment, VFD-driven systems",
            },
            {
              title: "Zoning Strategies",
              desc: "Customized temperature control per space",
            },
            {
              title: "Acoustic Engineering",
              desc: "Noise control through acoustic dampening",
            },
            {
              title: "Renewable Integration",
              desc: "Solar-assisted HVAC and geothermal options",
            },
            {
              title: "Lifecycle Cost Analysis",
              desc: "Balancing initial cost with operational efficiency",
            },
            {
              title: "Resilience Planning",
              desc: "Redundancy and backup systems design",
            },
            {
              title: "Smart Building Integration",
              desc: "IoT connectivity and building automation",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg text-blue-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Applications */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-blue-800 mb-8 text-center flex items-center justify-center">
          <LayoutGrid className="mr-3 text-blue-600" size={28} />
          Applications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Commercial Buildings",
              desc: "Offices, retail malls, and hospitality venues",
            },
            {
              title: "Healthcare Facilities",
              desc: "Hospitals, labs, and clean rooms",
            },
            {
              title: "Industrial Plants",
              desc: "Process cooling and environmental control",
            },
            {
              title: "Data Centers",
              desc: "Precision cooling for critical infrastructure",
            },
            {
              title: "Educational Institutions",
              desc: "Schools, universities, and research centers",
            },
            {
              title: "Residential Complexes",
              desc: "Luxury apartments and smart homes",
            },
          ].map((app, index) => (
            <div
              key={index}
              className="border border-blue-100 rounded-xl p-6 bg-gradient-to-br from-white to-blue-50 hover:to-blue-100 transition-all"
            >
              <h3 className="text-xl font-bold text-blue-700 mb-3">
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

export default HvacRefrigeration;
