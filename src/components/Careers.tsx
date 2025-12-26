import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Construction, Hammer, HardHat, Wrench, Cog, Sparkles } from 'lucide-react';

interface CareersProps {
  onClose: () => void;
  onHomeClick?: () => void;
  onAboutClick?: () => void;
  onCareersClick?: () => void;
  onContactClick?: () => void;
  onSignInClick?: () => void;
  currentView?: string;
}

export function Careers({ onClose, onHomeClick, onAboutClick, onCareersClick, onContactClick, onSignInClick, currentView }: CareersProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation 
        onSignInClick={onSignInClick}
        onHomeClick={onHomeClick}
        onAboutClick={onAboutClick}
        onCareersClick={onCareersClick}
        onContactClick={onContactClick}
        currentView={currentView}
      />

      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Animated Construction Icons */}
          <div className="relative mb-12">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="animate-bounce delay-0">
                <HardHat className="w-16 h-16 text-orange-500" />
              </div>
              <div className="animate-bounce delay-100">
                <Construction className="w-20 h-20 text-blue-600" />
              </div>
              <div className="animate-bounce delay-200">
                <Wrench className="w-16 h-16 text-orange-500" />
              </div>
            </div>
            
            {/* Rotating Gears */}
            <div className="absolute top-0 left-1/4 animate-spin-slow opacity-20">
              <Cog className="w-12 h-12 text-gray-400" />
            </div>
            <div className="absolute bottom-0 right-1/4 animate-spin-slow-reverse opacity-20">
              <Cog className="w-16 h-16 text-gray-400" />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Coming Soon</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Under Construction
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              We're building something amazing! Our Careers page is currently under development. 
              We're crafting the perfect space to showcase exciting opportunities at Amaravathi.
            </p>

            {/* Construction Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-orange-500 h-full rounded-full animate-progress" style={{ width: '65%' }}>
                  <div className="h-full w-full bg-white/20 animate-shimmer"></div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">65% Complete</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-100">
                <div className="text-3xl text-blue-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Positions Planned</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-orange-100">
                <div className="text-3xl text-orange-500 mb-2">15+</div>
                <div className="text-sm text-gray-600">Global Locations</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-100">
                <div className="text-3xl text-blue-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Worth the Wait</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-blue-50 rounded-2xl border-2 border-blue-200 max-w-2xl mx-auto">
              <h3 className="text-2xl mb-3">Interested in joining us?</h3>
              <p className="text-gray-600 mb-6">
                In the meantime, feel free to reach out to our HR team directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={onContactClick}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Us
                </button>
                <a 
                  href="mailto:careers@amaravathi.com"
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Email: careers@amaravathi.com
                </a>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex items-center justify-center gap-3 text-gray-400">
            <Hammer className="w-5 h-5 animate-pulse" />
            <span className="text-sm">Building with care...</span>
            <Hammer className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 65%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-slow-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-progress {
          animation: progress 2s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 8s linear infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}} />
    </div>
  );
}