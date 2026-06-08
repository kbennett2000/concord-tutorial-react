import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The whole config: turn on Vite's React support. That's it.
export default defineConfig({
  plugins: [react()],
});
