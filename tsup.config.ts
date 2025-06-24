import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.js"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  external: [
    "react",
    "react-dom",
    "framer-motion",
    "lodash.debounce",
    "lucide-react",
    "prop-types",
  ],
});
