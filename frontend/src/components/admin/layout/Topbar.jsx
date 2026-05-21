import React from "react";
import { Bell, Search, User } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md"></div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {user?.username || user?.email || "Admin User"}
              </div>
              <div className="text-xs text-gray-500">
                {user?.role || "Administrator"}
              </div>
            </div>
            <div className="h-8 w-8 bg-[#00353E] rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
