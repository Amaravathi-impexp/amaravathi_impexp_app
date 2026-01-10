import { useGetRolesDropdownQuery, Role } from '../../store/api/referenceDataApi';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Alert,
  Button,
  Box,
} from '@mui/material';
import { RefreshCw } from 'lucide-react';

interface RoleDropdownProps {
  value?: Role | null;
  onChange: (role: Role | null) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  label?: string;
}

export function RoleDropdown({
  value,
  onChange,
  placeholder = 'Select a role',
  error,
  required = false,
  label = 'Role',
}: RoleDropdownProps) {
  const { data: roles = [], isLoading, isError, refetch } = useGetRolesDropdownQuery();

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl fullWidth error={!!error || isError} required={required} sx={{ width: '100%' }}>
        <InputLabel id="role-select-label">{label}</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={value?.id || ''}
          label={label}
          onChange={(e) => {
            const selectedRole = roles.find((r) => r.id === e.target.value) || null;
            onChange(selectedRole);
          }}
          disabled={isLoading || isError}
          sx={{ width: '100%' }}
          startAdornment={
            isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
                <CircularProgress size={20} />
              </Box>
            ) : null
          }
        >
          {!isLoading && roles.length === 0 && (
            <MenuItem disabled value="">
              <em>No roles available</em>
            </MenuItem>
          )}
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
        
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>

      {/* API Error with Retry */}
      {isError && (
        <Alert 
          severity="error" 
          sx={{ mt: 1 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => refetch()}
              startIcon={<RefreshCw className="w-3 h-3" />}
            >
              Retry
            </Button>
          }
        >
          Unable to load roles. Please try again.
        </Alert>
      )}
    </Box>
  );
}
