import react from "@vitejs/plugin-react";
import { defineConfig } from 'vite';
import RendererConfig from './vite-renderer'
import EditorConfig from './vite-editor'

let curConfig

switch (process.env.NODE_ENV) {
    case 'renderer':
        curConfig = RendererConfig
        break;
    case 'editor':
        curConfig = EditorConfig
        break;
    default:
        curConfig = {
            plugins: [react()]
        }
        break;
}

export default defineConfig(curConfig)
