import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Breadcrumb } from '../../components/Breadcrumb';
import { ArrowLeft } from 'lucide-react';
import { createTraining, formatDateToDDMMYYYY } from '../../services/trainingApi';

interface CreateTrainingScheduleProps {
  onBack: () => void;
}

// Generate time options in 24-hour format with 30-minute intervals
const generateTimeOptions = () => {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      times.push(timeString);
    }
  }
  return times;
};

export function CreateTrainingSchedule({ onBack }: CreateTrainingScheduleProps) {
  const timeOptions = generateTimeOptions();

  // Session 1 state
  const [session1Date, setSession1Date] = useState<Date | null>(null);
  const [session1StartTime, setSession1StartTime] = useState('');
  const [session1EndTime, setSession1EndTime] = useState('');

  // Session 2 state
  const [session2Date, setSession2Date] = useState<Date | null>(null);
  const [session2StartTime, setSession2StartTime] = useState('');
  const [session2EndTime, setSession2EndTime] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    if (!session1Date || !session1StartTime || !session1EndTime || 
        !session2Date || !session2StartTime || !session2EndTime) {
      alert('Please fill in all fields for both sessions');
      return;
    }

    // Validate that end time is after start time for both sessions
    if (session1EndTime <= session1StartTime) {
      alert('Session 1: End time must be after start time');
      return;
    }

    if (session2EndTime <= session2StartTime) {
      alert('Session 2: End time must be after start time');
      return;
    }

    // Format dates for display
    const session1DateStr = session1Date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    const session2DateStr = session2Date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });

    const scheduleData = {
      session1: {
        date: session1DateStr,
        startTime: session1StartTime,
        endTime: session1EndTime,
      },
      session2: {
        date: session2DateStr,
        startTime: session2StartTime,
        endTime: session2EndTime,
      },
    };

    setLoading(true);
    setError('');

    try {
      await createTraining({
        firstSession: {
          date: formatDateToDDMMYYYY(session1Date),
          startTime: session1StartTime,
          endTime: session1EndTime,
        },
        secondSession: {
          date: formatDateToDDMMYYYY(session2Date),
          startTime: session2StartTime,
          endTime: session2EndTime,
        },
      });
      console.log('Training Schedule Created:', scheduleData);
      setSuccess(true);
      onBack();
    } catch (err) {
      setError('Failed to create training schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter end time options based on start time
  const getEndTimeOptions = (startTime: string) => {
    if (!startTime) return timeOptions;
    return timeOptions.filter(time => time > startTime);
  };

  const isFormValid = 
    session1Date && session1StartTime && session1EndTime &&
    session2Date && session2StartTime && session2EndTime;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'Training Schedule', onClick: onBack },
          { label: 'Create Schedule' }
        ]} />

        {/* Header */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            onClick={onBack}
            startIcon={<ArrowLeft size={20} />}
            sx={{
              color: 'text.secondary',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            Back
          </Button>
        </Box>

        {/* Form Section */}
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
            p: 4,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 1,
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Create Training Schedule
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mb: 1,
              color: 'text.secondary',
            }}
          >
            Define a two-session training schedule with dates and times
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mb: 4,
              color: '#3D7A68',
              fontWeight: 500,
              fontStyle: 'italic',
            }}
          >
            Note: All times are in IST (Indian Standard Time)
          </Typography>

          {/* Session 1 */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: 'text.primary',
                fontSize: '1.125rem',
              }}
            >
              Session 1
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
              <Box sx={{ flex: 1 }}>
                <DatePicker
                  label="Date *"
                  value={session1Date}
                  onChange={(newValue) => setSession1Date(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          height: '56px',
                        },
                      },
                    },
                  }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <FormControl fullWidth>
                  <InputLabel>Start Time *</InputLabel>
                  <Select
                    value={session1StartTime}
                    onChange={(e) => {
                      setSession1StartTime(e.target.value);
                      // Reset end time if it's now invalid
                      if (session1EndTime && session1EndTime <= e.target.value) {
                        setSession1EndTime('');
                      }
                    }}
                    label="Start Time *"
                    sx={{
                      height: '56px',
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 300,
                        },
                      },
                    }}
                  >
                    {timeOptions.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: 1 }}>
                <FormControl fullWidth>
                  <InputLabel>End Time *</InputLabel>
                  <Select
                    value={session1EndTime}
                    onChange={(e) => setSession1EndTime(e.target.value)}
                    label="End Time *"
                    disabled={!session1StartTime}
                    sx={{
                      height: '56px',
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 300,
                        },
                      },
                    }}
                  >
                    {getEndTimeOptions(session1StartTime).map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>

          {/* Session 2 */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: 'text.primary',
                fontSize: '1.125rem',
              }}
            >
              Session 2
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
              <Box sx={{ flex: 1 }}>
                <DatePicker
                  label="Date *"
                  value={session2Date}
                  onChange={(newValue) => setSession2Date(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          height: '56px',
                        },
                      },
                    },
                  }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <FormControl fullWidth>
                  <InputLabel>Start Time *</InputLabel>
                  <Select
                    value={session2StartTime}
                    onChange={(e) => {
                      setSession2StartTime(e.target.value);
                      // Reset end time if it's now invalid
                      if (session2EndTime && session2EndTime <= e.target.value) {
                        setSession2EndTime('');
                      }
                    }}
                    label="Start Time *"
                    sx={{
                      height: '56px',
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 300,
                        },
                      },
                    }}
                  >
                    {timeOptions.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: 1 }}>
                <FormControl fullWidth>
                  <InputLabel>End Time *</InputLabel>
                  <Select
                    value={session2EndTime}
                    onChange={(e) => setSession2EndTime(e.target.value)}
                    label="End Time *"
                    disabled={!session2StartTime}
                    sx={{
                      height: '56px',
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 300,
                        },
                      },
                    }}
                  >
                    {getEndTimeOptions(session2StartTime).map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={onBack}
              sx={{
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                borderColor: 'grey.300',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: 'grey.400',
                  bgcolor: 'grey.50',
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
              disabled={!isFormValid}
              sx={{
                px: 4,
                py: 1.5,
                bgcolor: '#3D7A68',
                color: 'white',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#2E5D4F',
                },
                '&:disabled': {
                  bgcolor: 'grey.300',
                  color: 'grey.500',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Schedule'}
            </Button>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mt: 2,
                mb: 4,
              }}
            >
              {error}
            </Alert>
          )}
        </Box>

        {/* Success Snackbar */}
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSuccess(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            Training schedule created successfully!
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
}
