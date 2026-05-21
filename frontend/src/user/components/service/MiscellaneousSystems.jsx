import React from "react";
import {
  Settings,
  ArrowUpDown,
  Flame,
  BatteryCharging,
  Factory,
  FlaskConical,
  Shield,
  AlertCircle,
  RefreshCw,
  Home,
  Hospital,
  FactoryIcon,
  Cloud,
  Server,
  ArrowRight,
  HardHat,
  Gauge,
  Thermometer,
  Wind,
} from "lucide-react";
import Contact from "../Contact";

const MiscellaneousSystems = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center bg-blue-100 text-blue-700 rounded-full p-4 mb-6">
          <Settings size={48} className="text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Miscellaneous Systems
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Specialized engineering solutions for complex operational needs in
          critical facilities
        </p>
      </div>

      {/* Core Objective */}
      <section className="mb-20 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6 flex items-center">
            <FlaskConical className="mr-3 text-blue-600" size={28} />
            Core Objective
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            To support specialized operational needs in complex facilities
            through niche engineering solutions.
          </p>
        </div>
      </section>

      {/* Key Components */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-blue-800 mb-10 text-center">
          Key Components & Functions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Vertical Transport */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <ArrowUpDown className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Vertical Transport
              </h3>
            </div>
            <div className="h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-4 p-4 flex flex-col justify-center">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 font-semibold">Elevators</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Traction/Hydraulic
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 font-semibold">Escalators</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 font-semibold">Dumbwaiters</div>
                </div>
              </div>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>People and material movement systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Accessibility compliance solutions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>High-density traffic management</span>
              </li>
            </ul>
          </div>

          {/* Fuel & Gas Systems */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <Flame className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Fuel & Gas Systems
              </h3>
            </div>
            <div className="h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-4 p-4 flex flex-col justify-center">
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="text-4xl text-orange-500 mb-1">🔥</div>
                  <div className="text-sm font-medium">LPG/CNG Systems</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl text-blue-400 mb-1">💨</div>
                  <div className="text-sm font-medium">Medical Gases</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl text-red-500 mb-1">⚠️</div>
                  <div className="text-sm font-medium">Leak Detection</div>
                </div>
              </div>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Storage tanks and pipeline networks</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Hospital gas systems (O₂, N₂)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>ISO 7396-1 compliant installations</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Explosion-proof safety systems</span>
              </li>
            </ul>
          </div>

          {/* Energy Management */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <BatteryCharging className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Energy Management
              </h3>
            </div>
            <div className="h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-4 p-4 flex flex-col justify-center">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 font-semibold">
                    Sub-metering
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 font-semibold">
                    BMS Integration
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 font-semibold">
                    Peak Shaving
                  </div>
                </div>
                <div className="col-span-3 bg-white p-3 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 font-semibold">
                    Real-time Monitoring
                  </div>
                </div>
              </div>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Energy consumption analytics</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Demand response optimization</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Load forecasting and management</span>
              </li>
            </ul>
          </div>

          {/* Industrial Utilities */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <Factory className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Industrial Utilities
              </h3>
            </div>
            <div className="h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-4 p-4 flex flex-col justify-center">
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="text-4xl text-gray-400 mb-1">💨</div>
                  <div className="text-sm font-medium">Compressed Air</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl text-red-500 mb-1">♨️</div>
                  <div className="text-sm font-medium">Steam Systems</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl text-blue-400 mb-1">❄️</div>
                  <div className="text-sm font-medium">Process Cooling</div>
                </div>
              </div>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Compressed air generation & distribution</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>High-pressure steam networks</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Industrial cooling solutions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Utility distribution manifolds</span>
              </li>
            </ul>
          </div>

          {/* Specialty Systems */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <FlaskConical className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Specialty Systems
              </h3>
            </div>
            <div className="h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-4 p-4 flex flex-col justify-center">
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="text-4xl text-purple-500 mb-1">🧪</div>
                  <div className="text-sm font-medium">Lab Manifolds</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl text-cyan-500 mb-1">📦</div>
                  <div className="text-sm font-medium">Pneumatic Tubes</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl text-yellow-500 mb-1">☀️</div>
                  <div className="text-sm font-medium">Solar Thermal</div>
                </div>
              </div>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Laboratory gas distribution systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Material transport pneumatic networks</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Concentrated solar power plants</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Special purpose utility systems</span>
              </li>
            </ul>
          </div>

          {/* System Integration */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-6 rounded-xl shadow-lg text-white">
            <h3 className="text-xl font-bold mb-4">
              Integrated System Solutions
            </h3>
            <p className="mb-6">
              Our holistic approach ensures seamless integration of specialized
              systems
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-800 rounded-full p-2 mr-3">
                  <Settings size={18} />
                </div>
                <span>Cross-system interoperability</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-800 rounded-full p-2 mr-3">
                  <Gauge size={18} />
                </div>
                <span>Centralized monitoring interfaces</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-800 rounded-full p-2 mr-3">
                  <RefreshCw size={18} />
                </div>
                <span>Lifecycle maintenance planning</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-800 rounded-full p-2 mr-3">
                  <HardHat size={18} />
                </div>
                <span>Compliance documentation packages</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Considerations */}
      <section className="mb-20 bg-blue-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-semibold text-blue-800 mb-8 text-center">
          Design Considerations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Shield size={24} className="text-blue-600" />,
              title: "Regulatory Compliance",
              desc: "PESO for fuel storage, ASME for pressure systems",
            },
            {
              icon: <AlertCircle size={24} className="text-blue-600" />,
              title: "Safety Protocols",
              desc: "Gas detection alarms, explosion-proof fittings",
            },
            {
              icon: <RefreshCw size={24} className="text-blue-600" />,
              title: "Efficiency Optimization",
              desc: "Heat recovery from exhaust gases, VFD systems",
            },
            {
              icon: <Home size={24} className="text-blue-600" />,
              title: "Space Optimization",
              desc: "Compact layouts for mechanical rooms",
            },
            {
              icon: <Thermometer size={24} className="text-blue-600" />,
              title: "Environmental Control",
              desc: "Ventilation requirements for hazardous areas",
            },
            {
              icon: <Wind size={24} className="text-blue-600" />,
              title: "Pressure Management",
              desc: "Regulation systems for gas networks",
            },
            {
              icon: <Gauge size={24} className="text-blue-600" />,
              title: "Performance Monitoring",
              desc: "Remote diagnostics and predictive maintenance",
            },
            {
              icon: <ArrowRight size={24} className="text-blue-600" />,
              title: "Future Expansion",
              desc: "Modular designs for system scalability",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-3">{item.icon}</div>
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
          <FactoryIcon className="mr-3 text-blue-600" size={28} />
          Applications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Hospital size={32} className="text-blue-600" />,
              title: "Healthcare Facilities",
              desc: "Medical gas systems, patient transport",
            },
            {
              icon: <FlaskConical size={32} className="text-blue-600" />,
              title: "Research Laboratories",
              desc: "Specialty gas manifolds, utility systems",
            },
            {
              icon: <Factory size={32} className="text-blue-600" />,
              title: "Manufacturing Units",
              desc: "Industrial utilities, material handling",
            },
            {
              icon: <Cloud size={32} className="text-blue-600" />,
              title: "Airports & Terminals",
              desc: "People movers, baggage systems",
            },
            {
              icon: <Home size={32} className="text-blue-600" />,
              title: "High-Rise Buildings",
              desc: "Vertical transportation solutions",
            },
            {
              icon: <Server size={32} className="text-blue-600" />,
              title: "Data Centers",
              desc: "Specialized cooling systems",
            },
            {
              icon: <BatteryCharging size={32} className="text-blue-600" />,
              title: "Energy Plants",
              desc: "Solar thermal systems, co-generation",
            },
            {
              icon: <HardHat size={32} className="text-blue-600" />,
              title: "Industrial Complexes",
              desc: "Integrated utility distribution",
            },
          ].map((app, index) => (
            <div
              key={index}
              className="border border-blue-100 rounded-xl p-5 bg-white hover:bg-blue-50 transition-all"
            >
              <div className="flex items-center mb-3">
                <div className="mr-3">{app.icon}</div>
                <h3 className="font-bold text-blue-700">{app.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{app.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <Contact />
    </div>
  );
};

export default MiscellaneousSystems;
