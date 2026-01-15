import { getServices } from "@/lib/data";
import { notFound } from "next/navigation";

// 1. Generate Static Params (SSG) for ultra-fast loading
export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const services = await getServices();
  const service = services.find((s) => s.slug === params.slug);
  
  if (!service) return {};

  return {
    title: `${service.title} | Top Tier Development`,
    description: service.description,
    openGraph: {
        title: service.title,
        description: service.description,
    }
  };
}

// 3. The Page Content
export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const services = await getServices();
  const service = services.find((s) => s.slug === params.slug);

  if (!service) notFound();

  return (
    <div className="max-w-4xl mx-auto py-24 px-6">
      <h1 className="text-6xl font-black mb-8 text-gray-900">{service.title}</h1>
      <p className="text-xl text-gray-600 leading-loose">{service.description}</p>
      {/* Add more detailed content here */}
    </div>
  );
}