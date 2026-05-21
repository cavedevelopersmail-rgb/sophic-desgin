import React, { useState, useEffect } from "react";
import {
  Users,
  FileText,
  Eye,
  TrendingUp,
  BarChart3,
  Globe,
  Activity,
  Clock,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPages: 12,
    totalViews: 15420,
    activeUsers: 342,
    conversionRate: 3.2,
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: "Page created", item: "About Us", time: "2 hours ago" },
    {
      id: 2,
      action: "Section updated",
      item: "Hero Section",
      time: "4 hours ago",
    },
    {
      id: 3,
      action: "Component added",
      item: "Contact Form",
      time: "6 hours ago",
    },
    { id: 4, action: "Theme updated", item: "Color Scheme", time: "1 day ago" },
  ]);

  useEffect(() => {
    // Load dashboard data
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // // In a real app, you'd fetch actual analytics data
      // const response =
      // console.log('System healthy:', response.data);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  };

  const StatCard = ({ title, value, icon: Icon, change, changeType }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p
              className={`text-sm ${
                changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}
            >
              {changeType === "positive" ? "+" : ""}
              {change}% from last month
            </p>
          )}
        </div>
        <div className="h-12 w-12 bg-[#00353E] bg-opacity-10 rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-[#00353E]" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your site.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Pages"
          value={stats.totalPages}
          icon={FileText}
          change={8.2}
          changeType="positive"
        />
        <StatCard
          title="Page Views"
          value={stats.totalViews.toLocaleString()}
          icon={Eye}
          change={12.5}
          changeType="positive"
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          icon={Users}
          change={-2.1}
          changeType="negative"
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={TrendingUp}
          change={0.8}
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Analytics Chart Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Analytics Overview
            </h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Analytics chart would go here</p>
              <p className="text-sm text-gray-400">
                Connect to analytics service
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-[#9ACD32] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.action}:</span>{" "}
                    {activity.item}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-[#00353E] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200">
            <Globe className="h-6 w-6 mb-2" />
            <div className="text-left">
              <p className="font-medium">Create New Page</p>
              <p className="text-sm opacity-80">Add a new page to your site</p>
            </div>
          </button>
          <button className="p-4 bg-[#9ACD32] text-[#00353E] rounded-lg hover:bg-opacity-90 transition-colors duration-200">
            <FileText className="h-6 w-6 mb-2" />
            <div className="text-left">
              <p className="font-medium">Manage Sections</p>
              <p className="text-sm opacity-80">Edit your site sections</p>
            </div>
          </button>
          <button className="p-4 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors duration-200">
            <BarChart3 className="h-6 w-6 mb-2" />
            <div className="text-left">
              <p className="font-medium">View Analytics</p>
              <p className="text-sm opacity-60">Check your site performance</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
