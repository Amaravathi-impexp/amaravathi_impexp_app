import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Ready to Ship with Us?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Get started today and experience seamless global logistics with our expert team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2">
              Get a Quote
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 border border-white text-white rounded hover:bg-white hover:text-gray-900 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
