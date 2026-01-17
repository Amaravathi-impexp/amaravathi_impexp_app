import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Navigation } from '../../components/layout/Navigation';
import { Footer } from '../../components/layout/Footer';
import { Briefcase, MapPin, Clock } from 'lucide-react';

interface CareersProps {
  onClose: () => void;
  onSignInClick: () => void;
  onHomeClick: () => void;
  onAboutClick: () => void;
  onCareersClick: () => void;
  onContactClick: () => void;
  currentView: string;
}

const positions = [
  {
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote / Hyderabad',
    type: 'Full-time',
    description: 'Build and scale our platform using React, Node.js, and modern cloud technologies.',
  },
  {
    title: 'Business Development Manager',
    department: 'Sales',
    location: 'Hyderabad / Bangalore',
    type: 'Full-time',
    description: 'Drive growth by onboarding new partners and expanding our community across India and globally.',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Create beautiful, intuitive experiences for our import-export platform.',
  },
  {
    title: 'Customer Success Specialist',
    department: 'Support',
    location: 'Hyderabad',
    type: 'Full-time',
    description: 'Help our community members succeed in their international trade journey.',
  },
];

export function Careers({
  onClose,
  onSignInClick,
  onHomeClick,
  onAboutClick,
  onCareersClick,
  onContactClick,
  currentView,
}: CareersProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Navigation
        onSignInClick={onSignInClick}
        onHomeClick={onHomeClick}
        onAboutClick={onAboutClick}
        onCareersClick={onCareersClick}
        onContactClick={onContactClick}
        currentView={currentView}
      />

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#1A3D32',
          color: 'white',
          py: { xs: 8, md: 12 },
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 3,
            }}
          >
            Careers at TIMPEX
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              color: '#D3FF62',
              maxWidth: '800px',
            }}
          >
            Join us in revolutionizing international trade for the Telugu community
          </Typography>
        </Container>
      </Box>

      {/* Why Join Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              color: '#1A3D32',
              mb: 3,
            }}
          >
            Why Join TIMPEX?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.125rem',
              color: '#3D7A68',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.8,
            }}
          >
            We're building something meaningful - a platform that empowers entrepreneurs and connects communities. Be part of a mission-driven team that's making a real impact.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 10 }}>
          {[
            {
              title: 'Impactful Work',
              description: 'Build products that directly help entrepreneurs succeed in global trade.',
            },
            {
              title: 'Growth & Learning',
              description: 'Continuous learning opportunities with cutting-edge technologies.',
            },
            {
              title: 'Flexible Culture',
              description: 'Remote-friendly environment with flexible working hours.',
            },
            {
              title: 'Competitive Benefits',
              description: 'Attractive compensation, health benefits, and equity options.',
            },
          ].map((benefit, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  bgcolor: '#F8FAF6',
                  border: '1px solid #E5E7EB',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#1A3D32',
                    mb: 2,
                  }}
                >
                  {benefit.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#3D7A68',
                    lineHeight: 1.6,
                  }}
                >
                  {benefit.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Open Positions */}
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            color: '#1A3D32',
            mb: 6,
            textAlign: 'center',
          }}
        >
          Open Positions
        </Typography>

        <Grid container spacing={3}>
          {positions.map((position, index) => (
            <Grid size={{ xs: 12 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  border: '1px solid #E5E7EB',
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderColor: '#D3FF62',
                    boxShadow: '0 4px 12px rgba(26, 61, 50, 0.1)',
                  },
                }}
              >
                <Grid container spacing={3} alignItems="center">
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: '#1A3D32',
                        mb: 2,
                      }}
                    >
                      {position.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, mb: 2, flexWrap: 'wrap' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Briefcase size={16} color="#3D7A68" />
                        <Typography variant="body2" sx={{ color: '#3D7A68' }}>
                          {position.department}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <MapPin size={16} color="#3D7A68" />
                        <Typography variant="body2" sx={{ color: '#3D7A68' }}>
                          {position.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Clock size={16} color="#3D7A68" />
                        <Typography variant="body2" sx={{ color: '#3D7A68' }}>
                          {position.type}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#3D7A68',
                        lineHeight: 1.6,
                      }}
                    >
                      {position.description}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { md: 'right' } }}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: '#1A3D32',
                        color: '#D3FF62',
                        px: 4,
                        py: 1.5,
                        '&:hover': {
                          bgcolor: '#2A5042',
                        },
                      }}
                    >
                      Apply Now
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}