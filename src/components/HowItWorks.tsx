import { Box, Container, Typography, Paper, Button } from '@mui/material';
import { 
  UserPlus, 
  Package, 
  MapPin, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  FileCheck,
  Truck,
  ShieldCheck
} from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: UserPlus,
    accentIcon: Sparkles,
    title: 'Sign Up & Verify',
    subtitle: 'Create Trade Profile',
    description: 'Create your account and set up your comprehensive trade profile in minutes. Get verified and start your import/export journey.',
    color: '#2563eb',
    lightColor: '#3b82f6',
    bgColor: '#eff6ff',
    borderColor: '#93c5fd',
  },
  {
    number: 2,
    icon: Package,
    accentIcon: FileCheck,
    title: 'Shipment Details',
    subtitle: 'Add Cargo Information',
    description: 'Add detailed shipment information and upload all required documentation. Our intelligent system guides you through every step.',
    color: '#7c3aed',
    lightColor: '#8b5cf6',
    bgColor: '#f5f3ff',
    borderColor: '#c4b5fd',
  },
  {
    number: 3,
    icon: MapPin,
    accentIcon: Truck,
    title: 'Route & Logistics',
    subtitle: 'Plan Your Journey',
    description: 'Define origin, destination, and route preferences. Our AI optimizes the best shipping routes and suggests carriers.',
    color: '#059669',
    lightColor: '#10b981',
    bgColor: '#ecfdf5',
    borderColor: '#6ee7b7',
  },
  {
    number: 4,
    icon: Users,
    accentIcon: ShieldCheck,
    title: 'Partner Selection',
    subtitle: 'Choose Verified Partners',
    description: 'Select from our network of verified shipping partners, freight forwarders, and customs brokers with transparent pricing.',
    color: '#dc2626',
    lightColor: '#ef4444',
    bgColor: '#fef2f2',
    borderColor: '#fca5a5',
  },
  {
    number: 5,
    icon: CheckCircle,
    accentIcon: Sparkles,
    title: 'Review & Submit',
    subtitle: 'Complete Your Booking',
    description: 'AI-powered compliance verification, real-time tracking setup, and secure payment processing. Everything automated for you.',
    color: '#ea580c',
    lightColor: '#f97316',
    bgColor: '#fff7ed',
    borderColor: '#fdba74',
  },
];

export function HowItWorks() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#f9fafb',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'radial-gradient(circle at 80% 50%, rgba(124, 58, 237, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
              fontWeight: 800,
              mb: 2,
              background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #059669 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            How It Works
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
            Get started with your trade operations in five simple steps
          </Typography>
        </Box>

        {/* Steps */}
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(5, 1fr)',
              },
              gap: { xs: 4, md: 3 },
            }}
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const AccentIcon = step.accentIcon;

              return (
                <Box key={step.number}>
                  <Paper
                    elevation={2}
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      border: '2px solid transparent',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 25px -5px ${step.color}30`,
                        border: `2px solid ${step.borderColor}`,
                      },
                    }}
                  >
                    {/* Gradient header with icons */}
                    <Box
                      sx={{
                        height: 160,
                        background: `linear-gradient(135deg, ${step.color} 0%, ${step.lightColor} 100%)`,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Decorative background circles */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -30,
                          right: -30,
                          width: 120,
                          height: 120,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: -40,
                          left: -40,
                          width: 140,
                          height: 140,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                        }}
                      />

                      {/* Main Icon Container */}
                      <Box
                        sx={{
                          position: 'relative',
                          width: 90,
                          height: 90,
                          bgcolor: 'rgba(255, 255, 255, 0.25)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.3)',
                          transition: 'transform 0.4s ease',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          '&:hover': {
                            transform: 'rotate(-5deg) scale(1.15)',
                          },
                        }}
                      >
                        <Icon style={{ width: 48, height: 48, color: 'white' }} strokeWidth={2} />
                      </Box>

                      {/* Step number badge - larger and more prominent */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 20,
                          left: 20,
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          bgcolor: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '1.5rem',
                          color: step.color,
                          border: '3px solid white',
                          boxShadow: '0 4px 10px rgb(0 0 0 / 0.15)',
                        }}
                      >
                        {step.number}
                      </Box>

                      {/* Accent icon - top right */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 20,
                          right: 20,
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <AccentIcon style={{ width: 20, height: 20, color: 'white' }} strokeWidth={2.5} />
                      </Box>
                    </Box>

                    {/* Content */}
                    <Box sx={{ p: 3 }}>
                      <Typography
                        variant="overline"
                        sx={{
                          color: step.color,
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          letterSpacing: 1,
                        }}
                      >
                        {step.subtitle}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1.5,
                          color: 'grey.900',
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.7,
                        }}
                      >
                        {step.description}
                      </Typography>

                      {/* Progress indicator at bottom */}
                      <Box
                        sx={{
                          mt: 3,
                          pt: 3,
                          borderTop: `2px solid ${step.borderColor}`,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            flex: 1,
                            height: 8,
                            bgcolor: step.bgColor,
                            borderRadius: '9999px',
                            position: 'relative',
                            overflow: 'hidden',
                            border: `1px solid ${step.borderColor}`,
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              height: '100%',
                              width: `${(index + 1) * 20}%`,
                              bgcolor: step.color,
                              borderRadius: '9999px',
                              transition: 'width 1s ease-in-out',
                            }}
                          />
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color: step.color,
                            fontSize: '0.875rem',
                          }}
                        >
                          {step.number}/5
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>

                  {/* Mobile arrow */}
                  {index < steps.length - 1 && (
                    <Box
                      sx={{
                        display: { xs: 'flex', lg: 'none' },
                        justifyContent: 'center',
                        my: 3,
                      }}
                    >
                      <Paper 
                        elevation={3} 
                        sx={{ 
                          borderRadius: '50%', 
                          p: 2,
                          bgcolor: steps[index + 1].color,
                        }}
                      >
                        <ArrowRight
                          style={{ 
                            width: 24, 
                            height: 24, 
                            color: 'white',
                            transform: 'rotate(90deg)',
                          }}
                          strokeWidth={3}
                        />
                      </Paper>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* CTA */}
        <Box sx={{ textAlign: 'center', mt: { xs: 8, md: 12 } }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowRight />}
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.125rem',
              fontWeight: 700,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1e40af 0%, #6d28d9 100%)',
                boxShadow: '0 15px 30px rgba(37, 99, 235, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Get Started Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
