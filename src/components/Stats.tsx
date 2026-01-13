import { Box, Container, Typography } from '@mui/material';

const stats = [
  { value: '700+', label: 'Vessels' },
  { value: '300+', label: 'Ports Worldwide' },
  { value: '130', label: 'Countries' },
  { value: '20M', label: 'Containers Shipped Annually' },
];

export function Stats() {
  return (
    <Box
      component="section"
      sx={{
        py: 10,
        bgcolor: 'primary.main',
        color: 'white',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 4,
          }}
        >
          {stats.map((stat, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2.25rem', md: '3rem' },
                  mb: 1,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#D3FF62', // Updated: Lime accent
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}