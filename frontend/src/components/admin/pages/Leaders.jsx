import React from "react";
import Arjun from "../../../LeadersImage/Arjun.png";
import Madan from "../../../LeadersImage/Madan.png";
import Shashank from "../../../LeadersImage/Shashank.png";
import Biswaranjan from "../../../LeadersImage/Biswaranjan.png";
import Sunnil from "../../../LeadersImage/sunnil.png";
import Vijay from "../../../LeadersImage/Vijay.png";
import { getPrincipalExperienceYears } from "../../../utils/principalExperience";

const Leaders = () => {
  const teamMembers = [
    {
      name: "Mr. Sunnil Jha",
      position: "Principal Consultant (MEP)",
      experienceKey: "principal",
      bio: "Founder of Sophic Designs private limited with extensive expertise across all MEP domains",
      image: Sunnil,
    },
    {
      name: "Mr. Vijay Shankar Tamrakar",
      position: "Principal Consultant (Electrical Systems)",
      image: Vijay,
    },
    {
      name: "Mr. Shashank Garuryar",
      position: "Principal Consultant (LV & ELV Systems)",
      image: Shashank,
    },
    {
      name: "Mr. Madan Kumar Jain",
      position: "Principal Consultant (HVAC)",
      image: Madan,
    },
    {
      name: "Mr. Arjun Das",
      position: "Consultant (Electrical Systems)",
      image: Arjun,
    },
    {
      name: "Mr. Biswaranjan Senapati",
      position: "Sr. Consultant (Infrastructure & Drainage)",
      image: Biswaranjan,
    },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "#00353E" }}>
            Leadership Team
          </h1>
          <div className="w-24 h-1 bg-[#00353E] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our experienced core team delivers innovative MEP solutions through
            senior-level involvement in every project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={member.image}
                alt={member.name}
                className="rounded-xl w-32 h-32 object-cover mb-6 border-2 border-gray-200"
              />

              <div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ color: "#00353E" }}
                >
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-3">{member.position}</p>
                {member.experienceKey === "principal" ? (
                  <span
                    className="inline-block px-3 py-1 text-sm rounded-full mb-3"
                    style={{ backgroundColor: "#f0f9ff", color: "#00353E" }}
                  >
                    {getPrincipalExperienceYears()}+ years experience
                  </span>
                ) : member.experience ? (
                  <span
                    className="inline-block px-3 py-1 text-sm rounded-full mb-3"
                    style={{ backgroundColor: "#f0f9ff", color: "#00353E" }}
                  >
                    {member.experience} experience
                  </span>
                ) : null}
                {member.bio && (
                  <p className="text-gray-700 mt-2">{member.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t">
          <h2
            className="text-2xl font-bold text-center mb-8"
            style={{ color: "#00353E" }}
          >
            Our Leadership Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Senior-level involvement in every project",
              "Lean & agile team structure for faster response",
              "Direct collaboration with architects and clients",
              "Ownership from concept to commissioning",
              "Decision-making without bureaucracy",
            ].map((principle, index) => (
              <div key={index} className="flex items-start">
                <div
                  className="flex-shrink-0 mt-1 mr-4"
                  style={{ color: "#00353E" }}
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaders;
