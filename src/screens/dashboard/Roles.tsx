import { Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  TextField,
  Button,
  Alert,
  Paper,
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
} from '@mui/material';
import { Breadcrumb } from '../../components/Breadcrumb';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { useGetRolesQuery, useDeleteRoleMutation, useCreateRoleMutation } from '../../store/api/rolesApi';
import { logger } from '../../utils/logger';

interface CreateRoleFormProps {
  onBack: () => void;
}

function CreateRoleForm({ onBack }: CreateRoleFormProps) {
  const [createRole, { isLoading }] = useCreateRoleMutation();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await createRole(formData).unwrap();
      onBack();
    } catch (err: any) {
      logger.error('Create role error', { err, formData: { code: formData.code, name: formData.name } });
      const errorMessage = err?.data?.message || err?.message || 'Failed to create role. Please try again.';
      setError(errorMessage);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Admin', onClick: onBack },
          { label: 'Roles', onClick: onBack },
          { label: 'Create Role' },
        ]}
      />

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 800 }}>
        {/* Error Message */}
        {error && (
          <Alert severity="error" onClose={() => setError('')} sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Role Information Card */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">Role Information</Typography>
            <Typography variant="body2" color="text.secondary">
              Create a new role with specific permissions
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Role Code */}
            <TextField
              id="code"
              name="code"
              label="Role Code"
              required
              fullWidth
              value={formData.code}
              onChange={handleChange}
              helperText="Unique identifier for the role (uppercase letters)"
            />

            {/* Role Name */}
            <TextField
              id="name"
              name="name"
              label="Role Name"
              required
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />

            {/* Description */}
            <TextField
              id="description"
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              onClick={onBack}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : <Plus className="w-5 h-5" />}
            >
              {isLoading ? 'Creating...' : 'Create Role'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export function Roles() {
  const { data: roles = [], isLoading, error } = useGetRolesQuery();
  const [deleteRole] = useDeleteRoleMutation();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingRoleId, setDeletingRoleId] = useState<string | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<{ id: string; name: string } | null>(null);

  const getRoleColor = (code: string) => {
    switch (code.toUpperCase()) {
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

  const getTypeColor = (type: string | null) => {
    if (!type) return 'default';
    switch (type) {
      case 'SYSTEM':
        return 'secondary';
      case 'CUSTOM':
        return 'info';
      default:
        return 'default';
    }
  };

  // Filter roles based on search query
  const filteredRoles = roles.filter((role) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      role.name.toLowerCase().includes(query) ||
      role.code.toLowerCase().includes(query) ||
      role.description.toLowerCase().includes(query)
    );
  });

  const handleDeleteRole = async (roleId: string, roleName: string) => {
    setDeletingRoleId(roleId);
    setRoleToDelete({ id: roleId, name: roleName });
  };

  const confirmDeleteRole = async () => {
    if (!roleToDelete) return;

    try {
      await deleteRole(roleToDelete.id).unwrap();
    } catch (err: any) {
      logger.error('Delete role error', { err, roleId: roleToDelete.id, roleName: roleToDelete.name });
      alert(err?.data?.message || err?.message || 'Failed to delete role. Please try again.');
    } finally {
      setDeletingRoleId(null);
      setRoleToDelete(null);
    }
  };

  if (showCreateForm) {
    return <CreateRoleForm onBack={() => setShowCreateForm(false)} />;
  }

  return (
    <Box>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Admin' },
          { label: 'Roles' },
        ]}
      />

      {/* Roles Management Table */}
      <Paper elevation={2} sx={{ mt: 3 }}>
        <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Roles</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Collapse in={searchExpanded} orientation="horizontal">
              <TextField
                size="small"
                placeholder="Search roles..."
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
              Create Role
            </Button>
          </Box>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <Alert severity="error">Error loading roles. Please try again.</Alert>
          </Box>
        ) : filteredRoles.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <Typography color="text.secondary">
              {searchQuery ? 'No roles found matching your search.' : 'No roles found.'}
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow key={role.id} hover>
                    <TableCell>
                      <Chip
                        label={role.code}
                        color={getRoleColor(role.code) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{role.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={role.type}
                        color={getTypeColor(role.type) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{role.description}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDeleteRole(role.id, role.name)}
                        disabled={deletingRoleId === role.id}
                        color="error"
                        size="small"
                        title="Delete"
                      >
                        {deletingRoleId === role.id ? (
                          <CircularProgress size={16} />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Confirm Delete Dialog */}
      {roleToDelete && (
        <ConfirmDialog
          isOpen={!!roleToDelete}
          title="Delete Role"
          message={`Are you sure you want to delete the role "${roleToDelete.name}"? This action cannot be undone.`}
          onConfirm={confirmDeleteRole}
          onCancel={() => setRoleToDelete(null)}
          variant="danger"
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </Box>
  );
}
