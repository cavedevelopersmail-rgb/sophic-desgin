import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { getPrincipalExperienceYears } from "../../../utils/principalExperience";

// Icons (Install react-icons: npm install react-icons)
import {
  FaWater,
  FaFireExtinguisher,
  FaFan,
  FaBrain,
  FaBolt,
  FaCogs,
  FaCertificate,
  FaLightbulb,
  FaHandshake,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const Mep = () => {
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-blue-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
          MEP Design Solutions
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          "Systems That Work. Expertise That Lasts."
        </p>
      </motion.div>

      {/* Company Overview */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex justify-center mb-4">
            <FaChartLine className="text-blue-600 text-4xl" />
          </div>
          <h3 className="text-xl font-bold text-center mb-3">
            Company Overview
          </h3>
          <p className="text-gray-700 text-center">
            Established in 2014 by Mr. Sunnil Jha ({getPrincipalExperienceYears()}+ years experience) with
            headquarters in Delhi NCR.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex justify-center mb-4">
            <FaCertificate className="text-blue-600 text-4xl" />
          </div>
          <h3 className="text-xl font-bold text-center mb-3">Expertise</h3>
          <p className="text-gray-700 text-center">
            MEP consultancy for Residential, Commercial, Industrial &
            Institutional projects
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex justify-center mb-4">
            <FaHandshake className="text-blue-600 text-4xl" />
          </div>
          <h3 className="text-xl font-bold text-center mb-3">Mission</h3>
          <p className="text-gray-700 text-center">
            Providing exceptional MEP solutions while fostering enduring
            partnerships
          </p>
        </motion.div>
      </motion.div>

      {/* Core Services */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
          Our MEP Services
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-xl shadow-xl overflow-hidden border border-blue-100"
            >
              <div className="p-6">
                <div className="text-blue-600 text-4xl mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Innovations */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
          Key Innovations
        </h2>

        <motion.div
          className="space-y-10 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {innovationsData.map((innovation, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500"
            >
              <div className="flex items-center mb-3">
                <FaLightbulb className="text-yellow-500 text-2xl mr-2" />
                <h3 className="text-xl font-bold">{innovation.title}</h3>
              </div>
              <p className="text-gray-700">{innovation.description}</p>
              <div className="mt-3 flex flex-wrap">
                {innovation.impact.map((imp, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    {imp}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-blue-900 text-white rounded-2xl p-8 mb-16 max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          Standards & Certifications
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-white text-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaCertificate className="text-2xl" />
            </div>
            <p>NFPA</p>
          </div>
          <div className="text-center">
            <div className="bg-white text-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaCertificate className="text-2xl" />
            </div>
            <p>LEED</p>
          </div>
          <div className="text-center">
            <div className="bg-white text-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaCertificate className="text-2xl" />
            </div>
            <p>GRIHA</p>
          </div>
          <div className="text-center">
            <div className="bg-white text-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaCertificate className="text-2xl" />
            </div>
            <p>UL/FM</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="font-bold mb-2">Professional Memberships:</p>
          <div className="flex justify-center space-x-6">
            <span>ASHRAE</span>
            <span>ISHRAE</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Services data
const servicesData = [
  {
    icon: <FaWater />,
    title: "Water Systems",
    description:
      "Design of water supply, treatment, distribution, and drainage systems including STPs, WTPs, rainwater harvesting, and solar water heating.",
  },
  {
    icon: <FaFireExtinguisher />,
    title: "Fire Safety Solutions",
    description:
      "Complete fire safety solutions including detection, suppression, alarm systems, hydrants, sprinklers, and compliance with fire codes.",
  },
  {
    icon: <FaFan />,
    title: "HVAC Systems",
    description:
      "End-to-end design of heating, ventilation, air conditioning, and refrigeration systems for all building types with focus on efficiency and IAQ.",
  },
  {
    icon: <FaBrain />,
    title: "Intelligent Building Systems",
    description:
      "Design of CCTV, access control, PA systems, IBMS, home automation, data communication, and integrated security systems.",
  },
  {
    icon: <FaBolt />,
    title: "Electrical Power Systems",
    description:
      "Comprehensive electrical design including HT/LT distribution, transformers, lighting, earthing, emergency power, and UPS systems.",
  },
  {
    icon: <FaCogs />,
    title: "Specialty Systems",
    description:
      "Design of elevators, fuel/gas distribution, medical gas pipelines, energy management, and industrial utility integration.",
  },
];

// Innovations data
const innovationsData = [
  {
    title: "High-Rise Development Innovations",
    description:
      "Designed IREO High-Rise Developments without service floors - a bold deviation from standard practice for buildings exceeding 100m height in North India.",
    impact: ["Architectural Freedom", "Cost Savings", "Space Optimization"],
  },
  {
    title: "IDEA Data Center, Pune (2016)",
    description:
      "Replaced proposed gas-based suppression system with high-pressure water mist system, reducing gas use from 150MT to 50MT. Pre-action design prevented water discharge unless both fire detection and heat-activated triggers occurred.",
    impact: [
      "Cost-effective",
      "Zero leakage risk",
      "Refill-free solution",
      "Industry standard",
    ],
  },
  {
    title: "Anantaraj Cloud Datacentre, Manesar (2021)",
    description:
      "21.5 MW hyperscale facility featuring active Rear Door Heat Exchangers (RDHx) in each rack, eliminating false floors. Achieved PUE of 1.42 against 1.5 target using air-cooled chillers.",
    impact: [
      "Global first",
      "Energy efficiency",
      "Space optimization",
      "Innovative cooling",
    ],
  },
];

export default Mep;
