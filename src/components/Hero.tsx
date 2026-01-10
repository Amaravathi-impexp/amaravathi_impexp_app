import { Search, Package } from 'lucide-react';
import { Box, Container, Typography, TextField, InputAdornment, Button, Paper } from '@mui/material';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: 600,
        bgcolor: 'grey.900',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
        }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1663801563712-ebf3c6a78239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHNoaXAlMjBvY2VhbnxlbnwxfHx8fDE3NjYyODYyMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Cargo ship at sea"
          className="w-full h-full object-cover opacity-60"
        />
      </Box>

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Box sx={{ maxWidth: 768 }}>
          <Typography
            variant="h1"
            sx={{
              color: 'white',
              mb: 3,
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
            }}
          >
            Global Shipping & Logistics Solutions
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'grey.200',
              mb: 4,
              fontSize: { xs: '1.125rem', sm: '1.25rem' },
            }}
          >
            Connect your business to the world with reliable ocean freight, supply chain management, and end-to-end logistics services.
          </Typography>

          {/* Quick Actions */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    display: 'block',
                    mb: 1,
                    fontSize: '0.875rem',
                  }}
                >
                  Track your shipment
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter container or booking number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Search className="w-5 h-5 text-gray-400" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'end' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Package className="w-5 h-5" />}
                  fullWidth
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Track
                </Button>
              </Box>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2, fontSize: '0.875rem' }}>
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
                Get a Quote
              </Button>
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
                Schedule Pickup
              </Button>
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
                Find Locations
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
