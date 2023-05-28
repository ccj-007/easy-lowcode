import { UserConfigExport } from "vite";
import react from "@vitejs/plugin-react";

const renderConfig: UserConfigExport = {
  build: {
    outDir: "es",
    lib: {
      entry: "../src/renderer/index.ts",
    },
    minify: true,
    rollupOptions: {
      input: ["../src/renderer/index.ts"],
      /**
       * react 没有esm的包可以导入所以不能排除，如果在html中使用请保留
       * 如果在cra或其他cli中请排除
       * 
       * external: ['react', 'react-dom']
       */
      output: [
        {
          format: "es",
          entryFileNames: "index.js",
          dir: "../renderer",
        },
      ],
    },
  },
  plugins: [react()],
}

export default renderConfig