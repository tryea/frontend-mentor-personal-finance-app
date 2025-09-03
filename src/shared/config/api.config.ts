// Client-side API endpoints (proxied through Next.js API routes)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/register",
    LOGOUT: "/auth/logout",
  },
};

// Server-side configuration (only available on server)
export const getServerConfig = () => {
  const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
  const API_PREFIX = process.env.API_PREFIX || "/api/v1";

  return {
    BASE_URL: API_BASE_URL,
    PREFIX: API_PREFIX,
    FULL_URL: `${API_BASE_URL}${API_PREFIX}`,
  };
};

export default API_ENDPOINTS;
