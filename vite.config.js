// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     open: true,
//   },
//   build: {
//     outDir: 'dist'
//   },
//   base: '/',
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    historyApiFallback: true, //  required for React Router
  },
  test: {
    globals: true, //to write test() and expect() without imports
    environment: 'jsdom', //simulates browser DOM environment
    setupFiles: './src/setupTests.js', //where the jest-dom matchers get imported
  },
});
