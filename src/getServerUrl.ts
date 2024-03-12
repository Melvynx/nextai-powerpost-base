export const getServerUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  if (process.env.VERCEL_ENV === "production") {
    return "https://powerpost.app";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};
