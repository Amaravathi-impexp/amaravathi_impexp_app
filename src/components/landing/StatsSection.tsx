import { Box, Container, Typography } from '@mui/material';
import { TrendingUp, Globe, Package, Users, Zap, Award, Shield, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const stats = [
  {
    icon: Package,
    value: 50000,
    suffix: '+',
    label: 'Shipments Delivered',
    description: 'Successfully processed worldwide',
    color: '#1A3D32',
    gradient: 'linear-gradient(135deg, #1A3D32 0%, #3D7A68 100%)',
    size: 'large',
  },
  {
    icon: Globe,
    value: 120,
    suffix: '+',
    label: 'Countries',
    description: 'Global reach',
    color: '#3D7A68',
    gradient: 'linear-gradient(135deg, #3D7A68 0%, #2D5A4A 100%)',
    size: 'small',
  },
  {
    icon: Users,
    value: 5000,
    suffix: '+',
    label: 'Active Partners',
    description: 'Trusted network',
    color: '#2D5A4A',
    gradient: 'linear-gradient(135deg, #2D5A4A 0%, #3D7A68 100%)',
    size: 'small',
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: '%',
    label: 'On-Time Delivery',
    description: 'Customer satisfaction rate',
    color: '#D3FF62',
    gradient: 'linear-gradient(135deg, #3D7A68 0%, #D3FF62 100%)',
    size: 'medium',
  },
  {
    icon: Clock,
    value: 24,
    suffix: '/7',
    label: 'Support',
    description: 'Always available',
    color: '#1A3D32',
    gradient: 'linear-gradient(135deg, #1A3D32 0%, #2D5A4A 100%)',
    size: 'small',
  },
  {
    icon: Shield,
    value: 100,
    suffix: '%',
    label: 'Secure',
    description: 'Data protection',
    color: '#3D7A68',
    gradient: 'linear-gradient(135deg, #2D5A4A 0%, #3D7A68 100%)',
    size: 'small',
  },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <Typography
      sx={{
        fontSize: { xs: '2.5rem', md: '3.5rem' },
        fontWeight: 800,
        background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: 1,
      }}
    >
      {count.toLocaleString()}{suffix}
    </Typography>
  );
}

export function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        position: 'relative',
        bgcolor: '#1A3D32', // Updated: Dark Forest Green background
        overflow: 'hidden',
      }}
    >
      {/* Animated Grid Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(61, 122, 104, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(61, 122, 104, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.5,
        }}
      />

      {/* Gradient Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(61, 122, 104, 0.2) 0%, transparent 70%)', // Updated: Sage Green
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(211, 255, 98, 0.15) 0%, transparent 70%)', // Updated: Lime accent
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, lg: 4 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 700,
                color: '#D3FF62', // Updated: Bright Lime accent
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              Our Impact
            </Typography>
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
              Trusted by Businesses
              <br />
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #D3FF62 0%, #c4f050 100%)', // Updated: Lime gradient
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Worldwide
              </Box>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Empowering global trade with cutting-edge technology and unmatched reliability
            </Typography>
          </motion.div>
        </Box>

        {/* Bento Grid Stats */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gridTemplateRows: {
              xs: 'auto',
              md: 'repeat(2, 1fr)',
            },
            gap: 3,
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                gridColumn: stat.size === 'large' ? 'span 2' : 'span 1',
                gridRow: stat.size === 'large' || stat.size === 'medium' ? 'span 1' : 'span 1',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  minHeight: stat.size === 'large' ? 280 : stat.size === 'medium' ? 240 : 200,
                  p: 4,
                  background: stat.gradient,
                  borderRadius: 4,
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                {/* Background Pattern */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60%',
                    height: '100%',
                    opacity: 0.1,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                {/* Icon */}
                <Box
                  sx={{
                    display: 'inline-flex',
                    p: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                    mb: 3,
                  }}
                >
                  <stat.icon
                    style={{
                      width: stat.size === 'large' ? 48 : 36,
                      height: stat.size === 'large' ? 48 : 36,
                      color: 'white',
                    }}
                  />
                </Box>

                {/* Value */}
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />

                {/* Label */}
                <Typography
                  sx={{
                    fontSize: stat.size === 'large' ? '1.5rem' : '1.25rem',
                    fontWeight: 700,
                    color: 'white',
                    mb: 1,
                    mt: 1,
                  }}
                >
                  {stat.label}
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.5,
                  }}
                >
                  {stat.description}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}