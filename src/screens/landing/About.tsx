import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { Navigation } from '../../components/layout/Navigation';
import { Footer } from '../../components/layout/Footer';
import { Globe, Target, Award, Users } from 'lucide-react';

interface AboutProps {
  onClose: () => void;
  onSignInClick: () => void;
  onHomeClick: () => void;
  onAboutClick: () => void;
  onCareersClick: () => void;
  onContactClick: () => void;
  currentView: string;
}

const values = [
  {
    icon: Globe,
    title: 'Global Connectivity',
    description: 'Connecting Telugu entrepreneurs worldwide to facilitate seamless international trade.',
  },
  {
    icon: Target,
    title: 'Mission Driven',
    description: 'Empowering NRTs and Telugu business community with tools and network for global success.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to delivering world-class service and support to our community members.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Building a strong, supportive community that grows and succeeds together.',
  },
];

export function About({
  onClose,
  onSignInClick,
  onHomeClick,
  onAboutClick,
  onCareersClick,
  onContactClick,
  currentView,
}: AboutProps) {
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
            About TIMPEX.club
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              color: '#D3FF62',
              maxWidth: '800px',
            }}
          >
            Telugu Import Export Club - Empowering global trade for the Telugu business community
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                color: '#1A3D32',
                mb: 3,
              }}
            >
              Our Mission
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                color: '#3D7A68',
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              TIMPEX.club was founded to bridge the gap between Telugu entrepreneurs worldwide and the vast opportunities in international trade. We provide a comprehensive platform that combines technology, community, and expertise to make import-export accessible to everyone.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                color: '#3D7A68',
                lineHeight: 1.8,
              }}
            >
              Whether you're a seasoned exporter or just starting your journey in international trade, TIMPEX offers the tools, connections, and support you need to succeed in the global marketplace.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                bgcolor: '#F8FAF6',
                p: 4,
                borderRadius: 2,
                border: '2px solid #D3FF62',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  color: '#1A3D32',
                  mb: 3,
                }}
              >
                Why We Exist
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#3D7A68',
                  lineHeight: 1.8,
                }}
              >
                We saw talented Telugu entrepreneurs struggling to navigate the complex world of international trade. Language barriers, lack of connections, and complicated processes held them back. TIMPEX was created to remove these barriers and unlock the full potential of our community.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ bgcolor: '#F8FAF6', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
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
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      textAlign: 'center',
                      bgcolor: 'white',
                      border: '1px solid #E5E7EB',
                      transition: 'all 0.3s',
                      '&:hover': {
                        borderColor: '#D3FF62',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(26, 61, 50, 0.1)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: '#1A3D32',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                      }}
                    >
                      <Icon size={30} color="#D3FF62" />
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
                      {value.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#3D7A68',
                        lineHeight: 1.6,
                      }}
                    >
                      {value.description}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}