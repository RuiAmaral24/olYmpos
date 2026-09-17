export function getSafeNotificationTarget(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return null;
  }

  try {
    const url = new URL(value, "https://olympos.local");

    if (url.origin !== "https://olympos.local") {
      return null;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}
