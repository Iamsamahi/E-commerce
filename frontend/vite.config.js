// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],

//   //what we are basically doing here is setting up a proxy for our development server.
//   //  This means that when we make API requests to endpoints starting with "/api", 
//   // those requests will be forwarded to "http://localhost:5000". 
//   // This is useful because it allows us to avoid CORS issues during development 
//   // and makes it easier to work with our backend server without having to worry about cross-origin requests. 
//   // In production, you would typically configure your backend server to serve the frontend assets and handle API requests directly,
//   //  so this proxy setup is mainly for development convenience.
//   server: {
//     proxy:{
//       "/api": {
//         target: "http://localhost:5000",

//       }
//     }
//   }
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      }
    },

    watch: {
      usePolling: true,   // 🔥 fixes delayed updates (especially OneDrive)
    }
  }
})