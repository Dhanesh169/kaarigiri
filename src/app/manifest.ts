import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Kaarigiri — Made with meaning",
    short_name: "Kaarigiri",
    description: "Thoughtfully crafted pieces from Kaarigiri.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    background_color: "#f7f5ef",
    theme_color: "#25271f",
    orientation: "portrait-primary",
    categories: ["shopping", "lifestyle"],
    icons: [
      { src: "/kaarigiri-icon.svg", sizes: "192x192 512x512", type: "image/svg+xml", purpose: "any" },
      { src: "/kaarigiri-icon.svg", sizes: "192x192 512x512", type: "image/svg+xml", purpose: "maskable" }
    ]
  };
}
