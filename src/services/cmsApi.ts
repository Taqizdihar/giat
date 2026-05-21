import axios from 'axios';

/**
 * Centralized API client for the UNI-VERSE Headless CMS.
 *
 * - Base URL is sourced from VITE_CMS_BASE_URL env variable.
 * - Every request automatically includes the x-api-key header
 *   and Content-Type: application/json.
 */
const cmsClient = axios.create({
  baseURL: import.meta.env.VITE_CMS_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_CMS_API_KEY,
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// DATA ADAPTER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Highly flexible data adapter function that maps properties safely
 * using short-circuit evaluation.
 *
 * Live API response shapes observed:
 *   - Settings  → flat object (no nesting)
 *   - Navigation → array at root  (items live directly under response)
 *   - Pages list → array at root
 *   - Page by slug → flat object with `content[]` blocks
 *   - Posts → array at root
 *   - Health → flat object
 *
 * The adapter normalizes all of the above so callers always receive the
 * inner payload without needing to know the wire format.
 */
export const adaptData = (response: any, fallback: any = null) => {
  if (!response) return fallback;

  // If the response itself is already a plain array, return it directly
  if (Array.isArray(response)) return response;

  // Unwrap common nesting patterns from the CMS
  // Pattern: { data: { ... } }  or  { data: [ ... ] }
  if (response.data !== undefined) {
    if (response.data.content !== undefined) return response.data;
    return response.data;
  }

  // If the response is a plain object (most settings / page payloads), return as-is
  return response || fallback;
};

/**
 * Extract a typed content block from a page's `content[]` array.
 * Returns the block's `.data` sub-object, or the supplied fallback.
 *
 * Usage:
 *   const hero = extractContentBlock(pageData, 'hero', {});
 */
export function extractContentBlock<T = any>(
  page: any,
  blockType: string,
  fallback: T,
): T {
  const blocks: any[] = Array.isArray(page?.content) ? page.content : [];
  const block = blocks.find((b: any) => b?.type === blockType);
  return (block?.data as T) ?? fallback;
}

/**
 * Safely resolve a nested property path with a fallback.
 *   safe(settings, 'social_links.0.url', '#')
 */
export function safe<T = any>(obj: any, path: string, fallback: T): T {
  const value = path.split('.').reduce((acc, key) => acc?.[key], obj);
  return (value as T) ?? fallback;
}

// ─────────────────────────────────────────────────────────────────────────────
// SLUG MAP — canonical slugs used by the CMS tenant
// ─────────────────────────────────────────────────────────────────────────────

export const CMS_SLUGS = {
  HOME: 'beranda',
  PROFILE: 'profil',
  CATALOG: 'katalog',
  PARTNERSHIP: 'kemitraan',
  SERVICES: 'layanan',
  CONTACT: 'kontak',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Map from CMS page slug → frontend route path */
const SLUG_TO_ROUTE: Record<string, string> = {
  beranda: '/',
  profil: '/profil',
  katalog: '/katalog',
  kemitraan: '/kemitraan',
  layanan: '/layanan',
  kontak: '/kontak',
};

/**
 * Normalize a navigation item coming from the CMS into { name, href }.
 * The live schema returns { title, slug } so we map accordingly.
 */
export function normalizeNavItem(item: any): { name: string; href: string } {
  return {
    name: item?.title ?? item?.label ?? item?.name ?? '',
    href: item?.url ?? item?.href ?? SLUG_TO_ROUTE[item?.slug] ?? `/${item?.slug ?? ''}`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. GET /api/v1/health
// ─────────────────────────────────────────────────────────────────────────────

export async function checkHealth() {
  try {
    const { data } = await cmsClient.get('/api/v1/health');
    return adaptData(data, { status: 'unknown' });
  } catch (error) {
    console.error('[CMS] Failed to check health:', error);
    return { status: 'error' };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. GET /api/v1/public/settings
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchSettings() {
  try {
    const { data } = await cmsClient.get('/api/v1/public/settings');
    return adaptData(data, {});
  } catch (error) {
    console.error('[CMS] Failed to fetch settings:', error);
    return {};
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. GET /api/v1/public/navigation
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchNavigation() {
  try {
    const { data } = await cmsClient.get('/api/v1/public/navigation');
    // The live API returns an array of { title, slug } items directly
    const raw = adaptData(data, []);
    const items = Array.isArray(raw) ? raw : (raw?.items ?? raw?.value ?? []);
    return items;
  } catch (error) {
    console.error('[CMS] Failed to fetch navigation:', error);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. GET /api/v1/public/pages
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchPages() {
  try {
    const { data } = await cmsClient.get('/api/v1/public/pages');
    const raw = adaptData(data, []);
    return Array.isArray(raw) ? raw : (raw?.pages ?? raw?.value ?? []);
  } catch (error) {
    console.error('[CMS] Failed to fetch pages:', error);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. GET /api/v1/public/pages/:slug
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchPage(slug: string) {
  try {
    const { data } = await cmsClient.get(`/api/v1/public/pages/${slug}`);
    return adaptData(data, null);
  } catch (error) {
    console.error(`[CMS] Failed to fetch page "${slug}":`, error);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. GET /api/v1/public/posts
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchPosts() {
  try {
    const { data } = await cmsClient.get('/api/v1/public/posts');
    const raw = adaptData(data, []);
    return Array.isArray(raw) ? raw : (raw?.posts ?? raw?.value ?? []);
  } catch (error) {
    console.error('[CMS] Failed to fetch posts:', error);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. GET /api/v1/public/posts/:slug
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchPost(slug: string) {
  try {
    const { data } = await cmsClient.get(`/api/v1/public/posts/${slug}`);
    return adaptData(data, null);
  } catch (error) {
    console.error(`[CMS] Failed to fetch post "${slug}":`, error);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. GET /api/v1/public/posts/:id/comments
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchComments(postId: string | number) {
  try {
    const { data } = await cmsClient.get(`/api/v1/public/posts/${postId}/comments`);
    const raw = adaptData(data, []);
    return Array.isArray(raw) ? raw : (raw?.comments ?? []);
  } catch (error) {
    console.error(`[CMS] Failed to fetch comments for post ${postId}:`, error);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. POST /api/v1/public/posts/:id/comments
// ─────────────────────────────────────────────────────────────────────────────

export async function submitComment(
  postId: string | number,
  payload: { author_name: string; author_email: string; content: string },
) {
  try {
    const { data } = await cmsClient.post(`/api/v1/public/posts/${postId}/comments`, payload);
    return adaptData(data, null);
  } catch (error) {
    console.error(`[CMS] Failed to submit comment for post ${postId}:`, error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. POST /api/v1/inquiries
// ─────────────────────────────────────────────────────────────────────────────

export async function submitInquiry(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const { data } = await cmsClient.post('/api/v1/inquiries', payload);
    return adaptData(data, null);
  } catch (error) {
    console.error('[CMS] Failed to submit inquiry:', error);
    throw error;
  }
}

export default cmsClient;
