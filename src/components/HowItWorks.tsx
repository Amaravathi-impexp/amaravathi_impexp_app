import { Box, Container, Typography } from '@mui/material';

const steps = [
  {
    number: 1,
    title: 'Create Account',
    description: 'Register on the TIMPEX.club platform and complete your basic profile.',
    gradient: 'linear-gradient(135deg, #F9FBE7 0%, #D4E157 100%)',
  },
  {
    number: 2,
    title: 'Attend Training & Simulations',
    description: 'Participate in live, instructor-led workshops covering the complete trade lifecycle.',
    gradient: 'linear-gradient(135deg, #F0F4C3 0%, #C0CA33 100%)',
  },
  {
    number: 3,
    title: 'Discover Trade Opportunities',
    description: 'Access real import-export opportunities curated by the TIMPEX.club team.',
    gradient: 'linear-gradient(135deg, #E6EE9C 0%, #AFB42B 100%)',
  },
  {
    number: 4,
    title: 'Execute Trades with Support',
    description: 'Receive hands-on support for documentation, logistics, coordination, and execution.',
    gradient: 'linear-gradient(135deg, #DCE775 0%, #9E9D24 100%)',
  },
  {
    number: 5,
    title: 'Scale Independently',
    description: 'Build a sustainable and scalable global trading business.',
    gradient: 'linear-gradient(135deg, #D4E157 0%, #827717 100%)',
  },
];

export function HowItWorks() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'white',
      }}
    >
      <Container maxWidth="md">
        {/* Section Header */}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700,
            textAlign: 'center',
            color: '#1A1A1A',
            mb: 8,
          }}
        >
          How TIMPEX.club Works
        </Typography>

        {/* Steps */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {steps.map((step) => (
            <Box
              key={step.number}
              sx={{
                display: 'flex',
                gap: 3,
                alignItems: 'flex-start',
              }}
            >
              {/* Number Circle */}
              <Box
                sx={{
                  flexShrink: 0,
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: step.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#33691E',
                }}
              >
                {step.number}
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1, pt: 0.5 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#1A1A1A',
                    mb: 1,
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    color: '#5A6C7D',
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}