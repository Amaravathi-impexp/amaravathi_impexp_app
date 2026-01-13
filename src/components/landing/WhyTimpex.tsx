import { Box, Container, Typography, Card } from '@mui/material';

export function WhyTimpex() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#FAFAF9',
      }}
    >
      <Container maxWidth="lg">
        {/* Main Heading */}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700,
            textAlign: 'center',
            color: '#1A1A1A',
            mb: 6,
          }}
        >
          Why TIMPEX.club?
        </Typography>

        {/* First Paragraph */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.8,
            textAlign: 'center',
            color: '#5A6C7D',
            mb: 4,
            maxWidth: '900px',
            mx: 'auto',
          }}
        >
          Andhra Pradesh has strong natural advantages for global trade—long coastlines, a strong production base,
          and a large overseas community.
        </Typography>

        {/* Second Paragraph */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.8,
            textAlign: 'center',
            color: '#5A6C7D',
            mb: 6,
            maxWidth: '900px',
            mx: 'auto',
          }}
        >
          Yet while Gujarati and Malayali communities built global trade networks over generations, the Telugu
          diaspora largely focused on IT-led employment.
        </Typography>

        {/* Highlight Box */}
        <Box
          sx={{
            bgcolor: '#E8F3E6',
            borderRadius: '16px',
            p: { xs: 4, md: 6 },
            maxWidth: '900px',
            mx: 'auto',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.8,
              textAlign: 'center',
              color: '#2D3748',
              fontWeight: 400,
            }}
          >
            TIMPEX.club is an initiative to help Telugu NRTs transition from employment to trade-led
            entrepreneurship through structured training and guided execution—building sustainable global
            trade networks rooted in Andhra Pradesh.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}