import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      crypto: require.resolve('crypto-browserify'), // Using createRequire to resolve the package
    },
  },
});
