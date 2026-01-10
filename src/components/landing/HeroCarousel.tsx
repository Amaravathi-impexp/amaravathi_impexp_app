import { useState, useEffect, useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Import Figma images
import img1 from 'figma:asset/5fb11d275a19a080815d3496c657c4aae3e27bd7.png';
import img2 from 'figma:asset/d1333a74c8ee158a46e2bd3eeb2a40cd47cac3dc.png';
import img3 from 'figma:asset/62caafb41d1fd09984220d127e16a83c687bef7a.png';
import img4 from 'figma:asset/52cc5ec2157f41754dd541a2e6b0180f2b6966cd.png';

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
    image: img1,
    title: 'One Platform. End-to-End Trade',
    description: 'Manage your entire import-export operations from a single unified platform',
    alt: 'End-to-end trade platform dashboard',
  },
  {
    id: 2,
    image: img2,
    title: 'AI-Powered Compliance & Fraud Protection',
    description: 'Advanced AI verification and risk detection to protect your business',
    alt: 'AI-powered compliance and fraud detection',
  },
  {
    id: 3,
    image: img3,
    title: 'Smart Documents. Zero Guesswork',
    description: 'Automated document processing with intelligent verification',
    alt: 'Smart document automation',
  },
  {
    id: 4,
    image: img4,
    title: 'Real-Time Analytics & Trade Visibility',
    description: 'Track and analyze your shipments with comprehensive real-time insights',
    alt: 'Real-time analytics and trade visibility dashboard',
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
    <Box
      sx={{
        position: 'relative',
        height: { xs: 450, sm: 550 },
        bgcolor: 'grey.900',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <Box sx={{ position: 'relative', height: '100%' }}>
        {slides.map((slide, index) => (
          <Box
            key={slide.id}
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: index === currentSlide ? 1 : 0,
              zIndex: index === currentSlide ? 10 : 0,
              transition: 'opacity 1s',
            }}
          >
            {/* Background Image with Overlay */}
            <Box sx={{ position: 'absolute', inset: 0 }}>
              {slide.images ? (
                // Grid layout for multiple images
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gridTemplateRows: 'repeat(2, 1fr)',
                    gap: 0.125,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {slide.images.map((img, imgIndex) => (
                    <Box key={imgIndex} sx={{ position: 'relative', overflow: 'hidden' }}>
                      <ImageWithFallback
                        src={img}
                        alt={`${slide.alt} ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                // Single image layout
                <ImageWithFallback
                  src={slide.image || ''}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Gradient Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.9) 100%)',
                }}
              />
            </Box>

            {/* Content - Bottom Left */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 10,
              }}
            >
              <Box
                sx={{
                  maxWidth: 1280,
                  mx: 'auto',
                  px: { xs: 2, sm: 3, lg: 4 },
                  pb: { xs: 6, sm: 8 },
                }}
              >
                <Box sx={{ maxWidth: 672 }}>
                  {/* Title */}
                  <Box
                    component="h2"
                    sx={{
                      color: 'white',
                      mb: { xs: 1.5, sm: 2 },
                      fontSize: { xs: '1.5rem', sm: '1.875rem', lg: '2.25rem' },
                      fontWeight: 700,
                      opacity: index === currentSlide ? 1 : 0,
                      transform: index === currentSlide ? 'translateY(0)' : 'translateY(32px)',
                      transition: 'all 0.7s 0.1s',
                    }}
                  >
                    {slide.title}
                  </Box>

                  {/* Description */}
                  <Box
                    component="p"
                    sx={{
                      fontSize: { xs: '1.125rem', sm: '1.25rem' },
                      color: 'grey.200',
                      opacity: index === currentSlide ? 1 : 0,
                      transform: index === currentSlide ? 'translateY(0)' : 'translateY(32px)',
                      transition: 'all 0.7s 0.2s',
                    }}
                  >
                    {slide.description}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Navigation Arrows */}
      <IconButton
        onClick={prevSlide}
        aria-label="Previous slide"
        sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          color: 'grey.800',
          p: 1.5,
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          '&:hover': {
            bgcolor: 'white',
            transform: 'translateY(-50%) scale(1.1)',
          },
          transition: 'all 0.2s',
        }}
      >
        <ChevronLeft className="w-6 h-6" />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        aria-label="Next slide"
        sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          color: 'grey.800',
          p: 1.5,
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          '&:hover': {
            bgcolor: 'white',
            transform: 'translateY(-50%) scale(1.1)',
          },
          transition: 'all 0.2s',
        }}
      >
        <ChevronRight className="w-6 h-6" />
      </IconButton>

      {/* Dot Indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 32,
          left: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          {slides.map((_, index) => (
            <Box
              key={index}
              component="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              sx={{
                borderRadius: '9999px',
                transition: 'all 0.3s',
                bgcolor: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)',
                width: index === currentSlide ? 32 : 12,
                height: 12,
                border: 'none',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.75)',
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
