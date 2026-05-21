import React from "react";
import {
  Droplets,
  Filter,
  Activity,
  ShowerHead,
  Recycle,
  CloudRain,
  Sun,
  Home,
  ClipboardList,
  LayoutGrid,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Contact from "../Contact";
import RainwaterHarvestingRWH from "../../../assets/PublicHealth/RainwaterHarvestingRWH.jpg";
import SanitationSystems from "../../../assets/PublicHealth/SanitationSystems.jpg";
import SolarWaterHeatingSWH from "../../../assets/PublicHealth/SolarWaterHeatingSWH.jpg";
import WastewaterCollectionSystems from "../../../assets/PublicHealth/WastewaterCollectionSystems.jpg";
import WaterDistributionSystems from "../../../assets/PublicHealth/WaterDistributionSystems.jpg";
import WaterSupplySystems from "../../../assets/PublicHealth/WaterSupplySystems.jpg";
import WaterTreatmentPlantsWTPs from "../../../assets/PublicHealth/WaterTreatmentPlantsWTPs.jpg";
import SewageTreatmentPlants from "../../../assets/PublicHealth/SewageTreatmentPlants.jpg";

const Phes = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-4">
          Public Health Engineering Systems
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Designing sustainable water supply, treatment, distribution, and
          sanitation systems for healthy communities
        </p>
      </div>

      {/* Core Objective */}
      <section className="mb-20 bg-gradient-to-r from-teal-50 to-cyan-50 p-8 rounded-2xl shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-teal-800 mb-6 flex items-center">
            <ClipboardList className="mr-3 text-teal-600" size={28} />
            Core Objective
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            To safeguard public health and environmental quality by designing,
            implementing, and managing engineered systems for safe water supply,
            effective wastewater removal & treatment, and sustainable sanitation
            within buildings and infrastructure projects.
          </p>
        </div>
      </section>

      {/* Key Components */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-teal-800 mb-10 text-center">
          Key System Components & Functions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Water Supply */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Droplets className="text-cyan-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Water Supply Systems
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={WaterSupplySystems}
                alt="Water Supply Systems"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Source development and protection</li>
              <li>Intake structures design</li>
              <li>Raw water conveyance systems</li>
              <li>Balancing reservoirs and storage</li>
            </ul>
          </div>

          {/* Water Treatment */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Filter className="text-cyan-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Water Treatment Plants (WTPs)
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={WaterTreatmentPlantsWTPs}
                alt="Water Treatment Plant"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Coagulation/Flocculation processes</li>
              <li>Sedimentation and filtration systems</li>
              <li>Disinfection methods (chlorine, UV, ozone)</li>
              <li>Advanced treatment solutions</li>
            </ul>
          </div>

          {/* Water Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Activity className="text-cyan-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Water Distribution Systems
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={WaterDistributionSystems}
                alt="Water Distribution System"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Network design and hydraulic modeling</li>
              <li>Pressure stabilization systems</li>
              <li>Elevated tanks and reservoirs</li>
              <li>Quality maintenance protocols</li>
            </ul>
          </div>

          {/* Wastewater Collection */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <ShowerHead className="text-cyan-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Wastewater Collection Systems
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={WastewaterCollectionSystems}
                alt="Wastewater Collection System"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Gravity-fed and pressurized sewers</li>
              <li>Hydraulic design for self-cleansing</li>
              <li>Corrosion-resistant materials</li>
              <li>Pumping station design</li>
            </ul>
          </div>

          {/* Sewage Treatment */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Recycle className="text-cyan-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Sewage Treatment Plants (STPs)
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={SewageTreatmentPlants}
                alt="Sewage Treatment Plant"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Preliminary screening and grit removal</li>
              <li>Biological treatment processes</li>
              <li>Tertiary treatment for nutrient removal</li>
              <li>Sludge treatment and resource recovery</li>
            </ul>
          </div>

          {/* Rainwater Harvesting */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <CloudRain className="text-cyan-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Rainwater Harvesting (RWH)
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={RainwaterHarvestingRWH}
                alt="Rainwater Harvesting System"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Catchment area optimization</li>
              <li>Filtration and first-flush systems</li>
              <li>Above/below ground storage solutions</li>
              <li>Distribution for non-potable uses</li>
            </ul>
          </div>

          {/* Solar Water Heating */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Sun className="text-cyan-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Solar Water Heating (SWH)
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={SolarWaterHeatingSWH}
                alt="Solar Water Heating System"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Flat plate and evacuated tube collectors</li>
              <li>Heat transfer system design</li>
              <li>Insulated storage solutions</li>
              <li>Integration with conventional heaters</li>
            </ul>
          </div>

          {/* Sanitation Systems */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Home className="text-cyan-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">
                Sanitation Systems
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={SanitationSystems}
                alt="Sanitation System"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>On-site sanitation solutions</li>
              <li>Fecal sludge management</li>
              <li>Solid waste interface design</li>
              <li>Hygiene infrastructure planning</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Design Considerations */}
      <section className="mb-20 bg-teal-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-semibold text-teal-800 mb-8 text-center">
          Design & Planning Considerations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Public Health Protection",
              desc: "Preventing waterborne diseases and environmental contamination",
            },
            {
              title: "Regulatory Compliance",
              desc: "Adhering to BIS, WHO, and local standards",
            },
            {
              title: "Demand Forecasting",
              desc: "Estimating current and future water needs",
            },
            {
              title: "Sustainability & Resilience",
              desc: "Water conservation, energy efficiency, and climate adaptation",
            },
            {
              title: "Life Cycle Analysis",
              desc: "Balancing CAPEX and OPEX for viability",
            },
            {
              title: "System Integration",
              desc: "Holistic coordination of water systems",
            },
            {
              title: "O&M Planning",
              desc: "Designing for maintenance and longevity",
            },
            {
              title: "Resource Recovery",
              desc: "Energy from sludge, nutrient reuse",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg text-teal-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Applications */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-teal-800 mb-8 text-center flex items-center justify-center">
          <LayoutGrid className="mr-3 text-teal-600" size={28} />
          Applications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Urban Infrastructure",
              desc: "Municipal networks, large WTPs/STPs",
            },
            {
              title: "Building Complexes",
              desc: "Residential, commercial, hospitals, hotels",
            },
            {
              title: "Industrial Estates",
              desc: "Dedicated water and effluent treatment",
            },
            {
              title: "Town Planning",
              desc: "Master planning for new townships and SEZs",
            },
            {
              title: "Rural Solutions",
              desc: "Community-level water supply and sanitation",
            },
            {
              title: "Disaster Relief",
              desc: "Emergency water and sanitation systems",
            },
          ].map((app, index) => (
            <div
              key={index}
              className="border border-teal-100 rounded-xl p-6 bg-gradient-to-br from-white to-teal-50 hover:to-teal-100 transition-all"
            >
              <h3 className="text-xl font-bold text-teal-700 mb-3">
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

export default Phes;
