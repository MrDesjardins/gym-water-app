import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
  server: {
    port: Number(process.env.WEBCLIENT_PORT),
  },
});
