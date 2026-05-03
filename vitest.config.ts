import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./app/tests/setup.ts"],
    include: ["app/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["app/**/*.{ts,tsx}"],
      exclude: [
        "app/tests/**",
        "app/root.tsx",
        "app/routes.ts",
        "app/app.css",
        "app/shared/themes/**",
        "app/assets/**",
      ],
    },
  },
});
