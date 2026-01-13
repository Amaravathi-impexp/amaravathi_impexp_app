import { useState } from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Checkbox,
} from '@mui/material';
import { Breadcrumb } from './Breadcrumb';

export function TrainingSchedule() {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  const trainingSlots = [
    {
      id: 'slot1',
      label: 'Saturday, 17th January (9AM - 1PM IST), Sunday, 18th January (9AM - 1PM IST)',
    },
    {
      id: 'slot2',
      label: 'Saturday, 24th January (9AM - 1PM IST), Sunday, 25th January (9AM - 1PM IST)',
    },
    {
      id: 'slot3',
      label: 'Saturday, 31st January (9AM - 1PM IST), Sunday, 1st February (9AM - 1PM IST)',
    },
  ];

  const handleConfirm = () => {
    if (selectedSlot && consentChecked) {
      alert('Training slot confirmed! You will receive confirmation via email/WhatsApp.');
    }
  };

  return (
    <Box>
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Training Schedule' }]} />

      {/* Form Section */}
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: 2,
          p: 4,
          boxShadow: 1,
        }}
      >
        <FormControl component="fieldset" fullWidth>
          {/* Note */}
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              color: '#3D7A68',
              fontWeight: 500,
            }}
          >
            Choose a live training slot. Seat confirmation will be shared via email/WhatsApp.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Select One Training Slot *
          </Typography>

          <RadioGroup
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {trainingSlots.map((slot) => (
              <FormControlLabel
                key={slot.id}
                value={slot.id}
                control={
                  <Radio
                    sx={{
                      color: 'grey.400',
                      '&.Mui-checked': {
                        color: 'primary.main',
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 400,
                    }}
                  >
                    {slot.label}
                  </Typography>
                }
                sx={{
                  border: 2,
                  borderColor: selectedSlot === slot.id ? 'primary.main' : 'grey.300',
                  borderRadius: 2,
                  py: 2,
                  px: 2,
                  mx: 0,
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: selectedSlot === slot.id ? 'primary.main' : 'grey.400',
                    bgcolor: 'grey.50',
                  },
                }}
              />
            ))}
          </RadioGroup>

          {/* Consent Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                sx={{
                  color: 'grey.400',
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{
                  color: 'text.primary',
                }}
              >
                I understand that my seat will be confirmed by the TIMPEX.club team
              </Typography>
            }
            sx={{
              mt: 3,
              mb: 0,
              mx: 0,
            }}
          />

          {/* Confirm Button */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            disabled={!selectedSlot || !consentChecked}
            onClick={handleConfirm}
            sx={{
              mt: 3,
              py: 2,
              bgcolor: '#3D7A68',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#2E5D4F',
              },
              '&:disabled': {
                bgcolor: 'grey.300',
                color: 'grey.500',
              },
            }}
          >
            Confirm Training Slot
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
}