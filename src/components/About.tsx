import { TopRibbon } from './TopRibbon';
import { Logo } from './Logo';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { Ship, Globe, Users, Award, Target, Heart } from 'lucide-react';

interface AboutProps {
  onClose: () => void;
  onHomeClick?: () => void;
  onAboutClick?: () => void;
  onCareersClick?: () => void;
  onContactClick?: () => void;
  onSignInClick?: () => void;
}

export function About({ onClose, onHomeClick, onAboutClick, onCareersClick, onContactClick, onSignInClick }: AboutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation 
        onSignInClick={onSignInClick}
        onHomeClick={onHomeClick}
        onAboutClick={onAboutClick}
        onCareersClick={onCareersClick}
        onContactClick={onContactClick}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl mb-6">About Amaravathi</h1>
            <p className="text-xl max-w-3xl">
              Leading the way in global shipping and logistics solutions for over two decades.
            </p>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2003, Amaravathi Imports & Exports has grown from a small regional shipping company 
                  to a global logistics powerhouse. We connect businesses across continents, facilitating trade 
                  and commerce through innovative shipping solutions.
                </p>
                <p className="text-gray-600 mb-4">
                  With a fleet of modern vessels and a network spanning over 100 countries, we handle everything 
                  from small cargo shipments to large-scale container logistics. Our commitment to reliability, 
                  efficiency, and customer satisfaction has made us a trusted partner for businesses worldwide.
                </p>
                <p className="text-gray-600">
                  Today, we continue to innovate and expand, leveraging cutting-edge technology and sustainable 
                  practices to shape the future of global shipping.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-blue-600 text-4xl mb-2">20+</div>
                  <div className="text-gray-600">Years of Experience</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-blue-600 text-4xl mb-2">100+</div>
                  <div className="text-gray-600">Countries Served</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-blue-600 text-4xl mb-2">50K+</div>
                  <div className="text-gray-600">Shipments Annually</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-blue-600 text-4xl mb-2">5K+</div>
                  <div className="text-gray-600">Global Clients</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl text-center mb-12">Our Mission & Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  To provide world-class shipping and logistics solutions that enable global commerce and 
                  connect businesses across borders.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We maintain the highest standards in every aspect of our operations, from fleet maintenance 
                  to customer service.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  Committed to reducing our environmental impact through eco-friendly practices and modern, 
                  efficient vessels.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl text-center mb-12">Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <Users className="w-24 h-24 text-white opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-1">Rajesh Kumar</h3>
                  <p className="text-blue-600 mb-3">Chief Executive Officer</p>
                  <p className="text-gray-600 text-sm">
                    With 25 years in the maritime industry, Rajesh leads our global operations and strategic vision.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <Users className="w-24 h-24 text-white opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-1">Priya Sharma</h3>
                  <p className="text-blue-600 mb-3">Chief Operations Officer</p>
                  <p className="text-gray-600 text-sm">
                    Priya oversees our day-to-day operations, ensuring seamless logistics across all continents.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <Users className="w-24 h-24 text-white opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-1">Michael Chen</h3>
                  <p className="text-blue-600 mb-3">Chief Technology Officer</p>
                  <p className="text-gray-600 text-sm">
                    Michael drives our digital transformation and innovation in logistics technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Presence */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl text-center mb-12">Global Presence</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Globe className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-xl mb-2">Asia Pacific</h3>
                <p className="text-gray-600">Singapore, Mumbai, Shanghai</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Globe className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-xl mb-2">Europe</h3>
                <p className="text-gray-600">Rotterdam, Hamburg, Antwerp</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Globe className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-xl mb-2">Americas</h3>
                <p className="text-gray-600">Los Angeles, New York, Santos</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Globe className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-xl mb-2">Middle East</h3>
                <p className="text-gray-600">Dubai, Jebel Ali, Doha</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}