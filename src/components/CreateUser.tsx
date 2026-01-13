import { useState } from 'react';
import {
  TextField,
  Button,
  Alert,
  Box,
  Paper,
  Typography,
  MenuItem,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import {
  User,
  Mail,
  Phone,
  Shield,
  Globe,
  Package,
  Lock,
  Bell,
  Smartphone,
  UserPlus,
} from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { useCreateUserMutation } from '../store/api/usersApi';
import { useGetCountriesQuery, useGetProductTypesQuery, useGetRolesQuery } from '../store/api/formDataApi';

interface CreateUserProps {
  onBack: () => void;
}

export function CreateUser({ onBack }: CreateUserProps) {
  const [createUser, { isLoading }] = useCreateUserMutation();
  
  // Fetch form data from APIs with caching
  const { data: countries = [], isLoading: countriesLoading } = useGetCountriesQuery();
  const { data: productTypes = [], isLoading: productTypesLoading } = useGetProductTypesQuery();
  const { data: roles = [], isLoading: rolesLoading } = useGetRolesQuery();
  
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    roleId: '',
    phone: '',
    originCountryId: '',
    destinationCountryId: '',
    productTypeId: '',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const originCountryId = formData.originCountryId;
      const destinationCountryId = formData.destinationCountryId;
      const productTypeId = formData.productTypeId;
      const roleId = formData.roleId;
      
      if (!originCountryId || !destinationCountryId || !productTypeId || !roleId) {
        setError('Please fill in all required fields');
        return;
      }
      
      // Find the role code from the selected role ID
      const selectedRole = roles.find(r => r.id === roleId);
      if (!selectedRole) {
        setError('Invalid role selected');
        return;
      }
      
      await createUser({
        email: formData.email,
        phone: formData.phone,
        fullName: formData.fullName,
        password: formData.password,
        originCountryId,
        destinationCountryId,
        productTypeId,
        roles: [selectedRole],
        emailNotificationEnabled: formData.notifications.email,
        phoneNotificationEnabled: formData.notifications.sms,
        appNotificationEnabled: formData.notifications.push,
      }).unwrap();
      
      // Success - go back to users list
      onBack();
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || 'Failed to create user. Please try again.';
      setError(errorMessage);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }));
  };

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Admin', onClick: onBack },
          { label: 'Users', onClick: onBack },
          { label: 'Create User' },
        ]}
      />

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: '1200px' }}>
        {/* Error Message */}
        {error && (
          <Alert severity="error" onClose={() => setError('')} sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {/* Personal Information Card */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ p: 1.5, bgcolor: 'primary.lighter', borderRadius: 2 }}>
                <User className="w-5 h-5" style={{ color: '#1A3D32' }} />
              </Box>
              <Box>
                <Typography variant="h6">Personal Information</Typography>
                <Typography variant="body2" color="text.secondary">
                  Basic details about the user
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              {/* Full Name */}
              <TextField
                id="fullName"
                name="fullName"
                label="Full Name"
                required
                fullWidth
                value={formData.fullName}
                onChange={handleChange}
              />

              {/* Email */}
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                required
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />

              {/* Password */}
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                required
                fullWidth
                value={formData.password}
                onChange={handleChange}
              />

              {/* Phone */}
              <TextField
                id="phone"
                name="phone"
                type="tel"
                label="Phone"
                required
                fullWidth
                value={formData.phone}
                onChange={handleChange}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Role & Permissions Card */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ p: 1.5, bgcolor: 'secondary.lighter', borderRadius: 2 }}>
                <Shield className="w-5 h-5" style={{ color: '#3D7A68' }} />
              </Box>
              <Box>
                <Typography variant="h6">Role & Permissions</Typography>
                <Typography variant="body2" color="text.secondary">
                  Define user access level
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              {/* Role */}
              <TextField
                id="roleId"
                name="roleId"
                select
                label="Role"
                required
                fullWidth
                value={formData.roleId}
                onChange={handleChange}
                disabled={rolesLoading}
              >
                <MenuItem value="">Select role</MenuItem>
                {roles.map(role => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Role Description */}
            {formData.roleId && (
              <Paper variant="outlined" sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Role Permissions:</strong>{' '}
                  {roles.find(role => role.id === formData.roleId)?.description}
                </Typography>
              </Paper>
            )}
          </CardContent>
        </Card>

        {/* Route Information Card */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ p: 1.5, bgcolor: 'info.lighter', borderRadius: 2 }}>
                <Globe className="w-5 h-5 text-teal-600" />
              </Box>
              <Box>
                <Typography variant="h6">Route Information</Typography>
                <Typography variant="body2" color="text.secondary">
                  Specify origin and destination countries
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              {/* Origin Country */}
              <TextField
                id="originCountryId"
                name="originCountryId"
                select
                label="Origin Country"
                required
                fullWidth
                value={formData.originCountryId}
                onChange={handleChange}
                disabled={countriesLoading}
              >
                <MenuItem value="">Select origin country</MenuItem>
                {countries.map(country => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>

              {/* Destination Country */}
              <TextField
                id="destinationCountryId"
                name="destinationCountryId"
                select
                label="Destination Country"
                required
                fullWidth
                value={formData.destinationCountryId}
                onChange={handleChange}
                disabled={countriesLoading}
              >
                <MenuItem value="">Select destination country</MenuItem>
                {countries.map(country => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </CardContent>
        </Card>

        {/* Product Information Card */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ p: 1.5, bgcolor: 'warning.lighter', borderRadius: 2 }}>
                <Package className="w-5 h-5 text-orange-600" />
              </Box>
              <Box>
                <Typography variant="h6">Product Information</Typography>
                <Typography variant="body2" color="text.secondary">
                  Select the product type
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              {/* Product Name */}
              <TextField
                id="productTypeId"
                name="productTypeId"
                select
                label="Product Type"
                required
                fullWidth
                value={formData.productTypeId}
                onChange={handleChange}
                disabled={productTypesLoading}
              >
                <MenuItem value="">Select product type</MenuItem>
                {productTypes.map(product => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </CardContent>
        </Card>

        {/* Notification Preferences Card */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ p: 1.5, bgcolor: 'success.lighter', borderRadius: 2 }}>
                <Bell className="w-5 h-5 text-green-600" />
              </Box>
              <Box>
                <Typography variant="h6">Notification Preferences</Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose how the user receives updates
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
              {/* Email Notifications */}
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main' },
                  transition: 'border-color 0.2s',
                }}
                onClick={() => handleCheckboxChange('email', !formData.notifications.email)}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.notifications.email}
                      onChange={(e) => handleCheckboxChange('email', e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  }
                  label={
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Mail className="w-4 h-4 text-gray-400" />
                        <Typography variant="body2">Email</Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Shipment updates & reports
                      </Typography>
                    </Box>
                  }
                />
              </Paper>

              {/* SMS Notifications */}
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main' },
                  transition: 'border-color 0.2s',
                }}
                onClick={() => handleCheckboxChange('sms', !formData.notifications.sms)}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.notifications.sms}
                      onChange={(e) => handleCheckboxChange('sms', e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  }
                  label={
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Smartphone className="w-4 h-4 text-gray-400" />
                        <Typography variant="body2">SMS</Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Critical alerts via text
                      </Typography>
                    </Box>
                  }
                />
              </Paper>

              {/* Push Notifications */}
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main' },
                  transition: 'border-color 0.2s',
                }}
                onClick={() => handleCheckboxChange('push', !formData.notifications.push)}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.notifications.push}
                      onChange={(e) => handleCheckboxChange('push', e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  }
                  label={
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Bell className="w-4 h-4 text-gray-400" />
                        <Typography variant="body2">Push</Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Real-time in-app updates
                      </Typography>
                    </Box>
                  }
                />
              </Paper>
            </Box>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={onBack}
            disabled={isLoading}
            size="large"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            size="large"
            startIcon={isLoading ? <CircularProgress size={20} /> : <UserPlus className="w-5 h-5" />}
          >
            {isLoading ? 'Creating...' : 'Create User'}
          </Button>
        </Box>
      </Box>
    </div>
  );
}