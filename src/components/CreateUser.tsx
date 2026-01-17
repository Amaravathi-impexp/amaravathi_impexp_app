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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  IconButton,
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
  Eye,
  EyeOff,
  Check,
  X,
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
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [hasPasswordBeenFocused, setHasPasswordBeenFocused] = useState(false);
  
  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  
  // Check if all password requirements are met
  const allPasswordRequirementsMet = 
    passwordValidation.minLength &&
    passwordValidation.hasUppercase &&
    passwordValidation.hasLowercase &&
    passwordValidation.hasNumber &&
    passwordValidation.hasSpecialChar;
  
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

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
    setHasPasswordBeenFocused(true);
    console.log('Password focused, hasPasswordBeenFocused set to true');
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
    console.log('Password blurred');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setFormData(prev => ({
      ...prev,
      password
    }));
    
    // Validate password
    const validation = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%&*_\-.]/.test(password),
    };
    
    setPasswordValidation(validation);
    console.log('Password validation:', validation);
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

              {/* Password - Full Width with Requirements Below */}
              <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
                <TextField
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  required
                  fullWidth
                  value={formData.password}
                  onChange={(e) => {
                    handlePasswordChange(e);
                  }}
                  onFocus={() => {
                    setPasswordFocused(true);
                    setHasPasswordBeenFocused(true);
                    console.log('Password focused, hasPasswordBeenFocused set to true');
                  }}
                  onBlur={() => {
                    setPasswordFocused(false);
                    console.log('Password blurred');
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Password Requirements - Debug */}
                {console.log('hasPasswordBeenFocused:', hasPasswordBeenFocused)}
                
                {/* Password Requirements */}
                {hasPasswordBeenFocused && (
                  <Paper variant="outlined" sx={{ mt: 2, p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                      Password must contain:
                    </Typography>
                    <List dense disablePadding>
                      <ListItem disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          {passwordValidation.minLength ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-gray-400" />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary="Minimum 8 characters"
                          primaryTypographyProps={{
                            variant: 'caption',
                            color: passwordValidation.minLength ? 'success.main' : 'text.secondary'
                          }}
                        />
                      </ListItem>
                      <ListItem disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          {passwordValidation.hasUppercase ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-gray-400" />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary="1 uppercase letter"
                          primaryTypographyProps={{
                            variant: 'caption',
                            color: passwordValidation.hasUppercase ? 'success.main' : 'text.secondary'
                          }}
                        />
                      </ListItem>
                      <ListItem disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          {passwordValidation.hasLowercase ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-gray-400" />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary="1 lowercase letter"
                          primaryTypographyProps={{
                            variant: 'caption',
                            color: passwordValidation.hasLowercase ? 'success.main' : 'text.secondary'
                          }}
                        />
                      </ListItem>
                      <ListItem disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          {passwordValidation.hasNumber ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-gray-400" />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary="1 number"
                          primaryTypographyProps={{
                            variant: 'caption',
                            color: passwordValidation.hasNumber ? 'success.main' : 'text.secondary'
                          }}
                        />
                      </ListItem>
                      <ListItem disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          {passwordValidation.hasSpecialChar ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-gray-400" />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary="1 special character (! @ # $ % & * _ - .)"
                          primaryTypographyProps={{
                            variant: 'caption',
                            color: passwordValidation.hasSpecialChar ? 'success.main' : 'text.secondary'
                          }}
                        />
                      </ListItem>
                    </List>
                  </Paper>
                )}
              </Box>

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
            disabled={isLoading || !allPasswordRequirementsMet}
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