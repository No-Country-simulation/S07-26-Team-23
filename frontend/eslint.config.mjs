import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";

export default defineConfig([
  js.configs.recommended,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "**/*.tsbuildinfo"]),
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
]);