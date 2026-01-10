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
import { CreateUser } from './CreateUser';
import { ViewUser } from './ViewUser';
import { Breadcrumb } from './Breadcrumb';
import { useGetUsersQuery } from '../store/api/usersApi';
import type { Role } from '../store/api/types';

export function Users() {
  const { data: users = [], isLoading, error } = useGetUsersQuery();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [viewUserId, setViewUserId] = useState<number | null>(null);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      user.email.toLowerCase().includes(query) ||
      user.fullName.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query) ||
      (user.roles && user.roles.length > 0 && user.roles.some(role => 
        role.name.toLowerCase().includes(query)
      )) ||
      user.originCountry?.name.toLowerCase().includes(query) ||
      user.destinationCountry?.name.toLowerCase().includes(query) ||
      user.productType?.name.toLowerCase().includes(query)
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
            <Button
              variant="contained"
              startIcon={<Plus className="w-5 h-5" />}
              onClick={() => setShowCreateForm(true)}
            >
              Create
            </Button>
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
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Role(s)</TableCell>
                  <TableCell>Origin Country</TableCell>
                  <TableCell>Destination Country</TableCell>
                  <TableCell>Product Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Email Verified</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Typography variant="body2">{user.fullName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.phone}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {user.roles.map((role) => (
                          <Chip
                            key={role.id}
                            label={formatRoleName(role)}
                            color={getRoleColor(role) as any}
                            size="small"
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color={user.originCountry ? 'text.primary' : 'text.disabled'}>
                        {user.originCountry?.name || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color={user.destinationCountry ? 'text.primary' : 'text.disabled'}>
                        {user.destinationCountry?.name || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color={user.productType ? 'text.primary' : 'text.disabled'}>
                        {user.productType?.name || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={formatStatus(user.status)}
                        color={getStatusColor(user.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color={user.emailVerified ? 'success.main' : 'text.disabled'}>
                        {user.emailVerified ? '✓ Verified' : 'Not verified'}
                      </Typography>
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
                        <IconButton
                          size="small"
                          color="default"
                          title="Modify"
                        >
                          <Edit className="w-4 h-4" />
                        </IconButton>
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