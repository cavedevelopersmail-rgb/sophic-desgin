import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";

const ThemeManagement = () => {
  const { getThemes, activateTheme } = useAuth();
  const { refreshTheme } = useTheme();
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activatingId, setActivatingId] = useState(null);

  const fetchThemes = async () => {
    try {
      const response = await getThemes();
      setThemes(response.data?.themes || []);
    } catch (error) {
      console.error("Failed to fetch themes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const onActivate = async (themeId) => {
    try {
      setActivatingId(themeId);
      await activateTheme(themeId);
      await fetchThemes();
      await refreshTheme();
    } catch (error) {
      console.error("Failed to activate theme:", error);
      alert("Could not activate theme");
    } finally {
      setActivatingId(null);
    }
  };

  if (loading) return <div className="p-6">Loading themes...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Theme Selector</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {themes.map((theme) => (
            <div key={theme._id} className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">{theme.name}</h2>
                {theme.isActive && (
                  <span className="text-green-600 flex items-center gap-1 text-sm font-medium">
                    <CheckCircle size={16} /> Active
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-4">{theme.key}</p>
              <div className="flex gap-2 mb-4">
                <span className="w-8 h-8 rounded-full border" style={{ background: theme.config?.primaryColor }} />
                <span className="w-8 h-8 rounded-full border" style={{ background: theme.config?.secondaryColor }} />
                <span className="w-8 h-8 rounded-full border" style={{ background: theme.config?.accentColor }} />
              </div>
              <button
                onClick={() => onActivate(theme._id)}
                disabled={theme.isActive || activatingId === theme._id}
                className="w-full py-2 rounded-lg bg-[#00353E] text-white disabled:opacity-50"
              >
                {theme.isActive ? "Currently Active" : activatingId === theme._id ? "Applying..." : "Set Active"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeManagement;
