import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  server: {
    port: 5000,
    open: true
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, 'src') },
      { find: 'assets', replacement: path.resolve(__dirname, 'src/assets') },
      {
        find: 'features',
        replacement: path.resolve(__dirname, 'src/features')
      },
      {
        find: 'components',
        replacement: path.resolve(__dirname, 'src/components')
      }
    ]
  }
});
