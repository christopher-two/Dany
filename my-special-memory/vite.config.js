import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Si quieres mantener el mismo puerto que CRA (3000):
  server: {
    port: 5173,
    open: true // Opcional: abre el navegador automáticamente
  }
});