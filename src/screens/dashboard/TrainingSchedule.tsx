import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Checkbox,
  CircularProgress,
  Alert,
  Snackbar,
  Chip,
} from '@mui/material';
import { Plus } from 'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { CreateTrainingSchedule } from './CreateTrainingSchedule';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/selectors/authSelectors';
import { hasPermission } from '../../utils/roleUtils';
import { Permission } from '../../utils/permissions';
import { 
  getAllTrainings, 
  getUserTrainings, 
  enrollUserInTraining, 
  Training, 
  getDisplayDate, 
  formatTimeToHHMM 
} from '../../services/trainingApi';

export function TrainingSchedule() {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [enrolledTrainings, setEnrolledTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const currentUser = useAppSelector(selectCurrentUser);

  // Fetch trainings and user's enrolled trainings on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch all available trainings
        const allTrainings = await getAllTrainings();
        setTrainings(allTrainings);
        
        // Fetch user's enrolled trainings if user exists
        if (currentUser?.id) {
          try {
            const userTrainings = await getUserTrainings(currentUser.id);
            setEnrolledTrainings(userTrainings);
            
            // Preselect if user is already enrolled in a training
            if (userTrainings.length > 0) {
              setSelectedSlot(userTrainings[0].trainingId.toString());
              setConsentChecked(true);
            }
          } catch (err) {
            console.log('No enrolled trainings found for user');
          }
        }
      } catch (err) {
        setError('Failed to load training schedules. Please try again.');
        console.error('Error fetching trainings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser?.id]);

  // Format training slot label
  const formatTrainingSlotLabel = (training: Training): string => {
    const session1Display = getDisplayDate(training.firstSession.date);
    const session1Start = formatTimeToHHMM(training.firstSession.startTime);
    const session1End = formatTimeToHHMM(training.firstSession.endTime);
    
    const session2Display = getDisplayDate(training.secondSession.date);
    const session2Start = formatTimeToHHMM(training.secondSession.startTime);
    const session2End = formatTimeToHHMM(training.secondSession.endTime);

    let label = `${session1Display} (${session1Start} - ${session1End} IST), ${session2Display} (${session2Start} - ${session2End} IST)`;

    // Add third session if it exists and has a date
    if (training.thirdSession && training.thirdSession.date) {
      const session3Display = getDisplayDate(training.thirdSession.date);
      const session3Start = formatTimeToHHMM(training.thirdSession.startTime);
      const session3End = formatTimeToHHMM(training.thirdSession.endTime);
      label += `, ${session3Display} (${session3Start} - ${session3End} IST)`;
    }

    return label;
  };

  // Check if user is enrolled in this training
  const isEnrolled = (trainingId: number): boolean => {
    return enrolledTrainings.some(t => t.trainingId === trainingId);
  };

  const handleConfirm = async () => {
    if (!currentUser?.id) {
      setError('You must be logged in to confirm a training slot.');
      return;
    }

    if (selectedSlot && consentChecked) {
      setSubmitting(true);
      setError('');
      try {
        await enrollUserInTraining(currentUser.id, parseInt(selectedSlot));
        setSuccessMessage('Training slot confirmed! You will receive confirmation via email/WhatsApp.');
        
        // Refresh enrolled trainings after successful enrollment
        const userTrainings = await getUserTrainings(currentUser.id);
        setEnrolledTrainings(userTrainings);
      } catch (err) {
        setError('Failed to confirm training slot. Please try again.');
        console.error('Error confirming training slot:', err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <Box>
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'My Trainings' }]} />

      {/* Form Section */}
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: 3,
          p: 5,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <FormControl component="fieldset" fullWidth>
          {/* Note */}
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: '#3D7A68',
              fontWeight: 500,
              fontSize: '0.95rem',
              lineHeight: 1.7,
            }}
          >
            Training will be conducted over 3 days, with 3-hour live webinars each day. Training is scheduled either from 7:00 AM – 10:00 AM IST (convenient for the USA, Australia, etc.) or 7:00 PM – 10:00 PM IST (convenient for Europe, the Gulf, etc.).
            <br /><br />
            You can select your preferred training slot. The training fee is USD 150. Once a slot is selected, the TIMPEX.club team will contact you via email / WhatsApp with your slot confirmation, webinar link, and payment link.
            <br /><br />
            <strong style={{ color: '#DC2626' }}>⚠️ Payment must be completed at least 48 hours before the training session begins. Unpaid slots will be automatically released.</strong>
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: '#1a1a1a',
              fontSize: '1.1rem',
            }}
          >
            Select One Training Slot *
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <CircularProgress sx={{ color: '#3D7A68' }} />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          ) : trainings.length === 0 ? (
            <Alert severity="info" sx={{ mb: 3 }}>
              No training schedules available at the moment. Please check back later.
            </Alert>
          ) : (
            <RadioGroup
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              {trainings.map((training) => (
                <FormControlLabel
                  key={training.trainingId}
                  value={training.trainingId.toString()}
                  control={
                    <Radio
                      sx={{
                        color: '#D1D5DB',
                        '&.Mui-checked': {
                          color: '#1A3D32',
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          color: '#374151',
                          fontWeight: 500,
                          flex: 1,
                          fontSize: '0.9rem',
                        }}
                      >
                        {formatTrainingSlotLabel(training)}
                      </Typography>
                      {isEnrolled(training.trainingId) && (
                        <Chip
                          label="Enrolled"
                          size="small"
                          sx={{
                            bgcolor: '#3D7A68',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            height: '22px',
                          }}
                        />
                      )}
                    </Box>
                  }
                  sx={{
                    border: '2px solid',
                    borderColor: selectedSlot === training.trainingId.toString() ? '#1A3D32' : '#E5E7EB',
                    borderRadius: 2,
                    py: 1.25,
                    px: 2,
                    mx: 0,
                    transition: 'all 0.2s ease',
                    bgcolor: selectedSlot === training.trainingId.toString() ? '#F0FDF4' : 'white',
                    '&:hover': {
                      borderColor: selectedSlot === training.trainingId.toString() ? '#1A3D32' : '#9CA3AF',
                      bgcolor: selectedSlot === training.trainingId.toString() ? '#F0FDF4' : '#F9FAFB',
                    },
                  }}
                />
              ))}
            </RadioGroup>
          )}

          {/* Consent Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                sx={{
                  color: '#D1D5DB',
                  '&.Mui-checked': {
                    color: '#1A3D32',
                  },
                }}
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{
                  color: '#374151',
                  fontSize: '0.9rem',
                }}
              >
                I understand that my seat will be confirmed by the TIMPEX.club team
              </Typography>
            }
            sx={{
              mt: 4,
              mb: 0,
              mx: 0,
            }}
          />

          {/* Confirm Button */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            disabled={!selectedSlot || !consentChecked || submitting}
            onClick={handleConfirm}
            sx={{
              mt: 4,
              py: 2,
              bgcolor: '#3D7A68',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#2E5D4F',
              },
              '&:disabled': {
                bgcolor: '#E5E7EB',
                color: '#9CA3AF',
              },
            }}
          >
            {submitting ? 'Confirming...' : 'Confirm Training Slot'}
          </Button>
        </FormControl>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={successMessage !== ''}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSuccessMessage('')}
          severity="success"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}