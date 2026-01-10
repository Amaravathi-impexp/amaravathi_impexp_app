import { useGetCountriesQuery, Country } from '../../store/api/referenceDataApi';
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Alert,
  Button,
  Box,
} from '@mui/material';
import { RefreshCw } from 'lucide-react';

interface CountryDropdownProps {
  value?: Country | null;
  onChange: (country: Country | null) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  label?: string;
}

export function CountryDropdown({
  value,
  onChange,
  placeholder = 'Select a country',
  error,
  required = false,
  label = 'Country',
}: CountryDropdownProps) {
  const { data: countries = [], isLoading, isError, refetch } = useGetCountriesQuery();

  return (
    <Box sx={{ width: '100%' }}>
      <Autocomplete
        id="country-autocomplete"
        options={countries}
        getOptionLabel={(option) => option.name}
        value={value || null}
        onChange={(_, newValue) => onChange(newValue)}
        loading={isLoading}
        disabled={isError}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        fullWidth
        sx={{ width: '100%' }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            required={required}
            error={!!error || isError}
            helperText={error}
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        noOptionsText={isLoading ? 'Loading countries...' : 'No countries found'}
      />

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
          Unable to load countries. Please try again.
        </Alert>
      )}
    </Box>
  );
}