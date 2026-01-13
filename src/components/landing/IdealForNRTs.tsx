import { Box, Container, Typography, Paper, Avatar } from '@mui/material';

const benefits = [
  {
    number: '1',
    title: 'Low entry barriers',
    gradient: 'linear-gradient(135deg, #E8F5E9 0%, #A5D6A7 100%)',
  },
  {
    number: '2',
    title: 'Start alongside existing work',
    gradient: 'linear-gradient(135deg, #C8E6C9 0%, #81C784 100%)',
  },
  {
    number: '3',
    title: 'Limited capital required',
    gradient: 'linear-gradient(135deg, #A5D6A7 0%, #66BB6A 100%)',
  },
  {
    number: '4',
    title: 'Managed remotely with support',
    gradient: 'linear-gradient(135deg, #81C784 0%, #4CAF50 100%)',
  },
];

export function IdealForNRTs() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        {/* Title */}
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: 'text.primary',
            fontWeight: 700,
          }}
        >
          International Trading is Ideal for NRTs
        </Typography>

        {/* Cards Grid */}
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
          {benefits.map((benefit) => (
            <Paper
              key={benefit.number}
              elevation={0}
              sx={{
                p: 4,
                textAlign: 'center',
                bgcolor: 'white',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 12px rgba(26, 61, 50, 0.08)',
                  borderColor: 'primary.main',
                },
              }}
            >
              {/* Number Circle */}
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  background: benefit.gradient,
                  color: '#1A3D32',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  mx: 'auto',
                  mb: 3,
                }}
              >
                {benefit.number}
              </Avatar>

              {/* Title */}
              <Typography
                variant="body1"
                sx={{
                  color: 'text.primary',
                  fontWeight: 500,
                  lineHeight: 1.6,
                }}
              >
                {benefit.title}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}