import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.benzinga.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    lib: {
      entry: "src/main.tsx",
      name: "AppWidget",
      fileName: (format) => `my-widget.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
