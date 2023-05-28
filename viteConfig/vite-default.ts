import { UserConfigExport } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const EditorConfig: UserConfigExport = {
    plugins: [react()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "../src")
        },
        extensions: ['.js', '.tsx', '.vue', '.ts']
    }
}

export default EditorConfig