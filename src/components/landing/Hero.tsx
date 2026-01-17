import { Box, Container, Typography, Button } from '@mui/material';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onGetStarted?: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '650px', md: '750px', lg: '800px' },
        mt: '40px', // Account for fixed TopRibbon
        overflow: 'hidden',
        bgcolor: '#F7FBF9',
      }}
    >
      {/* Geometric Square Pattern Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(90deg, rgba(26, 61, 50, 0.03) 1px, transparent 1px),
            linear-gradient(rgba(26, 61, 50, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          zIndex: 0,
        }}
      />
      
      {/* Accent Squares Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.4,
          zIndex: 0,
        }}
      >
        {/* Large Decorative Squares */}
        <Box sx={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: '150px',
          height: '150px',
          border: '3px solid #1A3D32',
          borderRadius: '12px',
          transform: 'rotate(15deg)',
          opacity: 0.15,
        }} />
        <Box sx={{
          position: 'absolute',
          top: '15%',
          right: '12%',
          width: '100px',
          height: '100px',
          bgcolor: '#D3FF62',
          borderRadius: '8px',
          transform: 'rotate(-10deg)',
          opacity: 0.2,
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '120px',
          height: '120px',
          border: '3px solid #3D7A68',
          borderRadius: '10px',
          transform: 'rotate(25deg)',
          opacity: 0.15,
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '25%',
          left: '8%',
          width: '80px',
          height: '80px',
          bgcolor: '#1A3D32',
          borderRadius: '6px',
          transform: 'rotate(-15deg)',
          opacity: 0.1,
        }} />
        <Box sx={{
          position: 'absolute',
          top: '60%',
          right: '25%',
          width: '90px',
          height: '90px',
          border: '2px solid #D3FF62',
          borderRadius: '8px',
          transform: 'rotate(35deg)',
          opacity: 0.2,
        }} />
        <Box sx={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: '70px',
          height: '70px',
          bgcolor: '#3D7A68',
          borderRadius: '6px',
          transform: 'rotate(-20deg)',
          opacity: 0.12,
        }} />
      </Box>

      {/* Subtle Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at top, rgba(211, 255, 98, 0.08) 0%, transparent 50%, rgba(26, 61, 50, 0.05) 100%)',
          zIndex: 0,
        }}
      />

      {/* Content Overlay */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        {/* Badge/Tag */}
        <Box
          sx={{
            bgcolor: 'rgba(26, 61, 50, 0.08)',
            border: '2px solid #1A3D32',
            borderRadius: '50px',
            px: 3,
            py: 1,
            mb: 4,
          }}
        >
          <Typography
            sx={{
              color: '#1A3D32',
              fontWeight: 700,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            APNRT Initiative • Global Trade Platform
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          variant="h1"
          sx={{
            color: '#1A3D32',
            fontWeight: 700,
            fontSize: { xs: '2.1875rem', sm: '3.1875rem', md: '4.1875rem', lg: '5.1875rem' },
            lineHeight: 1.1,
            mb: 2,
          }}
        >
          Telugu Import Export Club
        </Typography>

        {/* Subtitle with Highlight */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.5,
            mb: 3,
          }}
        >
          <Box
            sx={{
              height: '3px',
              width: '40px',
              bgcolor: '#1A3D32',
              borderRadius: '2px',
            }}
          />
          <Typography
            variant="h5"
            sx={{
              color: '#1A3D32',
              fontWeight: 700,
              fontSize: { xs: '1.125rem', sm: '1.375rem', md: '1.625rem' },
              lineHeight: 1.3,
              letterSpacing: '0.5px',
            }}
          >
            Learn Trading → Start Safely → Scale Confidently
          </Typography>
          <Box
            sx={{
              height: '3px',
              width: '40px',
              bgcolor: '#1A3D32',
              borderRadius: '2px',
            }}
          />
        </Box>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: '#3D7A68',
            fontWeight: 500,
            fontSize: { xs: '1.0625rem', sm: '1.1875rem', md: '1.3125rem' },
            lineHeight: 1.7,
            mb: 5,
            maxWidth: '850px',
          }}
        >
          An APNRT guided platform designed to help Telugu NRTs become global trade entrepreneurs through structured training, simulations, and guided trade execution.
        </Typography>

        {/* CTA Buttons */}
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={onGetStarted}
            endIcon={<ArrowRight size={24} />}
            sx={{
              bgcolor: '#D3FF62',
              color: '#1A3D32',
              fontSize: '1.125rem',
              fontWeight: 700,
              px: 6,
              py: 2.5,
              borderRadius: '50px',
              textTransform: 'none',
              boxShadow: '0 10px 30px rgba(211, 255, 98, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#C5F050',
                transform: 'translateY(-4px)',
                boxShadow: '0 15px 40px rgba(211, 255, 98, 0.4)',
              },
            }}
          >
            Enroll Now
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={onGetStarted}
            sx={{
              borderColor: '#1A3D32',
              color: '#1A3D32',
              fontSize: '1.125rem',
              fontWeight: 700,
              px: 6,
              py: 2.5,
              borderRadius: '50px',
              textTransform: 'none',
              borderWidth: 2,
              bgcolor: 'transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#1A3D32',
                bgcolor: '#1A3D32',
                color: 'white',
                borderWidth: 2,
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 32px rgba(26, 61, 50, 0.25)',
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
}