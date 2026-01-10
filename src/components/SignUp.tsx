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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Logo } from './Logo';
import { SimpleFooter } from './SimpleFooter';
import { TopRibbon } from './TopRibbon';
import { useSignUpMutation } from '../store/api/authApi';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/slices/authSlice';

interface SignUpProps {
  onClose: () => void;
  onSwitchToSignIn: () => void;
  onSignUpSuccess: () => void;
}

export function SignUp({ onClose, onSwitchToSignIn, onSignUpSuccess }: SignUpProps) {
  const dispatch = useAppDispatch();
  const [signUp, { isLoading }] = useSignUpMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false,
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
      // Call real API - no fallback
      const response = await signUp({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }).unwrap();
      
      // Show success message
      setSuccessMessage('Account created successfully! Please check your email for verification.');
      
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopRibbon />
      <header className="bg-white shadow-sm sticky top-10 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-24">
            <button onClick={onClose} className="hover:opacity-80 transition-opacity">
              <Logo className="h-[86px]" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Full Name */}
              <TextField
                id="fullName"
                name="fullName"
                type="text"
                label="Full Name"
                placeholder="John Doe"
                required
                fullWidth
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                variant="outlined"
              />

              {/* Email */}
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                autoComplete="email"
                required
                fullWidth
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                variant="outlined"
              />

              {/* Phone */}
              <TextField
                id="phone"
                name="phone"
                type="tel"
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                required
                fullWidth
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                variant="outlined"
              />

              {/* Password */}
              <Box>
                <TextField
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="••••••••"
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
                  helperText="Must be at least 8 characters"
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

              {/* Confirm Password */}
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirm Password"
                placeholder="••••••••"
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

              {/* Terms Checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    id="agreeToTerms"
                    name="agreeToTerms"
                    required
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    I agree to the{' '}
                    <Button variant="text" size="small" sx={{ p: 0, minWidth: 0, textTransform: 'none' }}>
                      Terms of Service
                    </Button>{' '}
                    and{' '}
                    <Button variant="text" size="small" sx={{ p: 0, minWidth: 0, textTransform: 'none' }}>
                      Privacy Policy
                    </Button>
                  </Typography>
                }
              />

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
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Box>

            {/* Sign In Link */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <span className="text-sm text-gray-600">
                Already have an account?{' '}
              </span>
              <Button
                type="button"
                variant="text"
                onClick={onSwitchToSignIn}
                sx={{ textTransform: 'none', p: 0, minWidth: 0 }}
              >
                Sign in
              </Button>
            </Box>
          </Paper>

          {/* Back to Home Link */}
          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
      <SimpleFooter />
    </div>
  );
}
