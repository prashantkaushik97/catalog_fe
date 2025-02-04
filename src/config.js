const config = {
    local: {
      hostname: 'http://127.0.0.1:8000',
    },
    production: {
      hostname: 'https://your-prod-api-url.com',
    },
  };
  
  const getApiUrl = () => {
    if (process.env.NODE_ENV === 'production') {
      return config.production.hostname;
    } else {
      return config.local.hostname;
    }
  };
  
  export { getApiUrl };
  