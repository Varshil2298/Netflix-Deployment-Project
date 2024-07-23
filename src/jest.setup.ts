Object.defineProperty(global, 'import.meta', {
    value: {
      env: {
        VITE_APP_API_ENDPOINT_URL: process.env.VITE_APP_API_ENDPOINT_URL,
        VITE_APP_TMDB_V3_API_KEY: process.env.VITE_APP_TMDB_V3_API_KEY,
      }
    }
  });
  
  export {};
  