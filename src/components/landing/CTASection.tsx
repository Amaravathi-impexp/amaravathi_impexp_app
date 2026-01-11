import { Box, Container, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { ArrowRight, Mail, CheckCircle2, Sparkles, Zap, Shield, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

interface CTASectionProps {
  onGetStarted: () => void;
}

const benefits = [
  'Completely Free Forever',
  'No Hidden Charges',
  'Unlimited Access',
];

const floatingIcons = [
  { Icon: Sparkles, delay: 0, x: '10%', y: '15%' },
  { Icon: Zap, delay: 2, x: '85%', y: '25%' },
  { Icon: Shield, delay: 4, x: '15%', y: '75%' },
];

export function CTASection({ onGetStarted }: CTASectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [email, setEmail] = useState('');

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      }}
    >
      {/* Animated Grid Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Gradient Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}
      />

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            left: x,
            top: y,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Icon
            style={{
              width: 40,
              height: 40,
              color: 'rgba(129, 140, 248, 0.3)',
            }}
          />
        </motion.div>
      ))}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, lg: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', maxWidth: 900, mx: 'auto' }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 3,
                  py: 1,
                  bgcolor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: 50,
                  mb: 4,
                }}
              >
                <Sparkles style={{ width: 16, height: 16, color: '#10b981' }} />
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#10b981',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  100% Free Platform
                </Typography>
              </Box>
            </motion.div>

            {/* Heading */}
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                fontWeight: 900,
                color: 'white',
                mb: 3,
                lineHeight: 1.1,
              }}
            >
              Start Your Trade
              <br />
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Journey Today
              </Box>
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 6,
                lineHeight: 1.6,
                maxWidth: 700,
                mx: 'auto',
              }}
            >
              Join 5,000+ businesses using our completely free platform to streamline their import-export operations
            </Typography>

            {/* Email Signup Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 4,
                  mb: 5,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    maxWidth: 600,
                    mx: 'auto',
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail style={{ color: 'rgba(255, 255, 255, 0.5)', width: 20, height: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#10b981',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        color: 'white',
                        fontSize: '1rem',
                        '&::placeholder': {
                          color: 'rgba(255, 255, 255, 0.5)',
                        },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    onClick={onGetStarted}
                    endIcon={<ArrowRight />}
                    sx={{
                      bgcolor: 'white',
                      color: '#0f172a',
                      px: 4,
                      py: 2,
                      fontSize: '1rem',
                      fontWeight: 700,
                      borderRadius: 2,
                      textTransform: 'none',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 10px 40px rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        bgcolor: '#f1f5f9',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 15px 50px rgba(255, 255, 255, 0.15)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Get Started Free
                  </Button>
                </Box>

                {/* Benefits */}
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 3,
                    mt: 4,
                  }}
                >
                  {benefits.map((benefit, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <CheckCircle2
                        style={{
                          width: 18,
                          height: 18,
                          color: '#10b981',
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontWeight: 500,
                        }}
                      >
                        {benefit}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                  gap: 3,
                  mb: 6,
                }}
              >
                {[
                  { icon: Users, label: '5,000+ Active Users', color: '#3b82f6' },
                  { icon: Shield, label: '100% Secure Platform', color: '#10b981' },
                  { icon: Zap, label: 'Instant Setup', color: '#f59e0b' },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 3,
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.08)',
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <item.icon
                      style={{
                        width: 32,
                        height: 32,
                        color: item.color,
                        marginBottom: 12,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'white',
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  mb: 3,
                }}
              >
                Want to see it in action first?
              </Typography>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                Watch Demo Video
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}