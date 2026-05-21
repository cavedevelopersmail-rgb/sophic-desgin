import React from "react";
import {
  Flame,
  AlarmSmoke,
  Sprout,
  Siren,
  DoorOpen,
  ShieldCheck,
  Building,
  Hospital,
  Factory,
  Server,
  Plane,
  Mail,
  Phone,
  MapPin,
  ClipboardCheck,
  Zap,
  Accessibility,
  Leaf,
  LayoutGrid,
} from "lucide-react";
import Contact from "../Contact";
import DetectionSystems from "../../../assets/FireProtection/DetectionSystems.jpg";
import SuppressionSystems from "../../../assets/FireProtection/SuppressionSystems.jpg";
import AlarmNotification from "../../../assets/FireProtection/AlarmNotification.jpg";
import PassiveProtection from "../../../assets/FireProtection/PassiveProtection.jpg";
import EvacuationCompliance from "../../../assets/FireProtection/EvacuationCompliance.jpg";

const Fpls = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center bg-red-100 text-red-700 rounded-full p-4 mb-6">
          <Flame size={48} className="text-red-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-4">
          Fire Protection & Life Safety Systems
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Proactive fire prevention, rapid detection, effective suppression, and
          safe evacuation solutions
        </p>
      </div>

      {/* Core Objective */}
      <section className="mb-20 bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-2xl shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-red-800 mb-6 flex items-center">
            <ShieldCheck className="mr-3 text-red-600" size={28} />
            Core Objective
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            To safeguard lives, property, and operations through proactive fire
            prevention, rapid detection, effective suppression, and safe
            evacuation.
          </p>
        </div>
      </section>

      {/* Key Components */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-red-800 mb-10 text-center">
          Key Components & Functions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Detection Systems */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-500">
            <div className="flex items-center mb-4">
              <AlarmSmoke className="text-red-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Detection Systems
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden flex items-center justify-center">
              <img
                src={DetectionSystems}
                alt="Detection Systems"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Smoke/heat detectors, flame sensors</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Gas leak detection systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Intelligent addressable/non-addressable sensors</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Early warning systems with AI integration</span>
              </li>
            </ul>
          </div>

          {/* Suppression Systems */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-500">
            <div className="flex items-center mb-4">
              <Sprout className="text-red-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Suppression Systems
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden flex items-center justify-center">
              <img
                src={SuppressionSystems}
                alt="Suppression Systems"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800">
                  Water-Based Systems
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Sprinklers (wet/dry/pre-action), hydrants, hose reels
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Gas/Clean Agents
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  FM-200, CO₂, Novec 1230 for sensitive areas
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Foam Systems</h4>
                <p className="text-sm text-gray-600 mt-1">
                  For flammable liquid fires (fuel storage, hangars)
                </p>
              </div>
            </div>
          </div>

          {/* Alarm & Notification */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-500">
            <div className="flex items-center mb-4">
              <Siren className="text-red-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Alarm & Notification
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden flex items-center justify-center">
              <img
                src={AlarmNotification}
                alt="Alarm Notification"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Audible sirens and visual strobe lights</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Voice evacuation systems with multilingual support</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Integration with BMS and security systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Mass notification capabilities</span>
              </li>
            </ul>
          </div>

          {/* Passive Protection */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-500">
            <div className="flex items-center mb-4">
              <DoorOpen className="text-red-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Passive Protection
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden flex items-center justify-center">
              <img
                src={PassiveProtection}
                alt="Passive Protection"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Fire-rated doors, walls, and barriers</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Compartmentalization strategies</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Firestopping materials and penetration seals</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Structural fire protection</span>
              </li>
            </ul>
          </div>

          {/* Evacuation & Compliance */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-500">
            <div className="flex items-center mb-4">
              <Accessibility className="text-red-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Evacuation & Compliance
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden flex items-center justify-center">
              <img
                src={EvacuationCompliance}
                alt="Evacuation Compliance"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Emergency lighting and exit signage</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Accessible escape route planning</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Compliance with NFPA, NBC, ISO standards</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Disability access solutions</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Evacuation simulation and drills</span>
              </li>
            </ul>
          </div>

          {/* Integration Panel */}
          <div className="bg-gradient-to-br from-red-600 to-orange-600 p-6 rounded-xl shadow-lg text-white">
            <h3 className="text-xl font-bold mb-4">
              Integrated Safety Ecosystem
            </h3>
            <p className="mb-6">
              Our systems provide comprehensive protection through seamless
              integration of all components
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-red-800 rounded-full p-2 mr-3">
                  <Flame size={18} />
                </div>
                <span>24/7 Monitoring & Control</span>
              </div>
              <div className="flex items-center">
                <div className="bg-red-800 rounded-full p-2 mr-3">
                  <Zap size={18} />
                </div>
                <span>Automatic Failover Systems</span>
              </div>
              <div className="flex items-center">
                <div className="bg-red-800 rounded-full p-2 mr-3">
                  <ClipboardCheck size={18} />
                </div>
                <span>Compliance Documentation</span>
              </div>
              <div className="flex items-center">
                <div className="bg-red-800 rounded-full p-2 mr-3">
                  <Leaf size={18} />
                </div>
                <span>Environmentally Friendly Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Considerations */}
      <section className="mb-20 bg-red-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-semibold text-red-800 mb-8 text-center">
          Design Considerations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <ClipboardCheck size={24} className="text-red-600" />,
              title: "Risk Assessment",
              desc: "Tailor systems to occupancy hazards (e.g., high-rise vs. industrial)",
            },
            {
              icon: <Zap size={24} className="text-red-600" />,
              title: "Redundancy",
              desc: "Backup power and fail-safe mechanisms for critical systems",
            },
            {
              icon: <Accessibility size={24} className="text-red-600" />,
              title: "Accessibility",
              desc: "Strategic hydrant locations and firefighter access points",
            },
            {
              icon: <Leaf size={24} className="text-red-600" />,
              title: "Sustainability",
              desc: "Eco-friendly suppression agents and water conservation",
            },
            {
              icon: <ShieldCheck size={24} className="text-red-600" />,
              title: "Life Safety Focus",
              desc: "Prioritizing human evacuation and protection",
            },
            {
              icon: <LayoutGrid size={24} className="text-red-600" />,
              title: "System Integration",
              desc: "Seamless coordination with building management systems",
            },
            {
              icon: <Flame size={24} className="text-red-600" />,
              title: "Fire Load Analysis",
              desc: "Calculating potential fire severity based on materials",
            },
            {
              icon: <DoorOpen size={24} className="text-red-600" />,
              title: "Compartmentation",
              desc: "Designing effective fire zones to contain spread",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg text-red-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Applications */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-red-800 mb-8 text-center flex items-center justify-center">
          <Building className="mr-3 text-red-600" size={28} />
          Applications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Building size={32} className="text-red-600" />,
              title: "Commercial Complexes",
              desc: "High-rise buildings, shopping malls, offices",
            },
            {
              icon: <Hospital size={32} className="text-red-600" />,
              title: "Healthcare Facilities",
              desc: "Hospitals, clinics, nursing homes",
            },
            {
              icon: <Factory size={32} className="text-red-600" />,
              title: "Industrial Plants",
              desc: "Manufacturing facilities, warehouses",
            },
            {
              icon: <Server size={32} className="text-red-600" />,
              title: "Data Centers",
              desc: "Server rooms, telecom facilities",
            },
            {
              icon: <Plane size={32} className="text-red-600" />,
              title: "Transportation Hubs",
              desc: "Airports, metro stations, terminals",
            },
            {
              icon: <Flame size={32} className="text-red-600" />,
              title: "Special Hazard Sites",
              desc: "Chemical plants, fuel depots, laboratories",
            },
          ].map((app, index) => (
            <div
              key={index}
              className="border border-red-100 rounded-xl p-6 bg-white hover:bg-red-50 transition-all flex items-start"
            >
              <div className="mr-4 mt-1">{app.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-red-700 mb-2">
                  {app.title}
                </h3>
                <p className="text-gray-600">{app.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default Fpls;
