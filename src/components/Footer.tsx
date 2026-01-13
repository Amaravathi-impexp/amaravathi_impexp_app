import { Box, Container, Button, Typography } from '@mui/material';
import { Logo } from './Logo';

/**
 * Footer Component - Version 2.0 GREEN THEME
 * Updated: Dark Forest Green Background
 */
export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1A3D32 !important', // Dark Forest Green - Force override
        color: '#f0f7ed', // Light green-tinted text
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            fontSize: '0.875rem',
          }}
        >
          <Box
            sx={{
              bgcolor: 'white',
              px: 4,
              py: 2,
              borderRadius: 1,
              height: 100,
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <Logo className="h-[200px]" />
          </Box>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <Button
              sx={{
                color: '#f0f7ed', // Light green-tinted
                '&:hover': {
                  color: '#D3FF62', // Lime hover
                  bgcolor: 'transparent',
                },
              }}
            >
              Privacy Policy
            </Button>
            <Button
              sx={{
                color: '#f0f7ed', // Light green-tinted
                '&:hover': {
                  color: '#D3FF62', // Lime hover
                  bgcolor: 'transparent',
                },
              }}
            >
              Terms of Service
            </Button>
            <Button
              sx={{
                color: '#f0f7ed', // Light green-tinted
                '&:hover': {
                  color: '#D3FF62', // Lime hover
                  bgcolor: 'transparent',
                },
              }}
            >
              Cookie Settings
            </Button>
          </Box>

          <Typography variant="body2" sx={{ color: '#f0f7ed' }}>
            © 2025 TIMPEX.club. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}