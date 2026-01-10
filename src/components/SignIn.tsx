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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Logo } from "./Logo";
import { SimpleFooter } from "./SimpleFooter";
import { TopRibbon } from "./TopRibbon";
import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store/slices/authSlice";
import { useSignInMutation } from "../store/api/authApi";

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
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Paper elevation={3} sx={{ p: 4 }}>
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
