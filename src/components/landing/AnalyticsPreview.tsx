import { Box, Container, Typography, Paper } from '@mui/material';
import { TrendingUp, Package, DollarSign, Clock, BarChart3, MapPin } from 'lucide-react';

const kpiCards = [
  { icon: Package, label: 'Active Shipments', value: '247', trend: '+12%', color: '#2563eb' },
  { icon: DollarSign, label: 'Revenue', value: '$1.2M', trend: '+8%', color: '#10b981' },
  { icon: Clock, label: 'Avg. Delivery Time', value: '18 days', trend: '-5%', color: '#a855f7' },
];

export function AnalyticsPreview() {
  return (
    <Box
      component="section"
      sx={{
        py: 10,
        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #4f46e5 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 40,
            left: 40,
            width: 288,
            height: 288,
            bgcolor: 'white',
            borderRadius: '50%',
            filter: 'blur(96px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            width: 384,
            height: 384,
            bgcolor: '#a5b4fc',
            borderRadius: '50%',
            filter: 'blur(96px)',
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 }, position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
              fontWeight: 800,
              mb: 2,
              color: 'white',
            }}
          >
            Analytics Preview
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#bfdbfe',
              maxWidth: 700,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.125rem' },
            }}
          >
            Get real-time visibility into your trade operations with powerful analytics
          </Typography>
        </Box>

        {/* Dashboard Preview Container */}
        <Paper
          elevation={0}
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            borderRadius: 6,
            p: { xs: 4, lg: 6 },
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          }}
        >
          {/* Dashboard Label */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            <BarChart3 className="w-6 h-6 text-blue-200" />
            <Typography variant="h5" sx={{ color: 'white' }}>
              Dashboard Preview
            </Typography>
          </Box>

          {/* KPI Cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
              mb: 4,
            }}
          >
            {kpiCards.map((kpi, index) => {
              const Icon = kpi.icon;
              return (
                <Paper
                  key={index}
                  elevation={3}
                  sx={{
                    bgcolor: 'white',
                    p: 3,
                    borderRadius: 3,
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: `${kpi.color}1a`,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: kpi.color }} />
                    </Box>
                    <Box
                      sx={{
                        bgcolor: '#d1fae5',
                        color: '#065f46',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {kpi.trend}
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                    {kpi.label}
                  </Typography>
                  <Typography variant="h4" sx={{ color: 'grey.900' }}>
                    {kpi.value}
                  </Typography>
                </Paper>
              );
            })}
          </Box>

          {/* Charts and Map Row */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                lg: 'repeat(2, 1fr)',
              },
              gap: 3,
              mb: 4,
            }}
          >
            {/* Charts Section */}
            <Paper
              elevation={3}
              sx={{
                bgcolor: 'white',
                p: 3,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'grey.900' }}>
                  Shipment Trends
                </Typography>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </Box>

              {/* Simple chart visualization */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'Jan-Mar', value: 75, color: '#3b82f6' },
                  { label: 'Apr-Jun', value: 90, color: '#6366f1' },
                  { label: 'Jul-Sep', value: 85, color: '#a855f7' },
                  { label: 'Oct-Dec', value: 95, color: '#2563eb' },
                ].map((bar, index) => (
                  <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {bar.label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'grey.900', fontWeight: 600 }}>
                        {bar.value}%
                      </Typography>
                    </Box>
                    <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: '9999px', height: 12 }}>
                      <Box
                        sx={{
                          bgcolor: bar.color,
                          height: 12,
                          borderRadius: '9999px',
                          width: `${bar.value}%`,
                          transition: 'width 0.5s',
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>

            {/* Map View Section */}
            <Paper
              elevation={3}
              sx={{
                bgcolor: 'white',
                p: 3,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'grey.900' }}>
                  Global Coverage
                </Typography>
                <MapPin className="w-5 h-5 text-green-600" />
              </Box>

              {/* Map placeholder with locations */}
              <Box
                sx={{
                  position: 'relative',
                  background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
                  borderRadius: 2,
                  height: 192,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {/* Decorative world map effect */}
                <Box sx={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
                  <Box
                    className="animate-pulse"
                    sx={{
                      position: 'absolute',
                      top: '25%',
                      left: '25%',
                      width: 16,
                      height: 16,
                      bgcolor: '#2563eb',
                      borderRadius: '50%',
                    }}
                  />
                  <Box
                    className="animate-pulse"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      right: '33%',
                      width: 16,
                      height: 16,
                      bgcolor: '#10b981',
                      borderRadius: '50%',
                    }}
                  />
                  <Box
                    className="animate-pulse"
                    sx={{
                      position: 'absolute',
                      bottom: '33%',
                      left: '50%',
                      width: 16,
                      height: 16,
                      bgcolor: '#a855f7',
                      borderRadius: '50%',
                    }}
                  />
                </Box>

                {/* Stats overlay */}
                <Box sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: 'grey.900', mb: 1 }}>
                    130+
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Countries Covered
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ color: 'primary.main' }}>
                        700+
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Vessels
                      </Typography>
                    </Box>
                    <Box sx={{ width: 1, height: 32, bgcolor: 'grey.300' }} />
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ color: '#10b981' }}>
                        300+
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Ports
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Paper>

        {/* Bottom Feature Highlights */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
            mt: 6,
            textAlign: 'center',
          }}
        >
          <Box>
            <Typography sx={{ fontSize: '1.5rem', mb: 1 }}>📊</Typography>
            <Typography sx={{ color: '#bfdbfe' }}>Real-time KPIs</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: '1.5rem', mb: 1 }}>📈</Typography>
            <Typography sx={{ color: '#bfdbfe' }}>Trend Analysis</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: '1.5rem', mb: 1 }}>🗺️</Typography>
            <Typography sx={{ color: '#bfdbfe' }}>Global Tracking</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}