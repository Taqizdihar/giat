import axios from 'axios';

/**
 * Centralized API client for the UNI-VERSE Headless CMS.
 *
 * - Base URL is sourced from VITE_CMS_BASE_URL env variable.
 * - Every request automatically includes the x-api-key header
 *   and Content-Type: application/json.
 */
const cmsClient = axios.create({
  baseURL: import.meta.env.DEV ? '' : import.meta.env.VITE_CMS_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_CMS_API_KEY,
  },
});

// ─── Settings ────────────────────────────────────────────────────────
export async function fetchSettings() {
  try {
    const { data } = await cmsClient.get('/api/v1/public/settings');
    return data;
  } catch (error) {
    console.error('[CMS] Failed to fetch settings:', error);
    return null;
  }
}

// ─── Navigation ──────────────────────────────────────────────────────
export async function fetchNavigation() {
  try {
    const { data } = await cmsClient.get('/api/v1/public/navigation');
    return data;
  } catch (error) {
    console.error('[CMS] Failed to fetch navigation:', error);
    return null;
  }
}

// ─── Pages ───────────────────────────────────────────────────────────
export async function fetchPage(slug: string) {
  try {
    const { data } = await cmsClient.get(`/api/v1/public/pages/${slug}`);
    return data;
  } catch (error) {
    console.error(`[CMS] Failed to fetch page "${slug}":`, error);
    return null;
  }
}

// ─── Posts ────────────────────────────────────────────────────────────
export async function fetchPosts() {
  try {
    const { data } = await cmsClient.get('/api/v1/public/posts');
    return data;
  } catch (error) {
    console.error('[CMS] Failed to fetch posts:', error);
    return null;
  }
}

export default cmsClient;
