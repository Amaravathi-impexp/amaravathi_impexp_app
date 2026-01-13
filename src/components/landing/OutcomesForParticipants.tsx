import { Box, Container, Typography } from '@mui/material';
import { CheckCircle } from 'lucide-react';

export function OutcomesForParticipants() {
  const outcomes = [
    {
      text: 'A new, practical business income stream',
      gradient: 'linear-gradient(135deg, #E8F5E9 0%, #A5D6A7 100%)',
    },
    {
      text: 'Confidence to execute international trades',
      gradient: 'linear-gradient(135deg, #C8E6C9 0%, #81C784 100%)',
    },
    {
      text: 'Long-term entrepreneurial capability',
      gradient: 'linear-gradient(135deg, #A5D6A7 0%, #66BB6A 100%)',
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#F5F7FA',
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
            mb: 8,
          }}
        >
          Outcomes for Participants
        </Typography>

        {/* Outcomes Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {outcomes.map((outcome, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
                p: 4,
                bgcolor: 'white',
                borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
              }}
            >
              {/* Check Icon Circle */}
              <Box
                sx={{
                  flexShrink: 0,
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: outcome.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle
                  size={28}
                  strokeWidth={2.5}
                  color="#2E7D32"
                />
              </Box>

              {/* Text */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.5,
                  color: '#1A1A1A',
                  fontWeight: 400,
                }}
              >
                {outcome.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}