export function normalizeApiRoot(value) {
  if (!value) {
    return "";
  }

  const withoutTrailingSlash = value.replace(/\/+$/, "");
  return withoutTrailingSlash.endsWith("/api")
    ? withoutTrailingSlash
    : `${withoutTrailingSlash}/api`;
}

export const apiRootUrl = normalizeApiRoot(process.env.NEXT_PUBLIC_API_URL);

export function buildApiUrl(path) {
  if (!apiRootUrl) {
    return "";
  }

  const cleanPath = path.replace(/^\/+/, "").replace(/^api\//, "");
  return `${apiRootUrl}/${cleanPath}`;
}
