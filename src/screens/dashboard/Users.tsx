import { Eye, Edit, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Collapse,
  TablePagination,
} from '@mui/material';
import { CreateUser } from '../../components/CreateUser';
import { ViewUser } from '../../components/ViewUser';
import { Breadcrumb } from '../../components/Breadcrumb';
import { useGetUsersQuery } from '../../store/api/usersApi';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/selectors/authSelectors';
import { hasPermission } from '../../utils/roleUtils';
import { Permission } from '../../utils/permissions';
import type { Role } from '../../store/api/types';

export function Users() {
  const { data: users = [], isLoading, error } = useGetUsersQuery();
  const currentUser = useAppSelector(selectCurrentUser);
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [viewUserId, setViewUserId] = useState<number | null>(null);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Check permissions
  const canCreateUser = hasPermission(currentUser, Permission.CREATE_USER);
  const canEditUser = hasPermission(currentUser, Permission.EDIT_USER);
  const canDeleteUser = hasPermission(currentUser, Permission.DELETE_USER);

  const getRoleColor = (role: Role) => {
    const roleCode = role.code.toUpperCase();
    switch (roleCode) {
      case 'ADMIN':
        return 'error';
      case 'IMPT':
      case 'IMPORTER':
        return 'primary';
      case 'EXPT':
      case 'EXPORTER':
        return 'success';
      default:
        return 'default';
    }
  };

  const formatRoleName = (role: Role) => {
    const roleCode = role.code.toUpperCase();
    switch (roleCode) {
      case 'ADMIN':
        return 'Admin';
      case 'IMPT':
        return 'Importer';
      case 'EXPT':
        return 'Exporter';
      default:
        return role.name || role.code;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
      case 'ENROLLED':
        return 'success';
      case 'PENDING_VERIFICATION':
        return 'warning';
      case 'INACTIVE':
        return 'default';
      default:
        return 'default';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatFieldValue = (value: string | null | undefined) => {
    if (!value) return '-';
    return value.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      user.email.toLowerCase().includes(query) ||
      user.fullName.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query) ||
      (user.city && user.city.toLowerCase().includes(query)) ||
      (user.residenceCountry && user.residenceCountry.toLowerCase().includes(query)) ||
      (user.occupation && user.occupation.toLowerCase().includes(query))
    );
  });

  if (showCreateForm) {
    return <CreateUser onBack={() => setShowCreateForm(false)} />;
  }

  if (viewUserId) {
    return <ViewUser userId={viewUserId} onBack={() => setViewUserId(null)} />;
  }

  return (
    <Box>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Admin' },
          { label: 'Users' },
        ]}
      />

      {/* User Management Table */}
      <Paper elevation={2} sx={{ mt: 3 }}>
        <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Users</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Collapse in={searchExpanded} orientation="horizontal">
              <TextField
                size="small"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                sx={{ width: 250 }}
              />
            </Collapse>
            <IconButton
              onClick={() => setSearchExpanded(!searchExpanded)}
              color="default"
            >
              <Search className="w-5 h-5" />
            </IconButton>
            {canCreateUser && (
              <Button
                variant="contained"
                startIcon={<Plus className="w-5 h-5" />}
                onClick={() => setShowCreateForm(true)}
              >
                Create
              </Button>
            )}
          </Box>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <Alert severity="error">Error loading users. Please try again.</Alert>
          </Box>
        ) : filteredUsers.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <Typography color="text.secondary">
              {searchQuery ? 'No users found matching your search.' : 'No users found.'}
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Country Code</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Residence Country</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Preferred Language</TableCell>
                  <TableCell>Occupation</TableCell>
                  <TableCell>Interest</TableCell>
                  <TableCell>Trading Experience</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>{user.fullName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.countryCode}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.phone}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={formatStatus(user.status)}
                        color={getStatusColor(user.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{formatFieldValue(user.residenceCountry)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{formatFieldValue(user.city)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{formatFieldValue(user.preferredLanguage)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{formatFieldValue(user.occupation)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{formatFieldValue(user.interest)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{formatFieldValue(user.previousTradingExposure)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          color="primary"
                          title="View"
                          onClick={() => setViewUserId(user.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </IconButton>
                        {canEditUser && (
                          <IconButton
                            size="small"
                            color="default"
                            title="Modify"
                          >
                            <Edit className="w-4 h-4" />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 20, 50]}
              component="div"
              count={filteredUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
            />
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}