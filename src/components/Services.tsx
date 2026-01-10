import { Box, Container, Typography, Paper, Button } from '@mui/material';
import { Ship, Truck, Warehouse, Globe } from 'lucide-react';

const services = [
  {
    icon: Ship,
    title: 'Ocean Freight',
    description: 'Full container load (FCL) and less than container load (LCL) services to any destination worldwide.',
  },
  {
    icon: Truck,
    title: 'Inland Transportation',
    description: 'Reliable door-to-door delivery with our extensive network of ground transportation partners.',
  },
  {
    icon: Warehouse,
    title: 'Warehousing & Distribution',
    description: 'Secure storage solutions and efficient distribution services across key locations globally.',
  },
  {
    icon: Globe,
    title: 'Supply Chain Management',
    description: 'End-to-end supply chain optimization and visibility for seamless global operations.',
  },
];

export function Services() {
  return (
    <Box
      component="section"
      sx={{
        py: 10,
        bgcolor: 'grey.50',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Our Services
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
            Comprehensive logistics solutions tailored to your business needs
          </Typography>
        </Box>

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
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Paper
                key={index}
                elevation={1}
                sx={{
                  p: 3,
                  bgcolor: 'white',
                  transition: 'box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: 'primary.lighter',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <Icon className="w-6 h-6 text-blue-600" />
                </Box>
                <Typography variant="h6" sx={{ mb: 1.5 }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {service.description}
                </Typography>
                <Button
                  sx={{
                    mt: 2,
                    color: 'primary.main',
                    p: 0,
                    minWidth: 'auto',
                    '&:hover': {
                      bgcolor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Learn more →
                </Button>
              </Paper>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
