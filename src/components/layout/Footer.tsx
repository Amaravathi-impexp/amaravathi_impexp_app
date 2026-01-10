import { Box, Container, Button, Typography } from '@mui/material';
import { Logo } from '../common/Logo';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'grey.300',
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
              px: 2,
              py: 1,
              borderRadius: 1,
            }}
          >
            <Logo className="h-[78px]" />
          </Box>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <Button
              sx={{
                color: 'grey.300',
                '&:hover': {
                  color: 'white',
                  bgcolor: 'transparent',
                },
              }}
            >
              Privacy Policy
            </Button>
            <Button
              sx={{
                color: 'grey.300',
                '&:hover': {
                  color: 'white',
                  bgcolor: 'transparent',
                },
              }}
            >
              Terms of Service
            </Button>
            <Button
              sx={{
                color: 'grey.300',
                '&:hover': {
                  color: 'white',
                  bgcolor: 'transparent',
                },
              }}
            >
              Cookie Settings
            </Button>
          </Box>

          <Typography variant="body2" sx={{ color: 'grey.300' }}>
            © 2025 Amaravathi. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
