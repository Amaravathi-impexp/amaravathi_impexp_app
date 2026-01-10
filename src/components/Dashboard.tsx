import { Package, DollarSign, Ship, FileText, Upload, Navigation as NavigationIcon, AlertCircle, Clock, AlertTriangle, Bell, Truck } from 'lucide-react';
import { Box, Grid, Card, CardContent, Typography, Avatar, Link, Divider, Paper, List, ListItem, ListItemAvatar, ListItemText, ButtonBase } from '@mui/material';
import { Breadcrumb } from './Breadcrumb';
import { useAppSelector } from '../store/hooks';

export function Dashboard() {
  // Get alerts and activities from Redux store
  const alerts = useAppSelector((state) => state.dashboard.alerts);
  const activities = useAppSelector((state) => state.dashboard.activities);

  // Stats data for KPI cards
  const stats = [
    {
      label: 'Active Shipments',
      value: '24',
      change: '+12%',
      icon: Ship,
      color: 'blue' as const,
    },
    {
      label: 'Total Revenue',
      value: '$48.2K',
      change: '+23%',
      icon: DollarSign,
      color: 'green' as const,
    },
    {
      label: 'Pending Compliance',
      value: '8',
      change: '-5%',
      icon: FileText,
      color: 'orange' as const,
    },
    {
      label: 'Payments Due',
      value: '3',
      change: '+2',
      icon: Package,
      color: 'amber' as const,
    },
  ];

  const handleStatClick = (statLabel: string) => {
    // Handle navigation based on the stat clicked
    // TODO: Implement navigation to respective pages
  };

  // Color configurations for stats
  const getStatColors = (color: string) => {
    const colorMap = {
      blue: { bg: '#E3F2FD', text: '#1976D2' },
      green: { bg: '#E8F5E9', text: '#388E3C' },
      orange: { bg: '#FFF3E0', text: '#F57C00' },
      amber: { bg: '#FFF8E1', text: '#FFA000' },
      red: { bg: '#FFEBEE', text: '#D32F2F' },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <Box>
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Dashboard' }]} />

      {/* KPI Cards - Single Row */}
      <Box sx={{ mb: 4, mt: 3 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colors = getStatColors(stat.color);

            return (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
                <Card
                  component={ButtonBase}
                  onClick={() => handleStatClick(stat.label)}
                  sx={{
                    width: '100%',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          bgcolor: colors.bg,
                          color: colors.text,
                          borderRadius: 2,
                        }}
                      >
                        <Icon size={24} />
                      </Avatar>
                      <Typography
                        variant="body2"
                        sx={{
                          color: stat.change.startsWith('+') ? 'success.main' : 'error.main',
                        }}
                      >
                        {stat.change}
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ mb: 0.5 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Quick Links, Exceptions / Alerts, and Recent Activity - Single Row */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={4}>
          {/* Quick Actions */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Links
              </Typography>
              <Paper sx={{ p: 3, flexGrow: 1 }}>
                <List disablePadding>
                  <ListItem
                    component={Link}
                    href="#"
                    sx={{
                      borderRadius: 2,
                      transition: 'background-color 0.2s',
                      '&:hover': { bgcolor: 'grey.50' },
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: '#E3F2FD',
                          color: '#1976D2',
                          borderRadius: 2,
                          transition: 'background-color 0.2s',
                          '.MuiListItem-root:hover &': { bgcolor: '#BBDEFB' },
                        }}
                      >
                        <Package size={20} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="New Shipment"
                      secondary="Book and schedule instantly"
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>

                  <Divider sx={{ my: 1.5 }} />

                  <ListItem
                    component={Link}
                    href="#"
                    sx={{
                      borderRadius: 2,
                      transition: 'background-color 0.2s',
                      '&:hover': { bgcolor: 'grey.50' },
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: '#E8F5E9',
                          color: '#388E3C',
                          borderRadius: 2,
                          transition: 'background-color 0.2s',
                          '.MuiListItem-root:hover &': { bgcolor: '#C8E6C9' },
                        }}
                      >
                        <Upload size={20} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Upload Documents"
                      secondary="Invoices, packing lists, customs docs"
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>

                  <Divider sx={{ my: 1.5 }} />

                  <ListItem
                    component={Link}
                    href="#"
                    sx={{
                      borderRadius: 2,
                      transition: 'background-color 0.2s',
                      '&:hover': { bgcolor: 'grey.50' },
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: '#F3E5F5',
                          color: '#7B1FA2',
                          borderRadius: 2,
                          transition: 'background-color 0.2s',
                          '.MuiListItem-root:hover &': { bgcolor: '#E1BEE7' },
                        }}
                      >
                        <NavigationIcon size={20} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Track Cargo"
                      secondary="Real-time tracking and updates"
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Box>
          </Grid>

          {/* Alerts Panel */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Exceptions / Alerts
              </Typography>
              <Paper sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {alerts.map((alert) => {
                    // Determine alert styling based on type
                    const getAlertStyles = () => {
                      if (alert.type === 'error') {
                        return {
                          bg: '#FFEBEE',
                          border: '#FFCDD2',
                          iconBg: '#FFCDD2',
                          iconColor: '#D32F2F',
                          titleColor: '#B71C1C',
                          descColor: '#C62828',
                          icon: AlertCircle,
                        };
                      } else if (alert.type === 'warning') {
                        const isDelay = alert.severity === 'medium' && alert.title.includes('Delay');
                        return {
                          bg: isDelay ? '#FFF3E0' : '#FFFDE7',
                          border: isDelay ? '#FFE0B2' : '#FFF9C4',
                          iconBg: isDelay ? '#FFE0B2' : '#FFF9C4',
                          iconColor: isDelay ? '#F57C00' : '#F9A825',
                          titleColor: isDelay ? '#E65100' : '#F57F17',
                          descColor: isDelay ? '#EF6C00' : '#F9A825',
                          icon: alert.title.includes('Delay') ? Clock : AlertTriangle,
                        };
                      } else {
                        return {
                          bg: '#E3F2FD',
                          border: '#BBDEFB',
                          iconBg: '#BBDEFB',
                          iconColor: '#1976D2',
                          titleColor: '#0D47A1',
                          descColor: '#1565C0',
                          icon: AlertCircle,
                        };
                      }
                    };

                    const alertStyles = getAlertStyles();
                    const AlertIcon = alertStyles.icon;

                    return (
                      <Paper
                        key={alert.id}
                        sx={{
                          p: 2,
                          bgcolor: alertStyles.bg,
                          border: `1px solid ${alertStyles.border}`,
                          display: 'flex',
                          gap: 1.5,
                        }}
                      >
                        <Box sx={{ flexShrink: 0 }}>
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: alertStyles.iconBg,
                              color: alertStyles.iconColor,
                              borderRadius: 2,
                            }}
                          >
                            <AlertIcon size={20} />
                          </Avatar>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="body2" sx={{ color: alertStyles.titleColor, mb: 0.5 }}>
                                {alert.title}
                              </Typography>
                              <Typography variant="caption" sx={{ color: alertStyles.descColor, display: 'block' }}>
                                {alert.description}
                              </Typography>
                              {alert.shipmentInfo && (
                                <Typography variant="caption" sx={{ color: alertStyles.iconColor, display: 'block', mt: 0.5 }}>
                                  {alert.shipmentInfo}
                                </Typography>
                              )}
                            </Box>
                            <Typography variant="caption" sx={{ color: alertStyles.iconColor, flexShrink: 0, ml: 1 }}>
                              {alert.timeAgo}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    );
                  })}
                </Box>
                <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
                  <Link href="#" variant="body2" underline="hover">
                    View all alerts
                  </Link>
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* Recent Activity */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Recent Activity
              </Typography>
              <Paper sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <List disablePadding>
                    {activities.map((activity, index) => {
                      // Determine activity icon and styling based on type
                      const getActivityConfig = () => {
                        const configs = {
                          shipment: {
                            icon: Truck,
                            bgColor: '#E3F2FD',
                            iconColor: '#1976D2',
                          },
                          delivery: {
                            icon: Ship,
                            bgColor: '#E3F2FD',
                            iconColor: '#1976D2',
                          },
                          payment: {
                            icon: DollarSign,
                            bgColor: '#E8F5E9',
                            iconColor: '#388E3C',
                          },
                          message: {
                            icon: Bell,
                            bgColor: '#F3E5F5',
                            iconColor: '#7B1FA2',
                          },
                          document: {
                            icon: FileText,
                            bgColor: '#FFF3E0',
                            iconColor: '#F57C00',
                          },
                        };
                        return configs[activity.type as keyof typeof configs] || configs.shipment;
                      };

                      const activityConfig = getActivityConfig();
                      const ActivityIcon = activityConfig.icon;
                      const isLastItem = index === activities.length - 1;

                      return (
                        <Box key={activity.id}>
                          <ListItem disablePadding sx={{ py: 1.5 }}>
                            <ListItemAvatar>
                              <Avatar
                                sx={{
                                  width: 40,
                                  height: 40,
                                  bgcolor: activityConfig.bgColor,
                                  color: activityConfig.iconColor,
                                }}
                              >
                                <ActivityIcon size={20} />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={activity.title}
                              secondary={`${activity.description} • ${activity.timeAgo}`}
                              primaryTypographyProps={{ variant: 'body2' }}
                              secondaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                            />
                          </ListItem>
                          {!isLastItem && <Divider />}
                        </Box>
                      );
                    })}
                  </List>
                </Box>
                <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
                  <Link href="#" variant="body2" underline="hover">
                    View all activity
                  </Link>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}