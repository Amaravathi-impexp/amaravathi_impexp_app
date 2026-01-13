import { Box, Container, Typography } from '@mui/material';
import { Briefcase, Users, UsersRound, Globe } from 'lucide-react';

export function WhoIsThisFor() {
  const audiences = [
    {
      icon: Briefcase,
      title: 'Working Professionals',
      description: 'Seeking an additional income stream alongside your career',
      gradient: 'linear-gradient(135deg, #F1F8E9 0%, #C5E1A5 100%)',
    },
    {
      icon: Users,
      title: 'Homemakers',
      description: 'Looking for flexible, location-independent opportunities',
      gradient: 'linear-gradient(135deg, #DCEDC8 0%, #AED581 100%)',
    },
    {
      icon: UsersRound,
      title: 'Families',
      description: 'Aiming to build long-term entrepreneurial income together',
      gradient: 'linear-gradient(135deg, #C5E1A5 0%, #9CCC65 100%)',
    },
    {
      icon: Globe,
      title: 'Trade Enthusiasts',
      description: 'Interested in import-export and global trade opportunities',
      gradient: 'linear-gradient(135deg, #AED581 0%, #8BC34A 100%)',
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'white',
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
          Who is this for?
        </Typography>

        {/* Audience Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 4,
          }}
        >
          {audiences.map((audience, index) => {
            const IconComponent = audience.icon;
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                {/* Icon Circle */}
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: audience.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <IconComponent
                    size={32}
                    strokeWidth={2}
                    color="#558B2F"
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
                  {audience.title}
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
                  {audience.description}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}