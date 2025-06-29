import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // O '@vitejs/plugin-react' si no usas SWC

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- ¡Añade esta sección 'server' para el proxy! ---
  server: {
    proxy: {
      // Cuando tu aplicación pida algo que empiece por '/discovery',
      // Vite lo redirigirá a 'https://app.ticketmaster.com'
      '/discovery': {
        target: 'https://app.ticketmaster.com',
        changeOrigin: true, // Esto es crucial para la seguridad y para que el servidor de destino lo acepte
        rewrite: (path) => path.replace(/^\/discovery/, '/discovery'), // En este caso, la ruta se mantiene igual
        secure: true, // Usa 'true' si el destino es HTTPS (como Ticketmaster)
      },
    },
  },
  // ----------------------------------------------------
});