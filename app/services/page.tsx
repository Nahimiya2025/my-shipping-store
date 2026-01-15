import { getServices, iconMap } from "@/lib/data";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | High Performance Tech",
  description: "Explore our full stack development services.",
};

export default async function ServicesPage() {
  const services = await getServices(); // Fetched on the server

  return (
    <section className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-16 text-gray-900 tracking-tight">
          Our Expertise
        </h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Link 
                href={`/services/${service.slug}`} 
                key={service.id}
                className="group block"
              >
                <article className="h-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon size={24} />
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-900">{service.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.features.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}