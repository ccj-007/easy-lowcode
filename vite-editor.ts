import { UserConfigExport } from "vite";

const EditorConfig: UserConfigExport = {
    build: {
        outDir: "es",
        lib: {
            entry: "./src/package/editor/index.ts",
        },
        minify: true,
        rollupOptions: {
            input: ["./src/package/editor/index.ts",],
            output: [
                {
                    format: "es",
                    entryFileNames: "index.js",
                    dir: "./editor",
                },
            ],
        },
    },
}

export default EditorConfig