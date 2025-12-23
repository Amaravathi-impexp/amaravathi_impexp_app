import { Ship, Truck, Warehouse, Globe } from 'lucide-react';

const services = [
  {
    icon: Ship,
    title: 'Ocean Freight',
    description: 'Full container load (FCL) and less than container load (LCL) services to any destination worldwide.',
  },
  {
    icon: Truck,
    title: 'Inland Transportation',
    description: 'Reliable door-to-door delivery with our extensive network of ground transportation partners.',
  },
  {
    icon: Warehouse,
    title: 'Warehousing & Distribution',
    description: 'Secure storage solutions and efficient distribution services across key locations globally.',
  },
  {
    icon: Globe,
    title: 'Supply Chain Management',
    description: 'End-to-end supply chain optimization and visibility for seamless global operations.',
  },
];

export function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive logistics solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <button className="mt-4 text-blue-600 hover:underline">Learn more →</button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
