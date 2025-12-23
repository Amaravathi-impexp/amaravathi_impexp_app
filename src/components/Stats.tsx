const stats = [
  { value: '700+', label: 'Vessels' },
  { value: '300+', label: 'Ports Worldwide' },
  { value: '130', label: 'Countries' },
  { value: '20M', label: 'Containers Shipped Annually' },
];

export function Stats() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl mb-2">{stat.value}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
