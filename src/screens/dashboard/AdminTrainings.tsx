import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import { Plus, Users } from 'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { CreateTrainingSchedule } from './CreateTrainingSchedule';
import { EnrolledUsers } from './EnrolledUsers';
import {
  getAllTrainings,
  Training,
  getDisplayDate,
  formatTimeToHHMM,
} from '../../services/trainingApi';

export function AdminTrainings() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTrainingId, setSelectedTrainingId] = useState<number | null>(null);

  // Fetch trainings on component mount
  useEffect(() => {
    fetchTrainings();
  }, [showCreateForm]);

  const fetchTrainings = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllTrainings();
      setTrainings(data);
    } catch (err) {
      setError('Failed to load trainings. Please try again.');
      console.error('Error fetching trainings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Format training slot label
  const formatTrainingSlot = (training: Training): string => {
    const session1Display = getDisplayDate(training.firstSession.date);
    const session1Start = formatTimeToHHMM(training.firstSession.startTime);
    const session1End = formatTimeToHHMM(training.firstSession.endTime);

    const session2Display = getDisplayDate(training.secondSession.date);
    const session2Start = formatTimeToHHMM(training.secondSession.startTime);
    const session2End = formatTimeToHHMM(training.secondSession.endTime);

    return `${session1Display} (${session1Start}-${session1End}), ${session2Display} (${session2Start}-${session2End})`;
  };

  // Handle view enrolled users
  const handleViewUsers = (trainingId: number) => {
    setSelectedTrainingId(trainingId);
  };

  // If create form is shown, render it instead
  if (showCreateForm) {
    return <CreateTrainingSchedule onBack={() => setShowCreateForm(false)} />;
  }

  // If viewing enrolled users, render that screen
  if (selectedTrainingId !== null) {
    return (
      <EnrolledUsers
        trainingId={selectedTrainingId}
        onBack={() => setSelectedTrainingId(null)}
      />
    );
  }

  return (
    <Box>
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Trainings' }]} />

      {/* Header with Create Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#1A3D32',
          }}
        >
          Training Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => setShowCreateForm(true)}
          sx={{
            bgcolor: '#3D7A68',
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1.5,
            '&:hover': {
              bgcolor: '#2E5D4F',
            },
          }}
        >
          Create Training
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Trainings Table */}
      <Paper
        sx={{
          borderRadius: 3,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid',
          borderColor: 'grey.200',
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
            <CircularProgress sx={{ color: '#3D7A68' }} />
          </Box>
        ) : trainings.length === 0 ? (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No trainings available. Create your first training schedule.
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: '#F9FAFB',
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: '#1A3D32',
                      fontSize: '0.875rem',
                      py: 1.5,
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: '#1A3D32',
                      fontSize: '0.875rem',
                      py: 1.5,
                    }}
                  >
                    Training Schedule
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: '#1A3D32',
                      fontSize: '0.875rem',
                      py: 1.5,
                    }}
                  >
                    Session 1
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: '#1A3D32',
                      fontSize: '0.875rem',
                      py: 1.5,
                    }}
                  >
                    Session 2
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 700,
                      color: '#1A3D32',
                      fontSize: '0.875rem',
                      py: 1.5,
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trainings.map((training) => (
                  <TableRow
                    key={training.trainingId}
                    sx={{
                      '&:hover': {
                        bgcolor: '#F9FAFB',
                      },
                    }}
                  >
                    <TableCell sx={{ py: 1.5 }}>
                      <Chip
                        label={`#${training.trainingId}`}
                        size="small"
                        sx={{
                          bgcolor: '#E5E7EB',
                          color: '#374151',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 1.5, maxWidth: 400 }}>
                      <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                        {formatTrainingSlot(training)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: '0.875rem', color: '#374151' }}
                      >
                        {getDisplayDate(training.firstSession.date)}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: '#6B7280', display: 'block' }}
                      >
                        {formatTimeToHHMM(training.firstSession.startTime)} -{' '}
                        {formatTimeToHHMM(training.firstSession.endTime)} IST
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: '0.875rem', color: '#374151' }}
                      >
                        {getDisplayDate(training.secondSession.date)}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: '#6B7280', display: 'block' }}
                      >
                        {formatTimeToHHMM(training.secondSession.startTime)} -{' '}
                        {formatTimeToHHMM(training.secondSession.endTime)} IST
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ py: 1.5 }}>
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Tooltip title="View Enrolled Users">
                          <IconButton
                            onClick={() => handleViewUsers(training.trainingId)}
                            sx={{
                              color: '#3D7A68',
                              '&:hover': {
                                bgcolor: '#F0FDF4',
                              },
                            }}
                          >
                            <Users size={18} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}