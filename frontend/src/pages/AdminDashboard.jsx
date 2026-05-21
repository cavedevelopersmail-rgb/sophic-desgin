import React, { useState } from "react";
import Sidebar from "../components/admin/layout/Sidebar";
import Topbar from "../components/admin/layout/Topbar";
import Dashboard from "../components/admin/pages/Dashboard";
import ReviewManagement from "../components/admin/pages/ReviewManagement";
import PrivacyManagement from "../components/admin/pages/PrivacyManagement";
import TermsManagement from "../components/admin/pages/TermsManagement";
import LogoManagement from "../components/admin/pages/LogoManagement";
import HeroManagement from "../components/admin/pages/HeroManagement";
import BlogManagement from "../components/admin/pages/BlogManagement";
import ProjectManagement from "../components/admin/pages/ProjectManagement";
import ServiceManagement from "../components/admin/pages/ServiceManagement";
import ThemeManagement from "../components/admin/pages/ThemeManagement";

import Contacts from "../components/admin/pages/Contacts";
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;

      case "logo":
        return <LogoManagement />;
      case "hero":
        return <HeroManagement />;
      case "reviews":
        return <ReviewManagement />;
      case "terms":
        return <TermsManagement />;
      case "privacy":
        return <PrivacyManagement />;
      case "blogs":
        return <BlogManagement />;

      case "Project":
        return <ProjectManagement />;
      case "contacts":
        return <Contacts />;
      case "services":
        return <ServiceManagement />;
      case "themes":
        return <ThemeManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
