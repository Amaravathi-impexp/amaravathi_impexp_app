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
import { Ship, FileText, Shield, TrendingUp } from "lucide-react";
import { Logo } from "../../components/common/Logo";
import { SimpleFooter } from "../../components/layout/SimpleFooter";
import { TopRibbon } from "../../components/layout/TopRibbon";
import { useAppDispatch } from "../../store/hooks";
import { setCredentials } from "../../store/slices/authSlice";
import { useSignInMutation } from "../../store/api/authApi";

interface SignInProps {
  onClose: () => void;
  onSwitchToSignUp: () => void;
  onSignInSuccess: () => void;
}

export function SignIn({
  onClose,
  onSwitchToSignUp,
  onSignInSuccess,
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopRibbon />
      <header className="bg-white shadow-sm sticky top-10 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-24">
            <button
              onClick={onClose}
              className="hover:opacity-80 transition-opacity"
            >
              <Logo className="h-[86px]" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Box sx={{ maxWidth: 1200, mx: 'auto', width: '100%', px: { xs: 2, sm: 3, lg: 4 }, mt: { xs: 4, md: 6 } }}>
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              minHeight: { md: 550 },
              boxShadow: 3,
              borderRadius: '12px',
            }}
          >
            {/* Left Side - Features Panel */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flex: 1,
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                borderRadius: '12px 0 0 12px',
                p: 6,
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {/* Feature 1 */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '8px', 
                    p: 1.5,
                    height: 'fit-content',
                  }}>
                    <Ship className="w-6 h-6 text-white" />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                      One Platform. End-to-End Trade
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Manage your entire import-export operations from a single unified platform
                    </Typography>
                  </Box>
                </Box>

                {/* Feature 2 */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '8px', 
                    p: 1.5,
                    height: 'fit-content',
                  }}>
                    <Shield className="w-6 h-6 text-white" />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                      AI-Powered Compliance & Fraud Protection
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Advanced AI verification and risk detection to protect your business
                    </Typography>
                  </Box>
                </Box>

                {/* Feature 3 */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '8px', 
                    p: 1.5,
                    height: 'fit-content',
                  }}>
                    <FileText className="w-6 h-6 text-white" />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                      Smart Documents. Zero Guesswork
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Automated document processing with intelligent verification
                    </Typography>
                  </Box>
                </Box>

                {/* Feature 4 */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '8px', 
                    p: 1.5,
                    height: 'fit-content',
                  }}>
                    <TrendingUp className="w-6 h-6 text-white" />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                      Real-Time Analytics & Trade Visibility
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Track and analyze your shipments with comprehensive real-time insights
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Right Side - Sign In Form */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <Paper 
                elevation={0}
                sx={{ 
                  p: { xs: 3, sm: 4, md: 5 }, 
                  width: '100%',
                  maxWidth: 480,
                  bgcolor: { xs: 'white', md: 'transparent' },
                  boxShadow: { xs: 3, md: 0 },
                  borderRadius: { xs: '12px', md: '0 12px 12px 0' },
                }}
              >
            {/* Sign In Header */}
            <Box sx={{ mb: 3 }}>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>
                Sign in
              </h2>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox id="remember-me" name="remember-me" />}
                  label="Remember me"
                />
                <Button
                  type="button"
                  variant="text"
                  size="small"
                  sx={{ textTransform: 'none' }}
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
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </Box>

            {/* Sign Up Link */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
              </span>
              <Button
                type="button"
                variant="text"
                onClick={onSwitchToSignUp}
                sx={{ textTransform: 'none', p: 0, minWidth: 0 }}
              >
                Sign up
              </Button>
            </Box>
              </Paper>
            </Box>
          </Box>

          {/* Back to Home Link */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <button
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to home
            </button>
          </Box>
        </Box>
      </div>
      <SimpleFooter />
    </div>
  );
}