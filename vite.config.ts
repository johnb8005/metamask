import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { ProxyOptions } from "vite";

const proxy: { [l: string]: ProxyOptions } = {
  "^/api/.*": {
    target: "http://localhost:3001",
    changeOrigin: true,
    secure: false,
    rewrite: (path: string) => path.replace(/^\/api/, ""),
  },
};

const port = 8080;

// this the default/base configuration
const baseConfig = {
  plugins: [react()],
  test: {
    // ...
  },
  server: { port, proxy },
  // from  https://github.com/sveltejs/kit/issues/859#issuecomment-1184696144 so solana/web3 would work
  build: {
    target: ["es2020"],
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
};

// https://vitejs.dev/config/
// conditional config: https://vitejs.dev/config/#conditional-config
export default defineConfig(({ command, mode, ssrBuild }) => {
  // if  `mode===ghpages`: we add the path prefix to match the path prefix of gh pages
  if (mode === "ghpages") {
    return { ...baseConfig, base: "/web3/" };
  }

  return baseConfig;
});
