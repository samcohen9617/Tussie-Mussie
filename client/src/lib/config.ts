// Environment-based configuration
const isDevelopment = process.env.NODE_ENV === 'development';

// Base URL for API calls
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000' // Local development
  : ''; // Production (relative URL)

// Other config values can be added here