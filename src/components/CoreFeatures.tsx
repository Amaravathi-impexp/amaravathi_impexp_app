import { Package, FileCheck, Shield, Users, CreditCard, BarChart3 } from 'lucide-react';
import { Box, Container, Typography, Paper } from '@mui/material';

const features = [
  {
    icon: Package,
    title: 'Shipments',
    benefit: 'End-to-end tracking from origin to destination',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    bgColor: '#eff6ff',
  },
  {
    icon: FileCheck,
    title: 'Documents',
    benefit: 'Automated documentation and digital signatures',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    bgColor: '#d1fae5',
  },
  {
    icon: Shield,
    title: 'Compliance',
    benefit: 'AI-powered fraud detection and verification',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
    bgColor: '#f3e8ff',
  },
  {
    icon: Users,
    title: 'Partners',
    benefit: 'Global network of verified trade partners',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    bgColor: '#ffedd5',
  },
  {
    icon: CreditCard,
    title: 'Payments',
    benefit: 'Secure payment processing and invoicing',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    bgColor: '#e0e7ff',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    benefit: 'Real-time insights and performance metrics',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    bgColor: '#fce7f3',
  },
];

export function CoreFeatures() {
  return (
    <Box
      component="section"
      sx={{
        py: 10,
        background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 50%, #ffffff 100%)',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Box sx={{ display: 'inline-block', mb: 2 }}>
            <Typography
              variant="overline"
              sx={{
                fontSize: '0.875rem',
                letterSpacing: '0.15em',
                color: 'primary.main',
                display: 'block',
                mb: 1,
              }}
            >
              EVERYTHING YOU NEED
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                background: 'linear-gradient(90deg, #2563eb 0%, #6366f1 50%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              CORE FEATURES
            </Typography>
            <Box
              sx={{
                height: 4,
                width: 96,
                mx: 'auto',
                mt: 2,
                background: 'linear-gradient(90deg, #2563eb 0%, #a855f7 100%)',
                borderRadius: '9999px',
              }}
            />
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              maxWidth: 672,
              mx: 'auto',
              mt: 3,
              fontSize: { xs: '1.125rem', sm: '1.25rem' },
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
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                    borderColor: '#dbeafe',
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
                    background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
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