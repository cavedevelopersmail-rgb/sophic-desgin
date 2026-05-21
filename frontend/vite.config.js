// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "600e384c4121.ngrok-free.app", // ngrok host (बिना https:// के)
      "sophicdesigns-web-frontend-rcqc.vercel.app", // Vercel host (बिना https:// और spaces के)
      "sophicdesigns.com",
      "localhost",
    ],
    hmr: {
      clientPort: 443, // ngrok के लिए उपयोगी
    },
    cors: true,
  },
});
