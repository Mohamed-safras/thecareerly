import {
  CONNECT_ORGANIZATION_NEW,
  LOGIN,
  FORBIDDEN,
} from "../const/router-links";

/**
 * List of routes that are accessible without authentication.
 * These are exact matches or prefixes depending on usage in middleware.
 */
export const publicRoutes = [
  LOGIN,
  CONNECT_ORGANIZATION_NEW,
  FORBIDDEN,
  "/_next",
  "/images",
  "/public",
  "/favicon.ico",
];
