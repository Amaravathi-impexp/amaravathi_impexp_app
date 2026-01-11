import { Box, Container, Typography, Paper, Avatar, AvatarGroup } from '@mui/material';
import { 
  Zap, 
  Globe, 
  Clock, 
  TrendingUp, 
  Shield, 
  Users, 
  Star,
  CheckCircle2,
  Sparkles,
  Award,
  Target,
  Rocket
} from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

const impactStats = [
  {
    icon: Globe,
    value: '130+',
    label: 'Countries Connected',
    description: 'Global trade network',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  },
  {
    icon: Clock,
    value: '60%',
    label: 'Faster Processing',
    description: 'Save time on every shipment',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  {
    icon: TrendingUp,
    value: '$2.3B',
    label: 'Trade Volume',
    description: 'Processed this year',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  },
  {
    icon: Users,
    value: '5,000+',
    label: 'Active Traders',
    description: 'Growing community',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
];

const achievements = [
  {
    icon: Award,
    title: 'Best Trade Platform 2024',
    organization: 'Global Trade Awards',
    color: '#f59e0b',
  },
  {
    icon: Star,
    title: 'Top Rated Solution',
    organization: '4.9/5 from 1,200+ reviews',
    color: '#eab308',
  },
  {
    icon: Target,
    title: '99.9% Uptime',
    organization: 'Enterprise Reliability',
    color: '#10b981',
  },
  {
    icon: Rocket,
    title: 'Fastest Growing',
    organization: 'Logistics Tech 2024',
    color: '#6366f1',
  },
];

const testimonialAvatars = [
  { name: 'Michael Chen', bg: '#3b82f6' },
  { name: 'Sarah Johnson', bg: '#10b981' },
  { name: 'David Kumar', bg: '#8b5cf6' },
  { name: 'Emily Wong', bg: '#f59e0b' },
  { name: 'James Smith', bg: '#ec4899' },
];

export function TrustBadges() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)',
      }}
    >
      {/* Animated Grid Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Gradient Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '-5%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '-5%',
          width: 450,
          height: 450,
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, lg: 4 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 3,
                py: 1,
                bgcolor: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: 50,
                mb: 3,
              }}
            >
              <Sparkles style={{ width: 16, height: 16, color: '#6366f1' }} />
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#6366f1',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Trusted Globally
              </Typography>
            </Box>

            {/* Heading */}
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                fontWeight: 900,
                color: '#0f172a',
                mb: 3,
                lineHeight: 1.1,
              }}
            >
              Making Global Trade
              <br />
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Simple & Accessible
              </Box>
            </Typography>

            {/* Subtitle */}
            <Typography
              sx={{
                fontSize: { xs: '1.125rem', md: '1.375rem' },
                color: '#64748b',
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.6,
                mb: 4,
              }}
            >
              Join thousands of businesses transforming their import-export operations with our free, powerful platform
            </Typography>

            {/* Social Proof */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AvatarGroup max={5} sx={{ '& .MuiAvatar-root': { width: 40, height: 40, fontSize: '0.875rem' } }}>
                  {testimonialAvatars.map((avatar, index) => (
                    <Avatar
                      key={index}
                      sx={{
                        bgcolor: avatar.bg,
                        border: '2px solid white',
                      }}
                    >
                      {avatar.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                  ))}
                </AvatarGroup>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>
                    5,000+ traders
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} style={{ width: 14, height: 14, fill: '#eab308', color: '#eab308' }} />
                    ))}
                    <Typography sx={{ fontSize: '0.75rem', color: '#64748b', ml: 0.5 }}>
                      4.9/5
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  width: 1,
                  height: 40,
                  bgcolor: '#e2e8f0',
                }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckCircle2 style={{ width: 28, height: 28, color: 'white' }} />
                </Box>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>
                    Verified Platform
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>
                    ISO 9001 Certified
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* Impact Stats Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 3,
            mb: 6,
          }}
        >
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: '#e2e8f0',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 60px ${stat.color}20`,
                    borderColor: stat.color,
                    '& .stat-icon': {
                      transform: 'scale(1.1) rotate(-5deg)',
                    },
                  },
                }}
              >
                {/* Background Gradient */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    background: stat.gradient,
                    borderRadius: '50%',
                    opacity: 0.1,
                    transition: 'opacity 0.3s ease',
                  }}
                />

                {/* Icon */}
                <Box
                  className="stat-icon"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 64,
                    height: 64,
                    borderRadius: 3,
                    background: stat.gradient,
                    mb: 3,
                    transition: 'transform 0.3s ease',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <stat.icon style={{ width: 32, height: 32, color: 'white' }} strokeWidth={2.5} />
                </Box>

                {/* Value */}
                <Typography
                  sx={{
                    fontSize: { xs: '2.25rem', md: '2.75rem' },
                    fontWeight: 900,
                    color: '#0f172a',
                    mb: 0.5,
                    lineHeight: 1,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {stat.value}
                </Typography>

                {/* Label */}
                <Typography
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    mb: 1,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {stat.label}
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {stat.description}
                </Typography>
              </Paper>
            </motion.div>
          ))}
        </Box>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              border: '1px solid #e2e8f0',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Typography
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 800,
                  color: '#0f172a',
                  mb: 1,
                }}
              >
                Award-Winning Platform
              </Typography>
              <Typography
                sx={{
                  fontSize: '1rem',
                  color: '#64748b',
                }}
              >
                Recognized by industry leaders worldwide
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
                gap: 4,
              }}
            >
              {achievements.map((achievement, index) => (
                <Box
                  key={index}
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'white',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      bgcolor: `${achievement.color}15`,
                      mb: 2,
                    }}
                  >
                    <achievement.icon
                      style={{
                        width: 36,
                        height: 36,
                        color: achievement.color,
                      }}
                      strokeWidth={2.5}
                    />
                  </Box>

                  {/* Title */}
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      mb: 0.5,
                    }}
                  >
                    {achievement.title}
                  </Typography>

                  {/* Organization */}
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: '#64748b',
                    }}
                  >
                    {achievement.organization}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </motion.div>

        {/* Bottom CTA */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                color: '#64748b',
                mb: 1,
              }}
            >
              Join the growing community of successful traders
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                flexWrap: 'wrap',
              }}
            >
              <Zap style={{ width: 20, height: 20, color: '#6366f1' }} />
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#6366f1',
                }}
              >
                Free Forever
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', color: '#cbd5e1' }}>•</Typography>
              <Shield style={{ width: 20, height: 20, color: '#10b981' }} />
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#10b981',
                }}
              >
                100% Secure
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', color: '#cbd5e1' }}>•</Typography>
              <Rocket style={{ width: 20, height: 20, color: '#f59e0b' }} />
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#f59e0b',
                }}
              >
                Instant Setup
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}