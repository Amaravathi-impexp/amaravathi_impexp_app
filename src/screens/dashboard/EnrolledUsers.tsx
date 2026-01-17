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
  TablePagination,
  Chip,
} from '@mui/material';
import { ArrowLeft, Download } from 'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { getEnrolledUsers, EnrolledUser } from '../../services/trainingApi';

interface EnrolledUsersProps {
  trainingId: number;
  onBack: () => void;
}

export function EnrolledUsers({ trainingId, onBack }: EnrolledUsersProps) {
  const [users, setUsers] = useState<EnrolledUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch enrolled users on component mount
  useEffect(() => {
    fetchEnrolledUsers();
  }, [trainingId]);

  const fetchEnrolledUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getEnrolledUsers(trainingId);
      setUsers(data);
    } catch (err) {
      setError('Failed to load enrolled users. Please try again.');
      console.error('Error fetching enrolled users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Download CSV
  const handleDownloadCSV = () => {
    // Create CSV content
    const headers = ['Full Name', 'Email', 'Phone', 'Status'];
    const csvContent = [
      headers.join(','),
      ...users.map(user => [
        `"${user.fullName}"`,
        `"${user.email}"`,
        `"${user.phone}"`,
        `"${user.status}"`
      ].join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `training_${trainingId}_enrolled_users.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get paginated users
  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Trainings', onClick: onBack },
          { label: 'Enrolled Users' }
        ]}
      />

      {/* Header with Back and Download buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowLeft size={20} />}
            onClick={onBack}
            sx={{
              borderColor: '#3D7A68',
              color: '#3D7A68',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#2E5D4F',
                bgcolor: '#F0FDF4',
              },
            }}
          >
            Back
          </Button>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#1A3D32',
            }}
          >
            Enrolled Users - Training #{trainingId}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Download size={20} />}
          onClick={handleDownloadCSV}
          disabled={users.length === 0}
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
            '&:disabled': {
              bgcolor: '#E5E7EB',
              color: '#9CA3AF',
            },
          }}
        >
          Download CSV
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Users Table */}
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
        ) : users.length === 0 ? (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No users enrolled in this training yet.
            </Typography>
          </Box>
        ) : (
          <>
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
                      Full Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        color: '#1A3D32',
                        fontSize: '0.875rem',
                        py: 1.5,
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        color: '#1A3D32',
                        fontSize: '0.875rem',
                        py: 1.5,
                      }}
                    >
                      Phone
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        color: '#1A3D32',
                        fontSize: '0.875rem',
                        py: 1.5,
                      }}
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      sx={{
                        '&:hover': {
                          bgcolor: '#F9FAFB',
                        },
                      }}
                    >
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}
                        >
                          {user.fullName}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: '0.875rem', color: '#6B7280' }}
                        >
                          {user.email}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: '0.875rem', color: '#6B7280' }}
                        >
                          {user.phone}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Chip
                          label={user.status}
                          size="small"
                          sx={{
                            bgcolor: user.status === 'ENROLLED' ? '#D1FAE5' : '#E5E7EB',
                            color: user.status === 'ENROLLED' ? '#065F46' : '#374151',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            {/* Pagination */}
            <TablePagination
              component="div"
              count={users.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              sx={{
                borderTop: '1px solid',
                borderColor: 'grey.200',
                '.MuiTablePagination-toolbar': {
                  color: '#374151',
                },
                '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                  fontSize: '0.875rem',
                },
              }}
            />
          </>
        )}
      </Paper>
    </Box>
  );
}
