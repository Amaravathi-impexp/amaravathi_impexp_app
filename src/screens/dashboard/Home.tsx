import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/selectors/authSelectors';

export function Home() {
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#F9FAFB',
          color: '#1A3D32',
          pt: 6,
          pb: 8,
          px: 4,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231A3D32' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              mb: 2,
              color: '#1A3D32',
            }}
          >
            Welcome back, {currentUser?.fullName || 'User'}! 👋
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              fontSize: { xs: '1rem', md: '1.25rem' },
              mb: 3,
              color: '#3D7A68',
            }}
          >
            You're now part of the Telugu Import Export Club
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1rem',
              maxWidth: 700,
              color: '#374151',
            }}
          >
            Complete your training, verify your profile, apply for licenses, explore past and live trades by fellow members, and access curated trade opportunities. Your first 10 trades will be hand-held by the TIMPEX.club team.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}