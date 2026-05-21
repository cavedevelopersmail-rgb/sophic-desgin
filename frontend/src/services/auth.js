import { apiService } from "./api";

export const authService = {
  async login(credentials) {
    try {
      const response = await apiService.login(credentials);
      console.log("i am comming", response);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  async getProfile() {
    try {
      const response = await apiService.getProfile();
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to get profile");
    }
  },

  logout() {
    localStorage.removeItem("token");
  },
};
