import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/coming-soon"] },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
