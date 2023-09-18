import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  resolve: {
    alias: [
        { find: '@slices', replacement: path.resolve(__dirname, 'src/redux/slices') },
        { find: '@store', replacement: path.resolve(__dirname, 'src/redux/store') },
        { find: '@resources', replacement: path.resolve(__dirname, 'src/resources') },
        { find: '@schemas', replacement: path.resolve(__dirname, 'src/schemas') },
        { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
        { find: '@config', replacement: path.resolve(__dirname, 'src/config') },
        { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
        { find: '@routes', replacement: path.resolve(__dirname, 'src/routes') }
    ],
  },
})
