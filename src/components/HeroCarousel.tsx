import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CarouselSlide {
  id: number;
  image?: string;
  images?: string[];
  title: string;
  description: string;
  alt: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1634114627043-9a2abf455494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBzcGljZXMlMjByaWNlJTIwdHVybWVyaWMlMjBjaGlsbGllcyUyMGdyYWluc3xlbnwxfHx8fDE3NjY3NjM2OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '1. Sourcing Excellence',
    description: 'Direct procurement from South Indian farmers - Premium rice, mirchi, turmeric, aata flour, and millets',
    alt: 'Indian agricultural products - rice, spices, turmeric, chillies, and grains',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1574850183045-b3a7bcc4b93d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcHJvY2Vzc2luZyUyMHBhY2tpbmclMjBmYWN0b3J5fGVufDF8fHx8MTc2Njc1ODY4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '2. Processing & Packaging',
    description: 'State-of-the-art processing facilities with international quality standards',
    alt: 'Food processing and packing facility',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1703977883249-d959f2b0c1ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHNoaXBwaW5nJTIwdHJhbnNwb3J0JTIwbG9naXN0aWNzfGVufDF8fHx8MTc2Njc1ODY4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '3. Global Logistics',
    description: 'Multi-modal transport solutions - Sea, Air & Road freight worldwide',
    alt: 'Cargo shipping and transport',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1759409281186-2413fa83738d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBtYXJrZXQlMjBjdXN0b21lcnMlMjBzaG9wcGluZ3xlbnwxfHx8fDE3NjY3NTg2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '4. Market Delivery',
    description: 'Seamless distribution to retailers and customers across global markets',
    alt: 'Retail market customers shopping',
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 2; // 100 / 50 = 2% every 100ms = 5 seconds total
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isPaused, currentSlide]);

  // Change slide when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      nextSlide();
    }
  }, [progress, nextSlide]);

  return (
    <div 
      className="relative h-[500px] sm:h-[600px] bg-gray-900 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              {slide.images ? (
                // Grid layout for multiple images
                <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full">
                  {slide.images.map((img, imgIndex) => (
                    <div key={imgIndex} className="relative overflow-hidden">
                      <ImageWithFallback
                        src={img}
                        alt={`${slide.alt} ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                // Single image layout
                <ImageWithFallback
                  src={slide.image || ''}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30 sm:from-black/70 sm:via-black/50 sm:to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-2xl">
                {/* Slide Number */}
                <div 
                  className={`inline-block bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm mb-3 sm:mb-4 transition-all duration-700 ${
                    index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </div>

                {/* Title */}
                <h2 
                  className={`text-white mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl transition-all duration-700 delay-100 ${
                    index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  {slide.title}
                </h2>

                {/* Description */}
                <p 
                  className={`text-lg sm:text-xl text-gray-200 mb-6 sm:mb-8 transition-all duration-700 delay-200 ${
                    index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  {slide.description}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all duration-100 ease-linear"
                    style={{
                      width: index === currentSlide ? `${progress}%` : '0%',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8 h-3'
                  : 'bg-white/50 hover:bg-white/75 w-3 h-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}