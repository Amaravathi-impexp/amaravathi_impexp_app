import { BarChart3, TrendingUp, PieChart, Activity, DollarSign, AlertTriangle } from 'lucide-react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Paper,
  Typography,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
} from '@mui/material';
import { Breadcrumb } from './Breadcrumb';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart as RePieChart, Pie, Cell, LineChart, Line } from 'recharts';

export function Analytics() {
  const [timeRange, setTimeRange] = useState('last-30-days');
  const [tradeType, setTradeType] = useState<'import' | 'export'>('import');
  const [country, setCountry] = useState('all');
  const [mode, setMode] = useState('all');
  const [partner, setPartner] = useState('all');

  const handleApply = () => {
    // Apply filters logic
    // TODO: Implement filter application
  };

  const handleReset = () => {
    setTimeRange('last-30-days');
    setTradeType('import');
    setCountry('all');
    setMode('all');
    setPartner('all');
  };

  // Shipment Performance Data
  const shipmentPerformanceData = [
    { month: 'Jan', onTime: 145, delayed: 12 },
    { month: 'Feb', onTime: 152, delayed: 15 },
    { month: 'Mar', onTime: 168, delayed: 10 },
    { month: 'Apr', onTime: 175, delayed: 8 },
    { month: 'May', onTime: 182, delayed: 14 },
    { month: 'Jun', onTime: 195, delayed: 9 },
  ];

  // Trade Volume Data
  const tradeVolumeData = [
    { month: 'Jan', import: 2.4, export: 1.8 },
    { month: 'Feb', import: 2.6, export: 2.1 },
    { month: 'Mar', import: 2.9, export: 2.3 },
    { month: 'Apr', import: 3.1, export: 2.5 },
    { month: 'May', import: 3.4, export: 2.8 },
    { month: 'Jun', import: 3.7, export: 3.2 },
  ];

  // Cost Breakdown Data
  const costBreakdownData = [
    { name: 'Freight', value: 45, color: '#1A3D32' }, // Updated: Dark Forest Green
    { name: 'Customs Duty', value: 25, color: '#3D7A68' }, // Updated: Sage Green
    { name: 'GST / IGST', value: 18, color: '#D3FF62' }, // Updated: Lime
    { name: 'Documentation', value: 8, color: '#2D5A4A' }, // Updated: Medium Green
    { name: 'Other', value: 4, color: '#c8e3bf' }, // Updated: Light Green
  ];

  // Compliance & Risk Data
  const complianceRiskData = [
    { name: 'HS Code Issues', value: 8 },
    { name: 'License Delays', value: 15 },
    { name: 'Country Restrictions', value: 5 },
  ];

  // Compliance Trend Data (over time)
  const complianceTrendData = [
    { month: 'Jan', hsCode: 12, license: 18, restrictions: 8, documentation: 6 },
    { month: 'Feb', hsCode: 10, license: 16, restrictions: 7, documentation: 5 },
    { month: 'Mar', hsCode: 9, license: 17, restrictions: 6, documentation: 4 },
    { month: 'Apr', hsCode: 11, license: 14, restrictions: 7, documentation: 7 },
    { month: 'May', hsCode: 7, license: 13, restrictions: 4, documentation: 3 },
    { month: 'Jun', hsCode: 8, license: 15, restrictions: 5, documentation: 4 },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Analytics' },
        ]}
      />
      
      {/* Global Filters */}
      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* Time Range */}
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormControl fullWidth>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="last-7-days">Last 7 Days</MenuItem>
                <MenuItem value="last-30-days">Last 30 Days</MenuItem>
                <MenuItem value="last-90-days">Last 90 Days</MenuItem>
                <MenuItem value="last-year">Last Year</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Trade Type */}
          <Grid size={{ xs: 12, md: 2.4 }}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Trade Type
              </Typography>
              <ToggleButtonGroup
                value={tradeType}
                exclusive
                onChange={(e, newValue) => newValue && setTradeType(newValue)}
                fullWidth
                size="small"
              >
                <ToggleButton value="import">Import</ToggleButton>
                <ToggleButton value="export">Export</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Grid>

          {/* Country */}
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                value={country}
                label="Country"
                onChange={(e) => setCountry(e.target.value)}
              >
                <MenuItem value="all">All Countries</MenuItem>
                <MenuItem value="us">United States</MenuItem>
                <MenuItem value="cn">China</MenuItem>
                <MenuItem value="jp">Japan</MenuItem>
                <MenuItem value="de">Germany</MenuItem>
                <MenuItem value="uk">United Kingdom</MenuItem>
                <MenuItem value="in">India</MenuItem>
                <MenuItem value="sg">Singapore</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Mode */}
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormControl fullWidth>
              <InputLabel>Mode</InputLabel>
              <Select
                value={mode}
                label="Mode"
                onChange={(e) => setMode(e.target.value)}
              >
                <MenuItem value="all">All Modes</MenuItem>
                <MenuItem value="sea">Sea Freight</MenuItem>
                <MenuItem value="air">Air Freight</MenuItem>
                <MenuItem value="rail">Rail Freight</MenuItem>
                <MenuItem value="road">Road Freight</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Partner */}
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormControl fullWidth>
              <InputLabel>Partner</InputLabel>
              <Select
                value={partner}
                label="Partner"
                onChange={(e) => setPartner(e.target.value)}
              >
                <MenuItem value="all">All Partners</MenuItem>
                <MenuItem value="maersk">Maersk Line</MenuItem>
                <MenuItem value="msc">MSC</MenuItem>
                <MenuItem value="cosco">COSCO Shipping</MenuItem>
                <MenuItem value="hapag">Hapag-Lloyd</MenuItem>
                <MenuItem value="one">Ocean Network Express</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={handleApply}>
            Apply
          </Button>
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Paper>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Total Shipments */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Total Shipments
                </Typography>
                <BarChart3 style={{ width: 20, height: 20, color: '#1A3D32' }} /> {/* Updated: Dark Forest Green */}
              </Box>
              <Typography variant="h4" gutterBottom>
                1,247
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" color="success.main">
                  +12.5%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  vs last period
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* On-Time Delivery % */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  On-Time Delivery %
                </Typography>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </Box>
              <Typography variant="h4" gutterBottom>
                94.2%
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" color="success.main">
                  +2.3%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  vs last period
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Avg Clearance Time */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Avg Clearance Time (Days)
                </Typography>
                <Activity style={{ width: 20, height: 20, color: '#3D7A68' }} /> {/* Updated: Sage Green */}
              </Box>
              <Typography variant="h4" gutterBottom>
                3.4
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" color="success.main">
                  -0.8
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  vs last period
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Compliance Issues */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Compliance Issues
                </Typography>
                <PieChart className="w-5 h-5 text-orange-600" />
              </Box>
              <Typography variant="h4" gutterBottom>
                12
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" color="error.main">
                  +3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  vs last period
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Row 2 - Charts */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Shipment Performance Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ p: 1, bgcolor: 'success.light', borderRadius: 1 }}>
                <BarChart3 className="w-5 h-5 text-green-600" />
              </Box>
              <Box>
                <Typography variant="h6">Shipment Performance (Monthly)</Typography>
                <Typography variant="body2" color="text.secondary">
                  On-Time vs Delayed | Ports / Routes comparison
                </Typography>
              </Box>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={shipmentPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="onTime" fill="#10b981" name="On-Time" />
                <Bar dataKey="delayed" fill="#ef4444" name="Delayed" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Trade Volume Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ p: 1, bgcolor: 'info.light', borderRadius: 1 }}>
                <TrendingUp style={{ width: 20, height: 20, color: '#1A3D32' }} /> {/* Updated: Dark Forest Green */}
              </Box>
              <Box>
                <Typography variant="h6">Trade Volume (Monthly)</Typography>
                <Typography variant="body2" color="text.secondary">
                  Import vs Export | Volume in millions
                </Typography>
              </Box>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={tradeVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="import" fill="#10b981" name="Import" />
                <Area type="monotone" dataKey="export" fill="#ef4444" name="Export" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Row 3 - Cost & Compliance */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Cost Breakdown Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ p: 1, bgcolor: 'secondary.light', borderRadius: 1 }}>
                <DollarSign style={{ width: 20, height: 20, color: '#3D7A68' }} /> {/* Updated: Sage Green */}
              </Box>
              <Box>
                <Typography variant="h6">Cost Breakdown</Typography>
                <Typography variant="body2" color="text.secondary">
                  Distribution by category (% of total)
                </Typography>
              </Box>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={costBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {costBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {costBreakdownData.map((item, index) => (
                <Grid size={6} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: item.color,
                      }}
                    />
                    <Typography variant="body2">{item.name}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Compliance & Risk Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ p: 1, bgcolor: 'error.light', borderRadius: 1 }}>
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </Box>
              <Box>
                <Typography variant="h6">Compliance & Risk</Typography>
                <Typography variant="body2" color="text.secondary">
                  Issues trend over time
                </Typography>
              </Box>
            </Box>
            
            {/* Current Issues Summary */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={4}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'error.50', borderColor: 'error.light' }}>
                  <Typography variant="caption" color="error.main" gutterBottom>
                    HS Code Issues
                  </Typography>
                  <Typography variant="h5" color="error.dark">
                    8
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={4}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'warning.50', borderColor: 'warning.light' }}>
                  <Typography variant="caption" color="warning.main" gutterBottom>
                    License Delays
                  </Typography>
                  <Typography variant="h5" color="warning.dark">
                    15
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={4}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fef9c3', borderColor: '#fde047' }}>
                  <Typography variant="caption" sx={{ color: '#ca8a04' }} gutterBottom>
                    Restrictions
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#a16207' }}>
                    5
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            
            {/* Trend Chart */}
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={complianceTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="hsCode" stroke="#dc2626" name="HS Code" strokeWidth={2} />
                <Line type="monotone" dataKey="license" stroke="#f59e0b" name="License" strokeWidth={2} />
                <Line type="monotone" dataKey="restrictions" stroke="#eab308" name="Restrictions" strokeWidth={2} />
                <Line type="monotone" dataKey="documentation" stroke="#8b5cf6" name="Documentation" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}