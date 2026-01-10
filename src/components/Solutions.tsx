import { Box, Container, Typography, Button } from '@mui/material';
import { ImageWithFallback } from './figma/ImageWithFallback';

const solutions = [
  {
    title: 'Port & Terminal Services',
    description: 'Access to over 300 ports worldwide with state-of-the-art terminal facilities for efficient cargo handling.',
    image: 'https://images.unsplash.com/photo-1672870152741-e526cfe5419b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMGNvbnRhaW5lcnMlMjBwb3J0fGVufDF8fHx8MTc2NjMzMzY2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'Integrated Logistics',
    description: 'Streamline your operations with our end-to-end logistics solutions, from warehouse to final delivery.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjB3YXJlaG91c2V8ZW58MXx8fHwxNzY2MzI3Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'Digital Solutions',
    description: 'Real-time tracking, automated documentation, and data analytics to optimize your supply chain.',
    image: 'https://images.unsplash.com/photo-1681770678332-3a190df72091?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBuZXR3b3JrJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjYyNzg2MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function Solutions() {
  return (
    <Box component="section" sx={{ py: 10 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Industry-Leading Solutions
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: 768,
              mx: 'auto',
              fontSize: { xs: '1.125rem', sm: '1.25rem' },
            }}
          >
            Innovative approaches to modern logistics challenges
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
          }}
        >
          {solutions.map((solution, index) => (
            <Box
              key={index}
              sx={{
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: 256,
                  mb: 2,
                  overflow: 'hidden',
                  borderRadius: 2,
                  '&:hover img': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <ImageWithFallback
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-full object-cover"
                  style={{
                    transition: 'transform 0.3s ease',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)',
                  }}
                />
              </Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {solution.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                {solution.description}
              </Typography>
              <Button
                sx={{
                  color: 'primary.main',
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    bgcolor: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                Explore solution →
              </Button>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
