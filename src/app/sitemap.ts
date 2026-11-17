import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jojo.jy.is";
  return ["/", "/cost/", "/geo/"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: "2020-01-24",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
}
