import { Card, Box, Typography, FormControlLabel, Radio } from '@mui/material';
import { LucideIcon } from 'lucide-react';

interface SelectionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  value: string;
  selected: boolean;
  onClick: () => void;
  iconColor?: string;
  hoverIconColor?: string;
}

export function SelectionCard({
  icon: Icon,
  title,
  description,
  value,
  selected,
  onClick,
  iconColor = '#1A3D32', // Updated: Dark forest green
  hoverIconColor = '#2D5A4A', // Updated: Medium green on hover
}: SelectionCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 3,
        cursor: 'pointer',
        textAlign: 'center',
        border: selected ? 2 : 1,
        borderColor: selected ? 'primary.main' : 'divider',
        bgcolor: selected ? 'primary.50' : 'background.paper',
        transition: 'all 0.2s ease-in-out',
        minHeight: 220,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: 2,
          '& .selection-icon': {
            color: hoverIconColor,
            transform: 'scale(1.1)',
          },
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <Icon
          className="w-12 h-12 selection-icon"
          style={{
            color: selected ? iconColor : '#6b7280', // Blue when selected, gray when not
            transition: 'all 0.2s ease-in-out',
          }}
        />
      </Box>
      <FormControlLabel
        value={value}
        control={
          <Radio
            sx={{
              color: selected ? 'primary.main' : 'default',
            }}
          />
        }
        label={
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: selected ? 600 : 400,
                color: selected ? 'primary.main' : 'text.primary',
                transition: 'all 0.2s ease-in-out',
                fontSize: '1.125rem',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: 'block',
                minHeight: 40,
                mt: 0.5,
                fontSize: '0.9375rem',
              }}
            >
              {description}
            </Typography>
          </Box>
        }
        labelPlacement="bottom"
        sx={{
          m: 0,
          width: '100%',
        }}
      />
    </Card>
  );
}