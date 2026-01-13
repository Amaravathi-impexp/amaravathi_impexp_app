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
      }}
    >
      {/* Background Image with Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1767487018578-15bde4bf231f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHNoaXAlMjBvY2VhbiUyMGdsb2JhbCUyMHRyYWRlfGVufDF8fHx8MTc2ODMxMDUyM3ww&ixlib=rb-4.1.0&q=80&w=1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(26, 61, 50, 0.92) 0%, rgba(61, 122, 104, 0.88) 50%, rgba(26, 61, 50, 0.92) 100%)',
            zIndex: 1,
          },
        }}
      />

      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(211, 255, 98, 0.1) 0%, transparent 70%)',
          zIndex: 1,
          display: { xs: 'none', md: 'block' },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(211, 255, 98, 0.08) 0%, transparent 70%)',
          zIndex: 1,
          display: { xs: 'none', md: 'block' },
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
            bgcolor: 'rgba(211, 255, 98, 0.15)',
            border: '2px solid #D3FF62',
            borderRadius: '50px',
            px: 3,
            py: 1,
            mb: 4,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            sx={{
              color: '#D3FF62',
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
            color: 'white',
            fontWeight: 900,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5.5rem' },
            lineHeight: 1.1,
            mb: 2,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            background: 'linear-gradient(to right, white, #D3FF62)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
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
              bgcolor: '#D3FF62',
              borderRadius: '2px',
            }}
          />
          <Typography
            variant="h5"
            sx={{
              color: '#D3FF62',
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
              bgcolor: '#D3FF62',
              borderRadius: '2px',
            }}
          />
        </Box>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.95)',
            fontWeight: 400,
            fontSize: { xs: '1.0625rem', sm: '1.1875rem', md: '1.3125rem' },
            lineHeight: 1.7,
            mb: 5,
            maxWidth: '850px',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
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
              borderColor: 'rgba(255, 255, 255, 0.6)',
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: 700,
              px: 6,
              py: 2.5,
              borderRadius: '50px',
              textTransform: 'none',
              borderWidth: 2,
              backdropFilter: 'blur(10px)',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 2,
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 32px rgba(255, 255, 255, 0.15)',
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