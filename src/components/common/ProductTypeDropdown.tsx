import { useGetProductTypesQuery, ProductType } from '../../store/api/referenceDataApi';
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
  Typography,
} from '@mui/material';
import { RefreshCw } from 'lucide-react';

interface ProductTypeDropdownProps {
  value?: ProductType | null;
  onChange: (productType: ProductType | null) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  label?: string;
}

export function ProductTypeDropdown({
  value,
  onChange,
  placeholder = 'Select a product type',
  error,
  required = false,
  label = 'Product Type',
}: ProductTypeDropdownProps) {
  const { data: productTypes = [], isLoading, isError, refetch } = useGetProductTypesQuery();

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl fullWidth error={!!error || isError} required={required} sx={{ width: '100%' }}>
        <InputLabel id="product-type-select-label">{label}</InputLabel>
        <Select
          labelId="product-type-select-label"
          id="product-type-select"
          value={value?.id || ''}
          label={label}
          onChange={(e) => {
            const selectedType = productTypes.find((pt) => pt.id === e.target.value) || null;
            onChange(selectedType);
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
          renderValue={(selectedId) => {
            const selected = productTypes.find((pt) => pt.id === selectedId);
            return selected?.name || '';
          }}
        >
          {!isLoading && productTypes.length === 0 && (
            <MenuItem disabled value="">
              <em>No product types available</em>
            </MenuItem>
          )}
          {productTypes.map((productType) => (
            <MenuItem key={productType.id} value={productType.id}>
              <Box>
                <Typography variant="body1">{productType.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  HS: {productType.hs_code}
                </Typography>
              </Box>
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
          Unable to load product types. Please try again.
        </Alert>
      )}
    </Box>
  );
}
