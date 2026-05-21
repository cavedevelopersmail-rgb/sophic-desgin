import React from "react";
import { Target, Eye, Users, Award } from "lucide-react";
import { getPrincipalExperienceYears, getPrincipalExperiencePlusLabel } from "../../utils/principalExperience";

const About = () => {
  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About Sophic Designs private limited
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A decade of engineering excellence, delivering innovative MEP
            solutions that set industry standards across diverse sectors.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <img
              src="https://images.pexels.com/photos/3862379/pexels-photo-3862379.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Engineering Team"
              className="rounded-2xl shadow-xl"
            />
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Philosophy
              </h3>
              <p className="text-gray-600 leading-relaxed">
                At Sophic Designs private limited , we believe that exceptional engineering
                goes beyond technical expertise. We combine innovative thinking
                with practical solutions, ensuring every project delivers
                sustainable value and operational excellence.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Target className="h-8 w-8 text-teal-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Precision Engineering
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Meticulous attention to detail in every design
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Eye className="h-8 w-8 text-teal-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Future Vision</h4>
                  <p className="text-gray-600 text-sm">
                    Sustainable solutions for tomorrow's challenges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h3>
            <p className="text-gray-600">
              Meet the visionary behind Sophic Designs private limited
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8">
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="w-32 h-32 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                  SJ
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    Mr. Sunnil Jha
                  </h4>
                  <p className="text-teal-600 font-semibold mb-4">
                    Founder & Principal Consultant
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    With over {getPrincipalExperienceYears()} years of distinguished experience in MEP
                    engineering, Mr. Sunnil Jha has been the driving force
                    behind Sophic Designs private limited ' success. His expertise spans
                    across complex commercial, industrial, and institutional
                    projects, making him a respected authority in the field.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-600">
                        {getPrincipalExperiencePlusLabel()}
                      </div>
                      <div className="text-sm text-gray-600">
                        Years Experience
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-600">
                        500+
                      </div>
                      <div className="text-sm text-gray-600">
                        Projects Delivered
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-600">
                        50+
                      </div>
                      <div className="text-sm text-gray-600">Team Members</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Target className="h-10 w-10 text-teal-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To deliver world-class MEP engineering solutions that enhance
              operational efficiency, ensure safety, and contribute to
              sustainable development across all sectors we serve.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Award className="h-10 w-10 text-teal-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">Our Values</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                Excellence in every project delivery
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                Innovation through sustainable practices
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                Client satisfaction as our priority
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
