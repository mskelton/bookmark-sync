import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/background.ts"],
  format: "esm",
  publicDir: true,
})
