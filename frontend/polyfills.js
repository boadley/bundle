/* Polyfill for window.matchMedia in React Native, required for @hashgraph/hedera-wallet-connect v1 */

// In RN, window is global but matchMedia is undefined
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: query.includes('prefers-color-scheme') ? window.matchMedia(query).matches : false, // Mock for color scheme if needed; default true for mobile
    media: query,
    onchange: null,
    addListener: () => {}, // Legacy
    removeListener: () => {}, // Legacy
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// Optional: If lib uses other web APIs, add here (e.g., IntersectionObserver for lazy, but not needed)
