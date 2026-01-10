import { Box, Container, Typography, Button, Paper } from '@mui/material';
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
    <Box sx={{ minHeight: '100vh', bgcolor: 'white', display: 'flex', flexDirection: 'column' }}>
      <Navigation
        onSignInClick={onSignInClick}
        onHomeClick={onHomeClick}
        onAboutClick={onAboutClick}
        onCareersClick={onCareersClick}
        onContactClick={onContactClick}
        currentView={currentView}
      />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #fff7ed 100%)',
        }}
      >
        <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3, lg: 4 }, py: 10, textAlign: 'center' }}>
          {/* Animated Construction Icons */}
          <Box sx={{ position: 'relative', mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, mb: 4 }}>
              <Box className="animate-bounce">
                <HardHat className="w-16 h-16 text-orange-500" />
              </Box>
              <Box className="animate-bounce">
                <Construction className="w-20 h-20 text-blue-600" />
              </Box>
              <Box className="animate-bounce">
                <Wrench className="w-16 h-16 text-orange-500" />
              </Box>
            </Box>

            {/* Rotating Gears */}
            <Box
              className="animate-spin-slow"
              sx={{
                position: 'absolute',
                top: 0,
                left: '25%',
                opacity: 0.2,
              }}
            >
              <Cog className="w-12 h-12 text-gray-400" />
            </Box>
            <Box
              className="animate-spin-slow"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: '25%',
                opacity: 0.2,
              }}
            >
              <Cog className="w-16 h-16 text-gray-400" />
            </Box>
          </Box>

          {/* Main Content */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                bgcolor: '#fff7ed',
                color: '#c2410c',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                mx: 'auto',
                mb: 2,
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Coming Soon</span>
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', md: '3.75rem' },
                mb: 3,
                background: 'linear-gradient(90deg, #2563eb 0%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Under Construction
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                maxWidth: 672,
                mx: 'auto',
                mb: 4,
                fontSize: { xs: '1.125rem', sm: '1.25rem' },
              }}
            >
              We're building something amazing! Our Careers page is currently under development.
              We're crafting the perfect space to showcase exciting opportunities at Amaravathi.
            </Typography>

            {/* Construction Progress Bar */}
            <Box sx={{ maxWidth: 448, mx: 'auto', mb: 4 }}>
              <Box
                sx={{
                  bgcolor: 'grey.200',
                  borderRadius: '9999px',
                  height: 16,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    width: '65%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #2563eb 0%, #f97316 100%)',
                    borderRadius: '9999px',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: 'grey.500', mt: 1 }}>
                65% Complete
              </Typography>
            </Box>

            {/* Quick Stats */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 3,
                maxWidth: 672,
                mx: 'auto',
                mt: 6,
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  bgcolor: 'white',
                  border: '2px solid',
                  borderColor: '#dbeafe',
                }}
              >
                <Typography variant="h4" sx={{ color: 'primary.main', mb: 1 }}>
                  50+
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Positions Planned
                </Typography>
              </Paper>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  bgcolor: 'white',
                  border: '2px solid',
                  borderColor: '#ffedd5',
                }}
              >
                <Typography variant="h4" sx={{ color: '#f97316', mb: 1 }}>
                  15+
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Global Locations
                </Typography>
              </Paper>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  bgcolor: 'white',
                  border: '2px solid',
                  borderColor: '#dbeafe',
                }}
              >
                <Typography variant="h4" sx={{ color: 'primary.main', mb: 1 }}>
                  100%
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Worth the Wait
                </Typography>
              </Paper>
            </Box>

            {/* Call to Action */}
            <Paper
              elevation={0}
              sx={{
                mt: 6,
                p: 4,
                bgcolor: '#eff6ff',
                border: '2px solid',
                borderColor: '#bfdbfe',
                borderRadius: 4,
                maxWidth: 672,
                mx: 'auto',
              }}
            >
              <Typography variant="h5" sx={{ mb: 1.5, fontSize: { xs: '1.5rem', sm: '1.875rem' } }}>
                Interested in joining us?
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                In the meantime, feel free to reach out to our HR team directly.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  justifyContent: 'center',
                }}
              >
                <Button
                  onClick={onContactClick}
                  variant="contained"
                  size="large"
                  sx={{
                    px: 3,
                    py: 1.5,
                  }}
                >
                  Contact Us
                </Button>
                <Button
                  component="a"
                  href="mailto:careers@amaravathi.com"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      bgcolor: '#eff6ff',
                    },
                  }}
                >
                  Email: careers@amaravathi.com
                </Button>
              </Box>
            </Paper>
          </Box>

          {/* Decorative Elements */}
          <Box
            sx={{
              mt: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
              color: 'grey.400',
            }}
          >
            <Hammer className="w-5 h-5 animate-pulse" />
            <Typography variant="body2">Building with care...</Typography>
            <Hammer className="w-5 h-5 animate-pulse" />
          </Box>
        </Container>
      </Box>

      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes bounce {
          0%, 100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `
      }} />
    </Box>
  );
}
