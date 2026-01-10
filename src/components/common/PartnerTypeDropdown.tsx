/**
 * Partner Type Dropdown Component
 * Reusable dropdown for selecting partner types from API
 */

import { FormControl, InputLabel, Select, MenuItem, CircularProgress, FormHelperText } from '@mui/material';
import { useGetPartnerTypesQuery } from '../../store/api/referenceDataApi';

interface PartnerTypeDropdownProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
}

export function PartnerTypeDropdown({
  value,
  onChange,
  label = 'Partner Type',
  error = false,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  size = 'medium',
}: PartnerTypeDropdownProps) {
  const { data: partnerTypes, isLoading, error: fetchError } = useGetPartnerTypesQuery();

  return (
    <FormControl 
      fullWidth={fullWidth} 
      error={error} 
      required={required}
      disabled={disabled || isLoading}
      size={size}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        disabled={disabled || isLoading}
      >
        {isLoading && (
          <MenuItem disabled>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Loading partner types...
          </MenuItem>
        )}
        {fetchError && (
          <MenuItem disabled>
            Error loading partner types
          </MenuItem>
        )}
        {!isLoading && !fetchError && partnerTypes && partnerTypes.length === 0 && (
          <MenuItem disabled>
            No partner types available
          </MenuItem>
        )}
        {!isLoading && !fetchError && partnerTypes && partnerTypes.map((type) => (
          <MenuItem key={type.id} value={type.code}>
            {type.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
