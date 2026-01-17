import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, TextField, Button } from '@mui/material';
import { Navigation } from '../../components/layout/Navigation';
import { Footer } from '../../components/layout/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface ContactProps {
  onClose: () => void;
  onSignInClick: () => void;
  onHomeClick: () => void;
  onAboutClick: () => void;
  onCareersClick: () => void;
  onContactClick: () => void;
  currentView: string;
}

export function Contact({
  onClose,
  onSignInClick,
  onHomeClick,
  onAboutClick,
  onCareersClick,
  onContactClick,
  currentView,
}: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Navigation
        onSignInClick={onSignInClick}
        onHomeClick={onHomeClick}
        onAboutClick={onAboutClick}
        onCareersClick={onCareersClick}
        onContactClick={onContactClick}
        currentView={currentView}
      />

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#1A3D32',
          color: 'white',
          py: { xs: 8, md: 12 },
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 3,
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              color: '#D3FF62',
              maxWidth: '800px',
            }}
          >
            Get in touch with our team - we're here to help
          </Typography>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#1A3D32',
                mb: 4,
              }}
            >
              Get in Touch
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: '#F8FAF6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Mail size={20} color="#1A3D32" />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: '#1A3D32',
                      mb: 0.5,
                    }}
                  >
                    Email
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#3D7A68',
                    }}
                  >
                    support@timpex.club
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: '#F8FAF6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={20} color="#1A3D32" />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: '#1A3D32',
                      mb: 0.5,
                    }}
                  >
                    Phone
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#3D7A68',
                    }}
                  >
                    +91 40 1234 5678
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: '#F8FAF6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={20} color="#1A3D32" />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: '#1A3D32',
                      mb: 0.5,
                    }}
                  >
                    Office
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#3D7A68',
                    }}
                  >
                    HITEC City, Hyderabad
                    <br />
                    Telangana, India - 500081
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#F8FAF6',
                border: '1px solid #D3FF62',
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: '#1A3D32',
                  mb: 1,
                }}
              >
                Business Hours
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#3D7A68',
                  lineHeight: 1.8,
                }}
              >
                Monday - Friday: 9:00 AM - 6:00 PM IST
                <br />
                Saturday: 10:00 AM - 2:00 PM IST
                <br />
                Sunday: Closed
              </Typography>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                border: '1px solid #E5E7EB',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  color: '#1A3D32',
                  mb: 4,
                }}
              >
                Send us a Message
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#1A3D32',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#1A3D32',
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#1A3D32',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#1A3D32',
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#1A3D32',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#1A3D32',
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={6}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#1A3D32',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#1A3D32',
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<Send size={18} />}
                      sx={{
                        bgcolor: '#1A3D32',
                        color: '#D3FF62',
                        px: 5,
                        py: 1.5,
                        fontSize: '1rem',
                        '&:hover': {
                          bgcolor: '#2A5042',
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}