import { useState } from "react";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Navigation } from "../../components/layout/Navigation";
import { Footer } from "../../components/layout/Footer";
import { useAppDispatch } from "../../store/hooks";
import { setCredentials } from "../../store/slices/authSlice";
import { useSignInMutation } from "../../store/api/authApi";

interface SignInProps {
  onClose: () => void;
  onSwitchToSignUp: () => void;
  onSignInSuccess: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
}

export function SignIn({
  onClose,
  onSwitchToSignUp,
  onSignInSuccess,
  onAboutClick,
  onContactClick,
}: SignInProps) {
  const dispatch = useAppDispatch();
  const [signIn, { isLoading }] = useSignInMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Call real API - no fallback
      const response = await signIn({
        email,
        password,
      }).unwrap();

      // Store full user profile in Redux
      dispatch(setCredentials(response));

      // Navigate to dashboard
      onSignInSuccess();
    } catch (err: any) {
      // Handle API errors
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "Invalid email or password. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <Navigation 
        onHomeClick={onClose}
        onAboutClick={onAboutClick}
        onContactClick={onContactClick}
        currentView="signin"
        hideAuthButton={true}
      />

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 12, mt: 6 }}>
        <Box sx={{ width: '100%', maxWidth: 440, px: 3 }}>
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
            {/* Login Header */}
            <Box sx={{ mb: 3 }}>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 600, margin: 0, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                Welcome Back
              </h2>
              <p style={{ fontSize: '1rem', margin: 0, color: '#6b7280' }}>
                Login to your TIMPEX.club account
              </p>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {/* Email Field */}
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                autoComplete="email"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                  }
                }}
              />

              {/* Password Field */}
              <TextField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Error Message */}
              {error && (
                <Alert severity="error" onClose={() => setError("")}>
                  {error}
                </Alert>
              )}

              {/* Remember Me & Forgot Password */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      id="remember-me" 
                      name="remember-me"
                      sx={{
                        color: 'grey.400',
                        '&.Mui-checked': {
                          color: '#1A3D32',
                        },
                      }}
                    />
                  }
                  label={<Typography sx={{ fontSize: '0.875rem', color: 'grey.700' }}>Remember me</Typography>}
                />
                <Button
                  type="button"
                  variant="text"
                  size="small"
                  sx={{ 
                    textTransform: 'none',
                    color: '#1A3D32',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: 'transparent',
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Forgot password?
                </Button>
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading}
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
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </Box>

            {/* Enroll Link */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography component="span" sx={{ fontSize: '0.875rem', color: 'grey.600' }}>
                Don't have an account?{" "}
              </Typography>
              <Button
                type="button"
                variant="text"
                onClick={onSwitchToSignUp}
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
                Enroll Now
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