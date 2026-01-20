import { Box, Typography, Paper, Chip } from '@mui/material';
import { FileText, Building2, Landmark } from 'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';

interface LicenseRequirement {
  id: string;
  title: string;
  description: string;
  icon: typeof FileText;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export function LicensingRequirements() {
  const requirements: LicenseRequirement[] = [
    {
      id: '1',
      title: 'Import Export Code (IEC)',
      description: 'Required for international trade',
      icon: FileText,
      status: 'Pending',
    },
    {
      id: '2',
      title: 'GST Registration',
      description: 'For tax compliance',
      icon: Building2,
      status: 'Pending',
    },
    {
      id: '3',
      title: 'Bank Account (Current)',
      description: 'For trade transactions',
      icon: Landmark,
      status: 'Pending',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return {
          bgcolor: '#D1FAE5',
          color: '#065F46',
        };
      case 'Rejected':
        return {
          bgcolor: '#FEE2E2',
          color: '#991B1B',
        };
      case 'Pending':
      default:
        return {
          bgcolor: '#FEF3C7',
          color: '#92400E',
        };
    }
  };

  return (
    <Box>
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Licensing Requirements' }]} />

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#1A3D32',
            mb: 1,
          }}
        >
          Licensing Requirements
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#6B7280',
            fontSize: '0.95rem',
          }}
        >
          Complete these requirements to start executing trades. Our team will guide you
          through the process.
        </Typography>
      </Box>

      {/* Requirements List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {requirements.map((requirement) => {
          const IconComponent = requirement.icon;
          return (
            <Paper
              key={requirement.id}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {/* Left: Icon + Content */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                {/* Icon */}
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    bgcolor: '#D3FF62',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <IconComponent size={28} color="#1A3D32" strokeWidth={2} />
                </Box>

                {/* Text Content */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#1F2937',
                      fontSize: '1rem',
                      mb: 0.5,
                    }}
                  >
                    {requirement.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6B7280',
                      fontSize: '0.875rem',
                    }}
                  >
                    {requirement.description}
                  </Typography>
                </Box>
              </Box>

              {/* Right: Status Badge */}
              <Chip
                label={requirement.status}
                sx={{
                  ...getStatusColor(requirement.status),
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  px: 1,
                  height: 32,
                }}
              />
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}
