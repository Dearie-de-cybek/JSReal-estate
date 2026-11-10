import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return ["", "/about", "/properties", "/advisory", "/journal", "/contact", "/privacy"].map((p) => ({
    url: base + p,
    changeFrequency: "weekly" as const,
  }));
}
