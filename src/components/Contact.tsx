import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import {
  TextField,
  Button,
  Alert,
  Box,
  Typography,
  Grid,
  Paper,
  Container,
} from '@mui/material';
import { useState } from 'react';

interface ContactProps {
  onClose: () => void;
  onHomeClick?: () => void;
  onAboutClick?: () => void;
  onCareersClick?: () => void;
  onContactClick?: () => void;
  onSignInClick?: () => void;
  currentView?: string;
}

export function Contact({ onClose, onHomeClick, onAboutClick, onCareersClick, onContactClick, onSignInClick, currentView }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const offices = [
    {
      city: 'Mumbai',
      country: 'India',
      address: '123 Marine Drive, Mumbai 400001',
      phone: '+91 22 1234 5678',
      email: 'mumbai@amaravathi.com'
    },
    {
      city: 'Singapore',
      country: 'Singapore',
      address: '456 Marina Bay, Singapore 018960',
      phone: '+65 6789 0123',
      email: 'singapore@amaravathi.com'
    },
    {
      city: 'Dubai',
      country: 'UAE',
      address: '789 Jebel Ali, Dubai, UAE',
      phone: '+971 4 567 8901',
      email: 'dubai@amaravathi.com'
    },
    {
      city: 'Rotterdam',
      country: 'Netherlands',
      address: '321 Port Avenue, Rotterdam 3011',
      phone: '+31 10 234 5678',
      email: 'rotterdam@amaravathi.com'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white', display: 'flex', flexDirection: 'column' }}>
      <Navigation 
        onSignInClick={onSignInClick}
        onHomeClick={onHomeClick}
        onAboutClick={onAboutClick}
        onCareersClick={onCareersClick}
        onContactClick={onContactClick}
        currentView={currentView}
      />

      <Box component="main" sx={{ flex: 1 }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
            color: 'white',
            py: 10,
          }}
        >
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                mb: 3,
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h5"
              sx={{
                maxWidth: 768,
                fontSize: { xs: '1.125rem', sm: '1.25rem' },
              }}
            >
              Get in touch with our team. We're here to help with all your shipping and logistics needs.
            </Typography>
          </Container>
        </Box>

        {/* Contact Form & Info */}
        <Box sx={{ py: 8, bgcolor: 'white' }}>
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
            <Grid container spacing={6}>
              {/* Contact Form */}
              <Grid size={{ xs: 12, lg: 6 }}>
                <Typography variant="h4" gutterBottom>
                  Send Us a Message
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        required
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="John Doe"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        required
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="john@example.com"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+1 (234) 567-890"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Company Name"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        placeholder="Your Company"
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        required
                        label="Subject"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        placeholder="How can we help?"
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        required
                        label="Message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Tell us more about your needs..."
                      />
                    </Grid>
                  </Grid>

                  {submitted && (
                    <Alert severity="success" sx={{ mt: 3 }}>
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<Send className="w-5 h-5" />}
                    sx={{ mt: 3 }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Grid>

              {/* Contact Information */}
              <Grid size={{ xs: 12, lg: 6 }}>
                <Typography variant="h4" gutterBottom>
                  Get In Touch
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Paper variant="outlined" sx={{ p: 3, display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: 'info.light',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Phone className="w-6 h-6 text-blue-600" />
                    </Box>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Phone
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        +1 (234) 567-890
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Available 24/7
                      </Typography>
                    </Box>
                  </Paper>

                  <Paper variant="outlined" sx={{ p: 3, display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: 'info.light',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Mail className="w-6 h-6 text-blue-600" />
                    </Box>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Email
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        info@amaravathi.com
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        support@amaravathi.com
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}