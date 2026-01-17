import { Check, X } from 'lucide-react';
import { useState } from 'react';
import {
  TextField,
  Button,
  Alert,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Navigation } from '../../components/layout/Navigation';
import { Footer } from '../../components/layout/Footer';
import { useSignUpMutation } from '../../store/api/authApi';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from '../../store/slices/authSlice';

interface SignUpProps {
  onClose: () => void;
  onSwitchToSignIn: () => void;
  onSignUpSuccess: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
}

export function SignUp({ onClose, onSwitchToSignIn, onSignUpSuccess, onAboutClick, onContactClick }: SignUpProps) {
  const dispatch = useAppDispatch();
  const [signUp, { isLoading }] = useSignUpMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    language: '',
    profileType: '',
    primaryInterest: '',
    tradingExperience: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToComms: false,
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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

  // Check if all required fields are filled and consent is given
  const isFormValid = 
    formData.fullName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.country !== '' &&
    formData.city.trim() !== '' &&
    formData.password !== '' &&
    formData.confirmPassword !== '' &&
    formData.agreeToTerms &&
    allPasswordRequirementsMet;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }
    
    try {
      // Call real API with all required fields
      const response = await signUp({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        residenceCountry: formData.country,
        city: formData.city,
        preferredLanguage: formData.language || 'Both',
        occupation: formData.profileType || 'Working Professional',
        interest: formData.primaryInterest || 'Both',
        previousTradingExposure: formData.tradingExperience || 'Beginner',
        termsAccepted: formData.agreeToTerms,
        communicationConsent: formData.agreeToComms,
      }).unwrap();
      
      // Show success message from API
      setSuccessMessage(response.message || 'Account created successfully! Please check your email for verification.');
      
      // Optionally redirect to sign in after a delay
      setTimeout(() => {
        onSwitchToSignIn();
      }, 2000);
    } catch (err: any) {
      // Handle API errors - no console.log of error details
      const errorMessage = err?.data?.message || err?.message || 'Sign-up failed. Please try again.';
      setError(errorMessage);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%&*_\-.]/.test(password);
    
    setPasswordValidation({
      minLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <Navigation 
        onHomeClick={onClose}
        onAboutClick={onAboutClick}
        onContactClick={onContactClick}
        currentView="signup"
        hideAuthButton={true}
      />

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
        <Box sx={{ width: '100%', maxWidth: 700, px: 3 }}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 5, 
              borderRadius: 3,
              bgcolor: 'white',
              border: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            {/* Enroll Header */}
            <Box sx={{ mb: 3 }}>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 600, margin: 0, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                Create Your TIMPEX.club Account
              </h2>
              <p style={{ fontSize: '1rem', margin: 0, color: '#6b7280' }}>
                Register to access the Telugu Import Export Club platform.
              </p>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Section A: Basic Details */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a' }}>
                  A. Basic Details
                </Typography>
                
                {/* Full Name */}
                <TextField
                  id="fullName"
                  name="fullName"
                  type="text"
                  label="Full Name"
                  placeholder="Enter your full name"
                  required
                  fullWidth
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2.5 }}
                />

                {/* Email */}
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="your.email@example.com"
                  autoComplete="email"
                  required
                  fullWidth
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2.5 }}
                />

                {/* Mobile / WhatsApp Number */}
                <TextField
                  id="phone"
                  name="phone"
                  type="tel"
                  label="Mobile / WhatsApp Number"
                  placeholder="+1 234 567 8901"
                  required
                  fullWidth
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2.5 }}
                />

                {/* Country and City */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2.5 }}>
                  <FormControl fullWidth required>
                    <InputLabel>Country of Residence</InputLabel>
                    <Select
                      value={formData.country}
                      onChange={(e) => handleChange('country', e.target.value)}
                      label="Country of Residence"
                    >
                      <MenuItem value="US">United States</MenuItem>
                      <MenuItem value="UK">United Kingdom</MenuItem>
                      <MenuItem value="CA">Canada</MenuItem>
                      <MenuItem value="AU">Australia</MenuItem>
                      <MenuItem value="IN">India</MenuItem>
                      <MenuItem value="SG">Singapore</MenuItem>
                      <MenuItem value="AE">UAE</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="city"
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                    required
                    fullWidth
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    variant="outlined"
                  />
                </Box>

                {/* Preferred Language */}
                <FormControl fullWidth>
                  <InputLabel>Preferred Language</InputLabel>
                  <Select
                    value={formData.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    label="Preferred Language"
                  >
                    <MenuItem value="telugu">Telugu</MenuItem>
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="both">Both</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Section B: Profile Information */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a' }}>
                  B. Profile Information
                </Typography>
                
                {/* You are a: */}
                <FormControl fullWidth sx={{ mb: 2.5 }}>
                  <InputLabel>You are a:</InputLabel>
                  <Select
                    value={formData.profileType}
                    onChange={(e) => handleChange('profileType', e.target.value)}
                    label="You are a:"
                  >
                    <MenuItem value="working_professional">Working Professional</MenuItem>
                    <MenuItem value="homemaker">Homemaker</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="business_owner">Business Owner</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>

                {/* Primary Interest */}
                <FormControl fullWidth sx={{ mb: 2.5 }}>
                  <InputLabel>Primary Interest:</InputLabel>
                  <Select
                    value={formData.primaryInterest}
                    onChange={(e) => handleChange('primaryInterest', e.target.value)}
                    label="Primary Interest:"
                  >
                    <MenuItem value="import">Import</MenuItem>
                    <MenuItem value="export">Export</MenuItem>
                    <MenuItem value="both">Both</MenuItem>
                    <MenuItem value="exploring">Exploring / Not sure</MenuItem>
                  </Select>
                </FormControl>

                {/* Previous exposure to trading */}
                <FormControl fullWidth>
                  <InputLabel>Previous exposure to trading:</InputLabel>
                  <Select
                    value={formData.tradingExperience}
                    onChange={(e) => handleChange('tradingExperience', e.target.value)}
                    label="Previous exposure to trading:"
                  >
                    <MenuItem value="none">None</MenuItem>
                    <MenuItem value="beginner">Beginner</MenuItem>
                    <MenuItem value="some">Some experience</MenuItem>
                    <MenuItem value="experienced">Experienced</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Section C: Account Setup */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a' }}>
                  C. Account Setup
                </Typography>
                
                {/* Create Password */}
                <TextField
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Create Password"
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  required
                  fullWidth
                  value={formData.password}
                  onChange={(e) => {
                    handleChange('password', e.target.value);
                    validatePassword(e.target.value);
                  }}
                  onFocus={() => {
                    setPasswordFocused(true);
                    setHasPasswordBeenFocused(true);
                  }}
                  onBlur={() => setPasswordFocused(false)}
                  variant="outlined"
                  sx={{ mb: 2.5 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                {/* Password Requirements */}
                {hasPasswordBeenFocused && (
                  <Paper variant="outlined" sx={{ mt: -1.5, mb: 2.5, p: 2, bgcolor: 'grey.50' }}>
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

                {/* Confirm Password */}
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  required
                  fullWidth
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Section D: Consent */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a' }}>
                  D. Consent
                </Typography>
                
                {/* Terms & Conditions Checkbox */}
                <FormControlLabel
                  control={
                    <Checkbox
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
                      sx={{
                        color: 'grey.400',
                        '&.Mui-checked': {
                          color: '#1A3D32',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: '0.875rem', color: 'grey.700' }}>
                      I agree to the Terms & Conditions
                    </Typography>
                  }
                  sx={{ mb: 1.5 }}
                />

                {/* Communications Checkbox */}
                <FormControlLabel
                  control={
                    <Checkbox
                      id="agreeToComms"
                      name="agreeToComms"
                      checked={formData.agreeToComms}
                      onChange={(e) => handleChange('agreeToComms', e.target.checked)}
                      sx={{
                        color: 'grey.400',
                        '&.Mui-checked': {
                          color: '#1A3D32',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: '0.875rem', color: 'grey.700' }}>
                      I consent to receive platform communications via email/WhatsApp
                    </Typography>
                  }
                />
              </Box>

              {/* Error Message */}
              {error && (
                <Alert severity="error" onClose={() => setError('')}>
                  {error}
                </Alert>
              )}

              {/* Success Message */}
              {successMessage && (
                <Alert severity="success" onClose={() => setSuccessMessage('')}>
                  {successMessage}
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading || !isFormValid}
                sx={{
                  mt: 1,
                  py: 1.5,
                  bgcolor: '#1A3D32',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: '#142d25',
                  },
                  '&:disabled': {
                    bgcolor: 'grey.300',
                  }
                }}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Box>

            {/* Login Link */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography component="span" sx={{ fontSize: '0.875rem', color: 'grey.600' }}>
                Already have an account?{' '}
              </Typography>
              <Button
                type="button"
                variant="text"
                onClick={onSwitchToSignIn}
                sx={{ 
                  textTransform: 'none', 
                  p: 0, 
                  minWidth: 0,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#1A3D32',
                  '&:hover': {
                    bgcolor: 'transparent',
                    textDecoration: 'underline',
                  }
                }}
              >
                Login
              </Button>
            </Box>
          </Paper>

          {/* Back to Home Link */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              onClick={onClose}
              variant="text"
              sx={{
                fontSize: '0.875rem',
                color: 'grey.600',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: 'grey.900',
                }
              }}
            >
              ← Back to home
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer hideAuthButtons={true} />
    </Box>
  );
}