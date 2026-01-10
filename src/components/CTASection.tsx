import { Box, Container, Typography, Button } from '@mui/material';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <Box
      component="section"
      sx={{
        py: 10,
        bgcolor: 'grey.900',
        color: 'white',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
        <Box sx={{ maxWidth: 768, mx: 'auto', textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Ready to Ship with Us?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'grey.300',
              mb: 4,
              fontSize: { xs: '1.125rem', sm: '1.25rem' },
            }}
          >
            Get started today and experience seamless global logistics with our expert team.
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
              variant="contained"
              size="large"
              endIcon={<ArrowRight className="w-5 h-5" />}
              sx={{
                px: 4,
                py: 2,
              }}
            >
              Get a Quote
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 2,
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'white',
                  color: 'grey.900',
                },
                transition: 'all 0.2s',
              }}
            >
              Contact Sales
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
