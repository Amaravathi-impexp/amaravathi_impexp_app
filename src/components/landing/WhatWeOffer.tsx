import { Box, Container, Typography, Card } from '@mui/material';
import { GraduationCap, Users, TrendingUp, Shield, HandHelping } from 'lucide-react';

export function WhatWeOffer() {
  const offerings = [
    {
      icon: GraduationCap,
      title: 'Structured Training Programs',
      description: 'Real-world trade simulations with live, instructor-led workshops',
      gradient: 'linear-gradient(135deg, #E8F5E9 0%, #A5D6A7 100%)',
    },
    {
      icon: Users,
      title: 'Verified Network',
      description: 'Access to verified buyers and suppliers across global markets',
      gradient: 'linear-gradient(135deg, #C8E6C9 0%, #81C784 100%)',
    },
    {
      icon: TrendingUp,
      title: 'Live Trade Opportunities',
      description: 'Curated import-export opportunities with indicative margins',
      gradient: 'linear-gradient(135deg, #A5D6A7 0%, #66BB6A 100%)',
    },
    {
      icon: Shield,
      title: 'End-to-End Support',
      description: 'Logistics, documentation, and execution support for every trade',
      gradient: 'linear-gradient(135deg, #81C784 0%, #4CAF50 100%)',
    },
    {
      icon: HandHelping,
      title: 'Handholding Support',
      description: 'Guided assistance for your first 10 trades to build confidence',
      gradient: 'linear-gradient(135deg, #66BB6A 0%, #43A047 100%)',
    },
  ];

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
            mb: 8,
          }}
        >
          What TIMPEX.club Offers
        </Typography>

        {/* Offerings Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
            maxWidth: '1100px',
            mx: 'auto',
          }}
        >
          {offerings.map((offering, index) => {
            const IconComponent = offering.icon;
            return (
              <Card
                key={index}
                sx={{
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  bgcolor: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  gridColumn: {
                    xs: 'span 1',
                    sm: index >= 3 ? 'span 1' : 'span 1',
                    md: index >= 3 ? 'span 1' : 'span 1',
                  },
                  '&:hover': {
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                {/* Icon Circle */}
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: offering.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <IconComponent
                    size={28}
                    strokeWidth={2}
                    color="#2E7D32"
                  />
                </Box>

                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#1A1A1A',
                    mb: 1.5,
                  }}
                >
                  {offering.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: '#5A6C7D',
                  }}
                >
                  {offering.description}
                </Typography>
              </Card>
            );
          })}
        </Box>

        {/* Bottom spacing for last row centering on desktop */}
        <style>
          {`
            @media (min-width: 900px) {
              .MuiBox-root > .MuiCard-root:nth-of-type(4) {
                grid-column: 1 / 2;
                margin-left: auto;
                margin-right: 1rem;
              }
              .MuiBox-root > .MuiCard-root:nth-of-type(5) {
                grid-column: 2 / 3;
                margin-left: 1rem;
                margin-right: auto;
              }
            }
          `}
        </style>
      </Container>
    </Box>
  );
}