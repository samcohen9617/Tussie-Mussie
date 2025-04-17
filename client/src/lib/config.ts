// Environment-based configuration
const isDevelopment = process.env.NODE_ENV === 'development';
const isLocalDev = false; // Set this to true when developing locally with separate servers

// Base URL for API calls
export const API_BASE_URL = isLocalDev 
  ? 'http://localhost:5000' // Local development with separate servers
  : ''; // Production or Replit (relative URL)

// Other config values can be added here