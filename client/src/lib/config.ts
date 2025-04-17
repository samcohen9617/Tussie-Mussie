// Environment-based configuration using Vite's import.meta.env
// All client environment variables start with VITE_

// Environment detection
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Game Configuration
export const GAME_REFRESH_INTERVAL = 
  parseInt(import.meta.env.VITE_GAME_REFRESH_INTERVAL || '2000', 10);

// Feature Flags
export const ENABLE_TUTORIAL = 
  import.meta.env.VITE_ENABLE_TUTORIAL === 'true' || true;
export const ENABLE_ANIMATIONS = 
  import.meta.env.VITE_ENABLE_ANIMATIONS === 'true' || true;
export const ENABLE_DEBUG = 
  import.meta.env.VITE_ENABLE_DEBUG === 'true' || false;

// Add more configuration values as needed