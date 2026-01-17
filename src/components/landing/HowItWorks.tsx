import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { CheckCircle, Users, TrendingUp, Handshake } from 'lucide-react';

const steps = [
  {
    icon: Users,
    title: 'Join the Community',
    description: 'Sign up and become part of the Telugu Import Export Club, connecting with fellow entrepreneurs.',
  },
  {
    icon: CheckCircle,
    title: 'Verify Your Profile',
    description: 'Complete your business profile and get verified to access exclusive features and partnerships.',
  },
  {
    icon: Handshake,
    title: 'Find Partners',
    description: 'Browse our partner directory, connect with exporters, importers, and service providers.',
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Business',
    description: 'Execute trades, manage shipments, and scale your import-export business with confidence.',
  },
];

export function HowItWorks() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#F8FAF6' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              color: '#1A3D32',
              mb: 2,
            }}
          >
            How It Works
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: '#3D7A68',
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            Get started with TIMPEX in four simple steps
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: '#1A3D32',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <Icon size={40} color="#D3FF62" />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#1A3D32',
                      mb: 2,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#3D7A68',
                      lineHeight: 1.6,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}