import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    cors: true, // ✅ Enables CORS
    host: 'localhost',
    port: 5173,
  },
});
