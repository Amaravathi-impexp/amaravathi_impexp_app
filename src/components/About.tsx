import { Box, Container, Typography, Paper } from '@mui/material';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { Globe, Lock, TrendingUp, Brain } from 'lucide-react';

interface AboutProps {
  onClose: () => void;
  onHomeClick?: () => void;
  onAboutClick?: () => void;
  onCareersClick?: () => void;
  onContactClick?: () => void;
  onSignInClick?: () => void;
  currentView?: string;
}

export function About({ onClose, onHomeClick, onAboutClick, onCareersClick, onContactClick, onSignInClick, currentView }: AboutProps) {
  const missions = [
    {
      icon: Globe,
      title: 'Simplify Global Trade',
      description: 'Make imports and exports easy by removing complexity, fragmentation, and manual effort.',
    },
    {
      icon: Brain,
      title: 'Intelligence You Can Trust',
      description: 'Use AI responsibly to reduce risk, improve accuracy, and support confident trade decisions.',
    },
    {
      icon: Lock,
      title: 'Trust & Compliance First',
      description: 'Build a secure, transparent, and compliance-driven platform businesses can rely on.',
    },
    {
      icon: TrendingUp,
      title: 'Enable Business Growth',
      description: 'Empower importers and exporters to scale globally with clarity, insights, and control.',
    },
  ];

  const regions = [
    { title: 'Asia Pacific', cities: 'Singapore, Mumbai, Shanghai' },
    { title: 'Europe', cities: 'Rotterdam, Hamburg, Antwerp' },
    { title: 'Americas', cities: 'Los Angeles, New York, Santos' },
    { title: 'Middle East', cities: 'Dubai, Jebel Ali, Doha' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white', display: 'flex', flexDirection: 'column' }}>
      <Navigation
        onSignInClick={onSignInClick}
        onHomeClick={onHomeClick}
        onAboutClick={onAboutClick}
        onCareersClick={onCareersClick}
        onContactClick={onContactClick}
        currentView={currentView}
      />

      <Box component="main" sx={{ flex: 1 }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
            color: 'white',
            py: 10,
          }}
        >
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                mb: 3,
              }}
            >
              About Us
            </Typography>
            <Typography
              variant="h5"
              sx={{
                maxWidth: 768,
                fontSize: { xs: '1.125rem', sm: '1.25rem' },
              }}
            >
              Simplifying Global Trade. Powered by Intelligence.
            </Typography>
          </Container>
        </Box>

        {/* Company Overview */}
        <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
            <Box sx={{ maxWidth: 896, mx: 'auto' }}>
              <Typography
                variant="h3"
                sx={{
                  mb: 3,
                  fontSize: { xs: '1.875rem', sm: '2.25rem' },
                }}
              >
                Our Story
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 2,
                  lineHeight: 1.7,
                }}
              >
                Amaravathi Imports & Exports is a modern digital platform built to simplify the way businesses trade across borders. We bring together importers, exporters, compliance, documentation, analytics, and payments into a single, intelligent system—so businesses can focus on growth instead of complexity.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.7,
                }}
              >
                Global trade today is fragmented. Businesses are forced to coordinate between freight forwarders, customs agents, document handlers, compliance teams, and payment systems. We created Amaravathi to remove this friction and offer a single point of entry for end-to-end trade operations.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* Mission & Values */}
        <Box sx={{ py: 8 }}>
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                mb: 6,
                fontSize: { xs: '1.875rem', sm: '2.25rem' },
              }}
            >
              Our Mission & Values
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
                gap: 4,
              }}
            >
              {missions.map((mission, index) => {
                const Icon = mission.icon;
                return (
                  <Box key={index} sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 64,
                        height: 64,
                        bgcolor: 'primary.lighter',
                        borderRadius: '50%',
                        mb: 2,
                      }}
                    >
                      <Icon className="w-8 h-8 text-blue-600" />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1.5,
                        fontSize: { xs: '1.125rem', sm: '1.25rem' },
                      }}
                    >
                      {mission.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                      }}
                    >
                      {mission.description}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Container>
        </Box>

        {/* Global Presence */}
        <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                mb: 6,
                fontSize: { xs: '1.875rem', sm: '2.25rem' },
              }}
            >
              Global Presence
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
                gap: 3,
              }}
            >
              {regions.map((region, index) => (
                <Paper
                  key={index}
                  elevation={2}
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    bgcolor: 'white',
                  }}
                >
                  <Globe className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontSize: { xs: '1.125rem', sm: '1.25rem' },
                    }}
                  >
                    {region.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                    }}
                  >
                    {region.cities}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Container>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
