import { Package, FileCheck, Shield, Users, CreditCard, BarChart3 } from 'lucide-react';
import { Box, Container, Typography, Paper } from '@mui/material';

const features = [
  {
    icon: Package,
    title: 'Shipments',
    benefit: 'End-to-end tracking from origin to destination',
    gradient: 'linear-gradient(135deg, #1A3D32 0%, #2D5A4A 100%)',
    bgColor: '#d4e8cd',
  },
  {
    icon: FileCheck,
    title: 'Documents',
    benefit: 'Automated documentation and digital signatures',
    gradient: 'linear-gradient(135deg, #3D7A68 0%, #2D5A4A 100%)',
    bgColor: '#f0f7ed',
  },
  {
    icon: Shield,
    title: 'Compliance',
    benefit: 'AI-powered fraud detection and verification',
    gradient: 'linear-gradient(135deg, #2D5A4A 0%, #3D7A68 100%)',
    bgColor: '#e0ff8f',
  },
  {
    icon: Users,
    title: 'Partners',
    benefit: 'Global network of verified trade partners',
    gradient: 'linear-gradient(135deg, #3D7A68 0%, #D3FF62 100%)',
    bgColor: '#c4f050',
  },
  {
    icon: CreditCard,
    title: 'Payments',
    benefit: 'Secure payment processing and invoicing',
    gradient: 'linear-gradient(135deg, #1A3D32 0%, #3D7A68 100%)',
    bgColor: '#d4e8cd',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    benefit: 'Real-time insights and performance metrics',
    gradient: 'linear-gradient(135deg, #2D5A4A 0%, #D3FF62 100%)',
    bgColor: '#e0ff8f',
  },
];

export function CoreFeatures() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #ffffff 0%, #f0f7ed 50%, #ffffff 100%)', // Updated: Pale green gradient
      }}
    >
      {/* Animated Grid Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(61, 122, 104, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(61, 122, 104, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(61, 122, 104, 0.08) 0%, transparent 70%)', // Updated: Sage Green
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(211, 255, 98, 0.08) 0%, transparent 70%)', // Updated: Lime accent
          borderRadius: '50%',
          filter: 'blur(70px)',
        }}
      />

      {/* Floating Shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '15%',
          width: 150,
          height: 150,
          background: 'linear-gradient(135deg, rgba(61, 122, 104, 0.08) 0%, rgba(211, 255, 98, 0.08) 100%)', // Updated: Green gradient
          borderRadius: '40% 60% 60% 40% / 60% 40% 60% 40%',
          animation: 'float2 15s ease-in-out infinite',
          '@keyframes float2': {
            '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
            '33%': { transform: 'translate(-20px, 30px) rotate(120deg) scale(1.1)' },
            '66%': { transform: 'translate(30px, -20px) rotate(240deg) scale(0.9)' },
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, lg: 4 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' }, // Updated: Consistent heading size
              fontWeight: 900, // Updated: Extra bold
              mb: 2,
              background: 'linear-gradient(135deg, #1A3D32 0%, #3D7A68 50%, #D3FF62 100%)', // Updated: Green gradient
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
            }}
          >
            Core Features
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: 700,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.125rem' },
            }}
          >
            Powerful tools designed for modern trade operations
          </Typography>
        </Box>

        {/* Features Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: { xs: 3, lg: 4 },
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Paper
                key={index}
                elevation={1}
                sx={{
                  position: 'relative',
                  p: 4,
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'grey.100',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 20px 25px -5px rgba(26, 61, 50, 0.1), 0 8px 10px -6px rgba(26, 61, 50, 0.1)', // Updated: Green shadow
                    borderColor: '#d4e8cd', // Updated: Light green border
                    transform: 'translateY(-8px)',
                    '& .feature-icon': {
                      transform: 'scale(1.1)',
                    },
                    '& .feature-bg': {
                      opacity: 1,
                    },
                  },
                }}
              >
                {/* Subtle background gradient on hover */}
                <Box
                  className="feature-bg"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #f0f7ed 0%, #d4e8cd 100%)', // Updated: Pale green gradient
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                />

                {/* Content wrapper */}
                <Box sx={{ position: 'relative', zIndex: 10 }}>
                  {/* Icon */}
                  <Box
                    className="feature-icon"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      background: feature.gradient,
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                      mb: 3,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1.5,
                      color: 'grey.900',
                      fontWeight: 600,
                    }}
                  >
                    {feature.title}
                  </Typography>

                  {/* Benefit */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.benefit}
                  </Typography>
                </Box>

                {/* Decorative corner element */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    width: 48,
                    height: 48,
                    bgcolor: feature.bgColor,
                    borderRadius: '50%',
                    opacity: 0.2,
                  }}
                />
              </Paper>
            );
          })}
        </Box>

        {/* Bottom note */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            All features are fully integrated and work seamlessly together
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}