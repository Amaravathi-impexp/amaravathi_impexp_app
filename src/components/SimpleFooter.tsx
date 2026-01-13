import { Box, Container, Typography } from '@mui/material';
import logoImage from 'figma:asset/98b22d8ba3cccddd432e81bdbe1d183f77d139b9.png';

/**
 * SimpleFooter Component - Version 2.0 GREEN THEME
 * Updated: Dark Forest Green Background - Matches Landing Page Footer
 */
export function SimpleFooter() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1A3D32',
        color: '#E8F5E9',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              height: 80,
              overflow: 'hidden',
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
          <Typography variant="body2" sx={{ color: '#7FA896', fontSize: '0.875rem' }}>
            © 2025 TIMPEX.club - Telugu Import Export Club. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}