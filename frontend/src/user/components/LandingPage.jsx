import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import { motion } from "framer-motion";
import Credentials from "./Credentials";
import Services from "./Services";
import Projects from "./Projects";
import Contact from "./Contact";
import { useAuth } from "../../context/AuthContext";
import BlogCardsSection from "./BlogCardsSection";
import { ChevronDown, ChevronUp } from "lucide-react"; // Added icons for FAQ

const LandingPage = () => {
  const [clients] = useState([
    "IREO",
    "IDEA",
    "Anantaraj Cloud",
    "Skyon Group",
    "Government Projects",
    "Industrial Clients",
    "Institutional Partners",
  ]);

  const { getLogos, getReviews } = useAuth();

  // State for logos
  const [logos, setLogos] = useState([]);
  const [loadingLogos, setLoadingLogos] = useState(true);
  const [logoError, setLogoError] = useState(false);

  // State for reviews
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewError, setReviewError] = useState(false);

  // State for FAQ
  const [openQuestion, setOpenQuestion] = useState(null);

  // Toggle FAQ question
  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  // Fetch logos on component mount
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        setLoadingLogos(true);
        const response = await getLogos();

        const list = Array.isArray(response?.data?.logos) ? response.data.logos : [];
        const activeLogos = list
          .filter((logo) => logo.status === "active")
          .map((logo) => ({
            id: logo._id,
            name: logo.companyName,
            url: logo.logo,
          }));

        setLogos(activeLogos);
        setLogoError(false);
      } catch (error) {
        console.error("Failed to fetch logos:", error);
        setLogoError(true);
      } finally {
        setLoadingLogos(false);
      }
    };

    fetchLogos();
  }, [getLogos]);

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoadingReviews(true);
        const response = await getReviews();

        const list = Array.isArray(response?.data?.reviews) ? response.data.reviews : [];
        const reviewsToShow = list.slice(0, 3);

        setReviews(reviewsToShow);
        setReviewError(false);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviewError(true);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [getReviews]);

  // Determine which logos to display
  const logosToDisplay =
    !loadingLogos && logos.length > 0 ? logos : logoError ? [] : [];

  // Render stars based on rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Rating & Review Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Client Testimonials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loadingReviews ? (
              // Loading skeleton
              [1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <div className="animate-pulse">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 bg-gray-200 rounded mr-1"
                        ></div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : reviewError ? (
              <div className="col-span-3 text-center py-8">
                <p className="text-red-500">
                  Failed to load reviews. Please try again later.
                </p>
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <div className="flex mb-4">{renderStars(review.rating)}</div>
                  <p className="text-gray-600 mb-4 italic">
                    "{review.comment}"
                  </p>

                  <div className="flex items-center mt-4">
                    {review.image && review.image !== "" && (
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      {review.title && (
                        <p className="text-gray-500 text-sm">{review.title}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p>No reviews available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trusted by — seamless circular logo marquee */}
      {logosToDisplay.length > 0 && (
        <section className="py-14 md:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden border-y border-slate-100">
          <div className="container mx-auto px-4 text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Trusted By Industry Leaders
            </h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base max-w-2xl mx-auto">
              Long-term partnerships across commercial, industrial, and institutional sectors
            </p>
          </div>

          <div className="relative group">
            {/* Side fades — logos dissolve into the background */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-slate-50 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-slate-50 to-transparent"
              aria-hidden
            />

            <div className="overflow-hidden py-2">
              <div className="flex w-max animate-marquee-logos motion-reduce:animate-none group-hover:[animation-play-state:paused]">
                {[...logosToDisplay, ...logosToDisplay].map((logo, idx) => (
                  <div
                    key={`${logo.id}-${idx}`}
                    className="flex-shrink-0 mx-3 sm:mx-5 md:mx-6 flex items-center justify-center"
                  >
                    <div
                      className="rounded-full p-[2.5px] bg-gradient-to-br from-teal-500/35 via-teal-100/60 to-slate-300/70 shadow-md shadow-slate-900/10"
                      title={logo.name}
                    >
                      <div className="rounded-full bg-white w-[4.75rem] h-[4.75rem] sm:w-[5.5rem] sm:h-[5.5rem] md:w-24 md:h-24 flex items-center justify-center p-3 md:p-4 ring-1 ring-slate-100/90">
                        <img
                          src={logo.url}
                          alt={logo.name}
                          className="max-w-[78%] max-h-[78%] w-auto h-auto object-contain select-none"
                          draggable={false}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Services />
      <Projects />

      {/* Key Innovations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Key Innovations
          </h2>

          <div className="space-y-12">
            {innovationsData.map((innovation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold ml-4">
                      {innovation.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Project:</span>{" "}
                    {innovation.project}
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    {innovation.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Credentials />

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our engineering services
              and project processes.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  className="flex items-center justify-between w-full p-5 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                  onClick={() => toggleQuestion(index)}
                >
                  <span>{faq.question}</span>
                  {openQuestion === index ? (
                    <ChevronUp className="h-5 w-5 text-teal-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-teal-600" />
                  )}
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openQuestion === index ? "auto" : 0,
                    opacity: openQuestion === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 text-gray-600 bg-gray-50">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Still have questions? We're here to help!
            </p>
            <a
              href="#contact"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </section>

      <Contact />

      <BlogCardsSection />
    </div>
  );
};

// Innovations data
const innovationsData = [
  {
    title: "High-Rise Development Innovation",
    project: "IREO High-Rise Developments",
    achievements: [
      "Designed 150m+ towers without service floors - first in North India",
      "Deviation from standard practice of service floors for 100m+ buildings",
      "Pioneered new structural approach for high-rises",
    ],
  },
  {
    title: "Data Center Fire Safety Innovation",
    project: "IDEA Data Centre, Pune (2016)",
    achievements: [
      "Replaced 150MT gas system with water mist system in non-data hall areas",
      "Reduced gas requirement by 66% (150MT to 50MT)",
      "Implemented pre-action design with dual-trigger activation",
      "Created cost-effective, refill-free solution now becoming industry standard",
    ],
  },
  {
    title: "Hyperscale Data Center Efficiency",
    project: "Anantaraj Cloud Datacentre, Manesar (2021)",
    achievements: [
      "21.5 MW IT load facility with two 3MW data halls",
      "Implemented active RDHx in each rack - global first at this scale",
      "Eliminated false floors using fan wall units",
      "Achieved PUE of 1.42 (against 1.5 target) with air-cooled chillers",
    ],
  },
];

// FAQ data
const faqs = [
  {
    question: "What engineering services do you offer?",
    answer:
      "We provide comprehensive MEP (Mechanical, Electrical, Plumbing) engineering services, structural engineering, fire safety systems design, building information modeling (BIM), sustainability consulting, and project management for residential, commercial, industrial, and institutional projects.",
  },
  {
    question: "How long does a typical engineering project take?",
    answer:
      "Project timelines vary based on complexity and scope. A standard residential project may take 4-8 weeks for design, while large commercial or industrial projects can take 3-6 months. We provide detailed timelines during project initiation and maintain regular progress updates.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes, we serve clients globally. We've completed projects in India, UAE, Singapore, and the UK. Our team uses collaborative digital platforms to ensure seamless communication regardless of location, with virtual meetings scheduled across time zones.",
  },
  {
    question: "What makes your approach to MEP engineering unique?",
    answer:
      "Our approach combines deep technical expertise with practical innovation. We focus on energy efficiency (targeting 30-50% reductions), cost optimization through value engineering, and future-proofing designs with smart building technologies. Our proprietary analysis tools ensure systems are optimized for performance and maintenance.",
  },
  {
    question: "How do you ensure compliance with local regulations?",
    answer:
      "Our team includes specialists familiar with building codes across all regions we operate in (NBC India, IBC, UAE Fire Code, etc.). We maintain a comprehensive regulatory database and conduct multi-stage compliance checks throughout the design process. For new markets, we partner with local certification bodies.",
  },
  {
    question:
      "What is your process for handling design changes during construction?",
    answer:
      "We implement a structured change management protocol: 1) Document change request, 2) Technical impact analysis (48hr turnaround), 3) Cost/schedule evaluation, 4) BIM coordination, 5) Revised documentation issuance. Our cloud-based systems ensure all stakeholders access real-time updates.",
  },
  {
    question: "Do you provide post-construction support?",
    answer:
      "Yes, we offer tiered support packages: Basic (6-month defect liability), Standard (1-year with quarterly audits), and Premium (3-year with bi-annual audits + emergency response). All packages include as-built documentation and operator training.",
  },
  {
    question: "How do you approach sustainable design?",
    answer:
      "Our sustainability framework targets: 1) Energy modeling for optimal systems (LEED/IGBC compliance), 2) Water conservation through rainwater harvesting and greywater recycling, 3) Material lifecycle analysis, 4) Passive design optimization, and 5) Renewable energy integration. We typically achieve 30-40% reductions in operational carbon.",
  },
];

export default LandingPage;
