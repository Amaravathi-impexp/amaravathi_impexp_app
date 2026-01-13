import { Box, Container, Button, Typography } from '@mui/material';
import { Mail, Phone, Globe } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { setCurrentView } from '../../store/slices/uiSlice';
import logoImage from 'figma:asset/98b22d8ba3cccddd432e81bdbe1d183f77d139b9.png';

interface FooterProps {
  hideAuthButtons?: boolean;
}

export function Footer({ hideAuthButtons = false }: FooterProps) {
  const dispatch = useAppDispatch();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1A3D32',
        color: '#E8F5E9',
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '2fr 1fr 1fr',
            },
            gap: { xs: 6, md: 8 },
            mb: 6,
          }}
        >
          {/* Left Section - Brand */}
          <Box>
            <Box
              sx={{
                height: 80,
                overflow: 'hidden',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src={logoImage}
                alt="TIMPEX.club"
                sx={{
                  height: 175,
                  width: 'auto',
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: '#B8D4C8',
                mb: 4,
                maxWidth: 400,
              }}
            >
              An APNRT guided platform designed to help Telugu NRIs become global trade entrepreneurs through structured training, simulations, and guided trade execution.
            </Typography>

            {/* Buttons - Only show on landing pages */}
            {!hideAuthButtons && (
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  onClick={() => dispatch(setCurrentView('signup'))}
                  sx={{
                    bgcolor: '#D3FF62',
                    color: '#1A3D32',
                    px: 3,
                    py: 1,
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    borderRadius: '8px',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#C4F050',
                    },
                  }}
                >
                  Enroll Now
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => dispatch(setCurrentView('signin'))}
                  sx={{
                    borderColor: '#B8D4C8',
                    color: '#B8D4C8',
                    px: 3,
                    py: 1,
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    borderRadius: '8px',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#D3FF62',
                      color: '#D3FF62',
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  Login
                </Button>
              </Box>
            )}
          </Box>

          {/* Middle Section - Quick Links */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'white',
                mb: 3,
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                onClick={() => dispatch(setCurrentView('home'))}
                sx={{
                  color: '#B8D4C8',
                  justifyContent: 'flex-start',
                  px: 0,
                  py: 0.5,
                  fontSize: '0.9375rem',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#D3FF62',
                    bgcolor: 'transparent',
                  },
                }}
              >
                Home
              </Button>
              <Button
                onClick={() => dispatch(setCurrentView('signup'))}
                sx={{
                  color: '#B8D4C8',
                  justifyContent: 'flex-start',
                  px: 0,
                  py: 0.5,
                  fontSize: '0.9375rem',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#D3FF62',
                    bgcolor: 'transparent',
                  },
                }}
              >
                Enroll Now
              </Button>
              <Button
                onClick={() => dispatch(setCurrentView('signin'))}
                sx={{
                  color: '#B8D4C8',
                  justifyContent: 'flex-start',
                  px: 0,
                  py: 0.5,
                  fontSize: '0.9375rem',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#D3FF62',
                    bgcolor: 'transparent',
                  },
                }}
              >
                Login
              </Button>
            </Box>
          </Box>

          {/* Right Section - Contact */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'white',
                mb: 3,
              }}
            >
              Contact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {/* Email */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: '#D3FF62',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Mail size={16} strokeWidth={2.5} color="#1A3D32" />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.9375rem',
                    color: '#B8D4C8',
                  }}
                >
                  support@timpex.club
                </Typography>
              </Box>

              {/* Phone */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: '#D3FF62',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={16} strokeWidth={2.5} color="#1A3D32" />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.9375rem',
                    color: '#B8D4C8',
                  }}
                >
                  +91 XXX XXX XXXX
                </Typography>
              </Box>

              {/* Website */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: '#D3FF62',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Globe size={16} strokeWidth={2.5} color="#1A3D32" />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.9375rem',
                    color: '#B8D4C8',
                  }}
                >
                  www.timpex.club
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Bottom Section - Copyright */}
        <Box
          sx={{
            pt: 4,
            borderTop: '1px solid rgba(184, 212, 200, 0.2)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.875rem',
              color: '#7FA896',
            }}
          >
            © 2025 TIMPEX.club — Telugu Import Export Club. An APNRT initiative.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.875rem',
              color: '#7FA896',
            }}
          >
            Empowering Telugu NRIs globally
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}