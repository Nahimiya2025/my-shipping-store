import { Service } from "@/types";
import { FaCode, FaServer, FaSearch } from "react-icons/fa";

// Simulating an Async Database Call with a delay
export async function getServices(): Promise<Service[]> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "1",
      slug: "web-development",
      title: "Custom Web Development",
      description: "High-performance websites built with Next.js and React server components.",
      features: ["SSR & ISR", "PWA Support", "CMS Integration"],
      icon: "code",
    },
    {
      id: "2",
      slug: "seo-optimization",
      title: "Advanced SEO Systems",
      description: "Semantic HTML5, JSON-LD structured data, and dynamic open graph tags.",
      features: ["Sitemap Generation", "Meta Tag Optimization", "Lighthouse Score 100"],
      icon: "search",
    },
    {
      id: "3",
      slug: "cloud-hosting",
      title: "Scalable Infrastructure",
      description: "Serverless deployment on Vercel with Edge functionality.",
      features: ["CI/CD Pipelines", "DDoS Protection", "Global CDN"],
      icon: "server",
    },
  ];
}

export const iconMap = {
  code: FaCode,
  server: FaServer,
  search: FaSearch,
};