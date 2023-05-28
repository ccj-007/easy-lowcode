import { defineConfig } from 'vite';
import RendererConfig from './viteConfig/vite-renderer'
import EditorConfig from './viteConfig/vite-editor'
import DefaultConfig from './viteConfig/vite-default'

let curConfig

switch (process.env.NODE_ENV) {
    case 'renderer':
        curConfig = RendererConfig
        break;
    case 'editor':
        curConfig = EditorConfig
        break;
    default:
        curConfig = DefaultConfig
        break;
}

export default defineConfig(curConfig)
