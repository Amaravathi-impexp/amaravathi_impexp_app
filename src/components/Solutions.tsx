import { ImageWithFallback } from './figma/ImageWithFallback';

const solutions = [
  {
    title: 'Port & Terminal Services',
    description: 'Access to over 300 ports worldwide with state-of-the-art terminal facilities for efficient cargo handling.',
    image: 'https://images.unsplash.com/photo-1672870152741-e526cfe5419b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMGNvbnRhaW5lcnMlMjBwb3J0fGVufDF8fHx8MTc2NjMzMzY2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'Integrated Logistics',
    description: 'Streamline your operations with our end-to-end logistics solutions, from warehouse to final delivery.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjB3YXJlaG91c2V8ZW58MXx8fHwxNzY2MzI3Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'Digital Solutions',
    description: 'Real-time tracking, automated documentation, and data analytics to optimize your supply chain.',
    image: 'https://images.unsplash.com/photo-1681770678332-3a190df72091?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBuZXR3b3JrJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjYyNzg2MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function Solutions() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">Industry-Leading Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Innovative approaches to modern logistics challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                <ImageWithFallback
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <h3 className="mb-2">{solution.title}</h3>
              <p className="text-gray-600 mb-4">{solution.description}</p>
              <button className="text-blue-600 hover:underline">Explore solution →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
