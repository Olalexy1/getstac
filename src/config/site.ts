export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Getstac",
  description: "This is a platform for getting stuff done.",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://getstac.com",
};
