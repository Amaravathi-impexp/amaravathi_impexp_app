import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const steps = [
  {
    number: '1',
    title: 'Create Account',
    description: 'Register on the TIMPEX.club platform and complete your basic profile.',
  },
  {
    number: '2',
    title: 'Attend Training & Simulations',
    description: 'Participate in live, instructor-led workshops covering the complete trade lifecycle.',
  },
  {
    number: '3',
    title: 'Discover Trade Opportunities',
    description: 'Access real import-export opportunities curated by the TIMPEX.club team.',
  },
  {
    number: '4',
    title: 'Execute Trades with Support',
    description: 'Receive hands-on support for documentation, logistics, coordination, and execution.',
  },
  {
    number: '5',
    title: 'Scale Independently',
    description: 'Build a sustainable and scalable global trading business.',
  },
];

export function HowItWorks() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F8FAF6' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              color: '#1A3D32',
              mb: 2,
            }}
          >
            How TIMPEX.club Works
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {steps.map((step, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                gap: 3,
                alignItems: 'flex-start',
              }}
            >
              {/* Numbered Circle */}
              <Box
                sx={{
                  minWidth: 56,
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  bgcolor: '#D3FF62',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#1A3D32',
                  }}
                >
                  {step.number}
                </Typography>
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1, pt: 0.5 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: '1.125rem', md: '1.25rem' },
                    fontWeight: 600,
                    color: '#1A3D32',
                    mb: 1,
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.9375rem', md: '1rem' },
                    color: '#3D7A68',
                    lineHeight: 1.6,
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
