import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cesium from "vite-plugin-cesium";

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import cesium from "vite-plugin-cesium"; // Add Cesium plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [cesium(),react()],
})

// export default defineConfig({
//   plugins: [react(), cesium()],
//   base: "/", // Update with your deployment base path if needed
// });


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import cesium from "vite-plugin-cesium"; // Cesium plugin

// export default defineConfig({
//   plugins: [react(), cesium()],
//   base: "/", // Update this if deploying to a subdirectory
// });
