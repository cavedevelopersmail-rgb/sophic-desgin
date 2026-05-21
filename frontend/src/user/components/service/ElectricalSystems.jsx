import React from "react";
import {
  Zap as LightningBolt, // Fixed: Using Zap as LightningBolt
  CircuitBoard,
  Power,
  BatteryCharging,
  Lightbulb,
  Shield,
  Sun,
  Activity,
  AlertCircle,
  Gauge,
  RefreshCw,
  HardHat,
  Factory,
  Home,
  Hospital,
  Cloud,
  Server,
} from "lucide-react";
import Contact from "../Contact";

const ElectricalSystems = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center bg-blue-100 text-blue-700 rounded-full p-4 mb-6">
          <LightningBolt size={48} className="text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Electrical Power Systems
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Designing safe, reliable, and efficient power distribution solutions
          for uninterrupted operations
        </p>
      </div>

      {/* Core Objective */}
      <section className="mb-20 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6 flex items-center">
            <CircuitBoard className="mr-3 text-blue-600" size={28} />
            Core Objective
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            To deliver safe, reliable, and efficient power distribution for
            uninterrupted operations across diverse facilities and
            infrastructure.
          </p>
        </div>
      </section>

      {/* Key Components */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-blue-800 mb-10 text-center">
          Key Components & Functions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Power Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <Power className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Power Distribution
              </h3>
            </div>
            <div className="h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-4 p-4 flex flex-col justify-center">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 font-semibold">HT Systems</div>
                  <div className="text-xs text-gray-500 mt-1">Up to 33kV</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 font-semibold">
                    Transformers
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Dry/Oil-cooled
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 font-semibold">RMUs</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Ring Main Units
                  </div>
                </div>
                <div className="col-span-3 bg-white p-3 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 font-semibold">
                    Distribution Panels
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    MCCBs, ACBs, DBs
                  </div>
                </div>
              </div>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>High & low voltage distribution networks</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Switchgear and protection systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Cable management and busway systems</span>
              </li>
            </ul>
          </div>

          {/* Backup Power */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <BatteryCharging className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">Backup Power</h3>
            </div>
            <div className="h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-4 p-4 flex flex-col justify-center">
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                    <div className="text-blue-600 font-bold text-xs">DG</div>
                  </div>
                  <div className="text-sm font-medium">Diesel Generators</div>
                </div>
                <div className="text-center">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                    <div className="text-blue-600 font-bold text-xs">UPS</div>
                  </div>
                  <div className="text-sm font-medium">UPS Systems</div>
                </div>
                <div className="text-center">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                    <div className="text-blue-600 font-bold text-xs">ATS</div>
                  </div>
                  <div className="text-sm font-medium">ATS Panels</div>
                </div>
              </div>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Seamless power transfer during outages</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Critical load protection</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Runtime optimization and fuel management</span>
              </li>
            </ul>
          </div>

          {/* Lighting */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <Lightbulb className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Lighting Systems
              </h3>
            </div>
            <div className="h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-4 p-4 flex flex-col justify-center">
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="text-4xl text-yellow-400 mb-1">💡</div>
                  <div className="text-sm font-medium">LED Solutions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl text-sky-400 mb-1">☀️</div>
                  <div className="text-sm font-medium">Daylight Harvesting</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl text-red-500 mb-1">🚨</div>
                  <div className="text-sm font-medium">Emergency Lighting</div>
                </div>
              </div>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Energy-efficient LED lighting design</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Automated lighting control systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Emergency egress path illumination</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Task and ambient lighting solutions</span>
              </li>
            </ul>
          </div>

          {/* Protection */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <Shield className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Protection Systems
              </h3>
            </div>
            <div className="h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-4 p-4 flex flex-col justify-center">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 text-xs font-semibold">
                    Earthing
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 text-xs font-semibold">
                    Lightning Arresters
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 text-xs font-semibold">
                    Surge Protection
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 text-xs font-semibold">
                    Arc Flash
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 text-xs font-semibold">
                    Ground Fault
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 text-xs font-semibold">
                    Overcurrent
                  </div>
                </div>
              </div>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Comprehensive earthing/grounding systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Lightning protection for structures</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Surge protection for sensitive equipment</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Arc flash mitigation systems</span>
              </li>
            </ul>
          </div>

          {/* Renewable Integration */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <Sun className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Renewable Integration
              </h3>
            </div>
            <div className="h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-4 p-4 flex flex-col justify-center">
              <div className="flex justify-around items-center">
                <div className="text-center">
                  <div className="text-4xl">☀️</div>
                  <div className="text-sm font-medium mt-1">Solar PV</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl">🌬️</div>
                  <div className="text-sm font-medium mt-1">Wind Power</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl">🔋</div>
                  <div className="text-sm font-medium mt-1">Storage</div>
                </div>
              </div>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Grid-tied and off-grid solar PV systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Wind power interface solutions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Battery energy storage systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Net metering and feed-in tariff integration</span>
              </li>
            </ul>
          </div>

          {/* System Integration */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-6 rounded-xl shadow-lg text-white">
            <h3 className="text-xl font-bold mb-4">
              Intelligent Power Management
            </h3>
            <p className="mb-6">
              Our integrated approach ensures optimal performance across all
              electrical systems
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-800 rounded-full p-2 mr-3">
                  <CircuitBoard size={18} />
                </div>
                <span>Energy Monitoring & Analytics</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-800 rounded-full p-2 mr-3">
                  <Gauge size={18} />
                </div>
                <span>Power Quality Management</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-800 rounded-full p-2 mr-3">
                  <Activity size={18} />
                </div>
                <span>Load Balancing & Optimization</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-800 rounded-full p-2 mr-3">
                  <RefreshCw size={18} />
                </div>
                <span>Predictive Maintenance Systems</span>
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
              icon: <Activity size={24} className="text-blue-600" />,
              title: "Load Analysis",
              desc: "Demand forecasting and diversity factor optimization",
            },
            {
              icon: <AlertCircle size={24} className="text-blue-600" />,
              title: "Fault Management",
              desc: "Short-circuit/arc-flash studies, protective device coordination",
            },
            {
              icon: <Gauge size={24} className="text-blue-600" />,
              title: "Efficiency Optimization",
              desc: "Power factor correction, harmonic filtering",
            },
            {
              icon: <RefreshCw size={24} className="text-blue-600" />,
              title: "System Resilience",
              desc: "Redundant feeds (N+1), maintenance bypasses",
            },
            {
              icon: <HardHat size={24} className="text-blue-600" />,
              title: "Safety Compliance",
              desc: "Adherence to IEC/NEC/IS standards",
            },
            {
              icon: <Shield size={24} className="text-blue-600" />,
              title: "Protection Coordination",
              desc: "Selective coordination of protective devices",
            },
            {
              icon: <LightningBolt size={24} className="text-blue-600" />,
              title: "Voltage Management",
              desc: "Optimizing voltage levels for equipment safety",
            },
            {
              icon: <CircuitBoard size={24} className="text-blue-600" />,
              title: "Future Expansion",
              desc: "Scalable design for capacity growth",
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
          <Factory className="mr-3 text-blue-600" size={28} />
          Applications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Factory size={32} className="text-blue-600" />,
              title: "Industrial Plants",
              desc: "Manufacturing facilities, refineries",
            },
            {
              icon: <Server size={32} className="text-blue-600" />,
              title: "IT Parks & Data Centers",
              desc: "Mission-critical power systems",
            },
            {
              icon: <Hospital size={32} className="text-blue-600" />,
              title: "Healthcare Facilities",
              desc: "Hospitals with life support systems",
            },
            {
              icon: <Home size={32} className="text-blue-600" />,
              title: "Residential Towers",
              desc: "High-rise apartments and townships",
            },
            {
              icon: <Cloud size={32} className="text-blue-600" />,
              title: "Commercial Complexes",
              desc: "Shopping malls, offices, hotels",
            },
            {
              icon: <LightningBolt size={32} className="text-blue-600" />,
              title: "Infrastructure Projects",
              desc: "Airports, metro rail, tunnels",
            },
            {
              icon: <Sun size={32} className="text-blue-600" />,
              title: "Renewable Energy Plants",
              desc: "Solar farms, wind parks",
            },
            {
              icon: <CircuitBoard size={32} className="text-blue-600" />,
              title: "Laboratories",
              desc: "Research facilities with sensitive equipment",
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

export default ElectricalSystems;
