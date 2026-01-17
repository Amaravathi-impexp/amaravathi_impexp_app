import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox,
  Paper,
  Snackbar,
  Alert as MuiAlert,
  AlertTitle,
  CircularProgress,
} from '@mui/material';
import { User, Mail, Shield, Globe, Package, Bell, Smartphone, Save } from 'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateUser as updateUserAction } from '../../store/slices/authSlice';
import { logger } from '../../utils/logger';
import { useUpdateUserProfileMutation } from '../../store/api/userApi';
import { RoleDropdown } from '../../components/common/RoleDropdown';
import { CountryDropdown } from '../../components/common/CountryDropdown';
import { ProductTypeDropdown } from '../../components/common/ProductTypeDropdown';
import type { Role, Country, ProductType } from '../../store/api/referenceDataApi';

export function Settings() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Failed to update settings. Please try again.');
  const [formData, setFormData] = useState<{
    email: string;
    fullName: string;
    phone: string;
    cell: string;
    role: Role | null;
    originCountry: Country | null;
    destinationCountry: Country | null;
    product: ProductType | null;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  }>({
    email: '',
    fullName: '',
    phone: '',
    cell: '',
    role: null,
    originCountry: null,
    destinationCountry: null,
    product: null,
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  });

  // Load user data from Redux
  useEffect(() => {
    if (currentUser) {
      setFormData({
        email: currentUser.email || '',
        fullName: currentUser.fullName || '',
        phone: currentUser.phone || '+1-555-0000',
        cell: currentUser.phone || '+1-555-0001',
        role: (currentUser.roles && currentUser.roles.length > 0 ? currentUser.roles[0] : null) as Role | null,
        originCountry: (currentUser.originCountry || null) as Country | null,
        destinationCountry: (currentUser.destinationCountry || null) as Country | null,
        product: (currentUser.productType || null) as ProductType | null,
        notifications: {
          email: (currentUser as any).emailNotificationEnabled ?? true,
          sms: (currentUser as any).phoneNotificationEnabled ?? false,
          push: (currentUser as any).appNotificationEnabled ?? true,
        },
      });
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setErrorMessage('User not found. Please sign in again.');
      setShowError(true);
      return;
    }

    // Validate required fields
    if (!formData.role) {
      setErrorMessage('Please select a role');
      setShowError(true);
      return;
    }
    if (!formData.originCountry) {
      setErrorMessage('Please select an origin country');
      setShowError(true);
      return;
    }
    if (!formData.destinationCountry) {
      setErrorMessage('Please select a destination country');
      setShowError(true);
      return;
    }
    if (!formData.product) {
      setErrorMessage('Please select a product type');
      setShowError(true);
      return;
    }

    try {
      const response = await updateUserProfile({
        userId: currentUser.id,
        data: {
          originCountryId: formData.originCountry.id,
          destinationCountryId: formData.destinationCountry.id,
          productTypeId: formData.product.id,
          roles: [formData.role],
          emailNotificationEnabled: formData.notifications.email,
          phoneNotificationEnabled: formData.notifications.sms,
          appNotificationEnabled: formData.notifications.push,
        },
      }).unwrap();

      // Update Redux state with the response
      dispatch(updateUserAction({
        status: response.status,
        originCountry: response.originCountry,
        destinationCountry: response.destinationCountry,
        productType: response.productType,
        roles: response.roles,
        notifications: {
          email: response.emailNotificationEnabled,
          sms: response.phoneNotificationEnabled,
          push: response.appNotificationEnabled,
        },
      } as any));

      setShowSuccess(true);
    } catch (error: any) {
      logger.error('Failed to update user profile', { error, userId: currentUser.id });
      setErrorMessage(error?.data?.message || 'Failed to update settings. Please try again.');
      setShowError(true);
    }
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
          { label: 'Settings' },
        ]}
      />

      {/* Profile Setup Alert for CREATED status users */}
      {currentUser?.status === 'CREATED' && (
        <MuiAlert 
          severity="warning" 
          sx={{ 
            mt: 3, 
            mb: 3,
            maxWidth: '1200px',
          }}
        >
          <AlertTitle>Complete Your Profile Setup</AlertTitle>
          Welcome! To get started with TIMPEX.club, please complete your profile by selecting your <strong>role</strong>, <strong>origin country</strong>, <strong>destination country</strong>, and <strong>product type</strong> below. This information helps us personalize your experience.
        </MuiAlert>
      )}

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: '1200px' }}>
        {/* Personal Information Card - Non-Editable */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ p: 1.5, bgcolor: 'primary.lighter', borderRadius: 2 }}>
                <User className="w-5 h-5" style={{ color: '#1A3D32' }} />
              </Box>
              <Box>
                <Typography variant="h6">Personal Information</Typography>
                <Typography variant="body2" color="text.secondary">
                  Your basic account details (non-editable)
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              {/* Full Name */}
              <TextField
                id="name"
                name="name"
                label="Full Name"
                value={formData.fullName}
                disabled
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />

              {/* Email */}
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                value={formData.email}
                disabled
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />

              {/* Phone Number */}
              <TextField
                id="phone"
                name="phone"
                type="tel"
                label="Phone Number"
                value={formData.phone}
                disabled
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
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
                  Update your user role
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              {/* Role */}
              <RoleDropdown
                value={formData.role}
                onChange={(role) => setFormData(prev => ({ ...prev, role }))}
                placeholder="Select a role"
                label="Role"
                required
              />
            </Box>

            {/* Role Description */}
            {formData.role && (
              <Paper variant="outlined" sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Selected Role:</strong> {formData.role.name}
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
              <CountryDropdown
                value={formData.originCountry}
                onChange={(country) => setFormData(prev => ({ ...prev, originCountry: country }))}
                placeholder="Select origin country"
                label="Origin Country"
                required
              />

              {/* Destination Country */}
              <CountryDropdown
                value={formData.destinationCountry}
                onChange={(country) => setFormData(prev => ({ ...prev, destinationCountry: country }))}
                placeholder="Select destination country"
                label="Destination Country"
                required
              />
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
              {/* Product Type */}
              <ProductTypeDropdown
                value={formData.product}
                onChange={(product) => setFormData(prev => ({ ...prev, product }))}
                placeholder="Select a product type"
                label="Product Type"
                required
              />
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
                  Choose how you receive updates
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

        {/* Action Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<Save className="w-5 h-5" />}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
          </Button>
        </Box>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert severity="success" onClose={() => setShowSuccess(false)} sx={{ width: '100%' }}>
          <AlertTitle>Success</AlertTitle>
          Settings updated successfully!
        </MuiAlert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert severity="error" onClose={() => setShowError(false)} sx={{ width: '100%' }}>
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
