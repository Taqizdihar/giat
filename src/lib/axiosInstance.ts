import axios from 'axios';

/**
 * Centralized API client for the UNI-VERSE Headless CMS.
 *
 * - Base URL is sourced from VITE_CMS_BASE_URL env variable.
 * - Every request automatically includes the x-api-key header
 *   and Content-Type: application/json.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_CMS_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_CMS_API_KEY,
  },
});

export default api;
