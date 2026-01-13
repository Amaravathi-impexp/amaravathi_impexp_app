import { useState, useEffect } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Autocomplete,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { logger } from '../utils/logger';
import {
  Package,
  Globe,
  Truck,
  CheckCircle,
  AlertCircle,
  Ship,
  Plane,
  Box as BoxIcon,
  Loader2,
  Users,
  Plus,
  FileText,
  Upload,
  X,
  File,
} from 'lucide-react';
import { mockApi } from '../services/mock-api';
import { Breadcrumb } from './Breadcrumb';
import { CreatePartner } from './CreatePartner';
import { CountryDropdown } from './common/CountryDropdown';
import { AnimatedStepper, StepConfig } from './common/AnimatedStepper';
import { SelectionCard } from './common/SelectionCard';
import type { LegacyPartner } from '../types';
import type { Country } from '../store/api/referenceDataApi';

interface CreateShipmentProps {
  onBack: () => void;
  onShipmentCreated?: () => void;
}

interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  documentType: string;
  status: 'uploading' | 'uploaded' | 'processing' | 'ready' | 'failed';
}

const shipmentSteps: StepConfig[] = [
  { label: 'Shipment Type', icon: Package, description: 'Choose import or export' },
  { label: 'Cargo Details', icon: BoxIcon, description: 'Product information' },
  { label: 'Route & Logistics', icon: Globe, description: 'Origin and destination' },
  { label: 'Partner Selection', icon: Users, description: 'Choose shipping partner' },
  { label: 'Documents', icon: FileText, description: 'Upload documents (optional)' },
  { label: 'Review & Submit', icon: CheckCircle, description: 'Confirm and submit' },
];

export function CreateShipment({ onBack, onShipmentCreated }: CreateShipmentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [shipmentType, setShipmentType] = useState<'import' | 'export'>('import');
  const [hsCode, setHsCode] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [complianceCritical, setComplianceCritical] = useState<'yes' | 'no'>('no');
  const [originCountry, setOriginCountry] = useState<Country | null>(null);
  const [destinationCountry, setDestinationCountry] = useState<Country | null>(null);
  const [mode, setMode] = useState('');
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [eta, setEta] = useState<Date | null>(null);
  const [selectedPartners, setSelectedPartners] = useState<LegacyPartner[]>([]);
  const [partners, setPartners] = useState<LegacyPartner[]>([]);
  const [showCreatePartner, setShowCreatePartner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>('commercial_invoice');
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await mockApi.partners.getAll({ page: 1, limit: 100 });
      setPartners(response.data);
    } catch (error) {
      logger.error('Failed to fetch partners', { error });
    }
  };

  const handlePartnerCreated = async (newPartner: Partner) => {
    await fetchPartners();
    setSelectedPartners([...selectedPartners, newPartner]);
    setShowCreatePartner(false);
    setCurrentStep(3); // Return to Partner Selection step
  };

  if (showCreatePartner) {
    const preselectedPartnerType = shipmentType === 'import' ? 'importer' : 'exporter';
    return (
      <CreatePartner
        onBack={() => setShowCreatePartner(false)}
        onPartnerCreated={handlePartnerCreated}
        preselectedPartnerType={preselectedPartnerType}
      />
    );
  }

  const handleSubmit = async () => {
    if (currentStep !== 5) return;

    setError('');
    setLoading(true);

    try {
      const shipmentId = `AMRV-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

      await mockApi.shipments.create({
        shipmentId,
        customerName: 'Customer Name',
        origin: originCountry?.name || '',
        destination: destinationCountry?.name || '',
        departureDate: pickupDate?.toISOString().split('T')[0] || '',
        arrivalDate: eta?.toISOString().split('T')[0] || '',
        containerType: mode,
        cargoType: productName,
        weight: parseFloat(weight) || 0,
        volume: parseFloat(quantity) || 0,
        value: 0,
        currency: 'USD',
        incoterms: 'FOB',
        partnerId: selectedPartners.map(partner => partner.id).join(',') || '',
      });

      setSuccess(true);

      setTimeout(() => {
        if (onShipmentCreated) {
          onShipmentCreated();
        } else {
          onBack();
        }
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create shipment');
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return shipmentType !== '';
      case 1:
        return hsCode !== '' && productName !== '' && quantity !== '' && weight !== '';
      case 2:
        return originCountry !== null && destinationCountry !== null && mode !== '' && pickupDate !== null && eta !== null;
      case 3:
        return selectedPartners.length > 0;
      default:
        return true;
    }
  };

  const canProceed = isStepValid(currentStep);

  const handleNext = () => {
    if (canProceed && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newDocuments: UploadedDocument[] = Array.from(files).map(file => ({
        id: String(Math.floor(Math.random() * 10000)),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date(),
        documentType: selectedDocumentType,
        status: 'uploaded',
      }));
      setUploadedDocuments([...uploadedDocuments, ...newDocuments]);
    }
  };

  const handleRemoveDocument = (id: string) => {
    setUploadedDocuments(uploadedDocuments.filter(doc => doc.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <CircularProgress size={80} />
            <Typography variant="h5" sx={{ mt: 3 }}>
              Creating Your Shipment
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Please wait while we process your shipment details...
            </Typography>
          </Paper>
        </div>
      )}

      {/* Success Overlay */}
      {success && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto" />
            <Typography variant="h5" sx={{ mt: 2, color: 'success.dark' }}>
              Shipment Created!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Your shipment has been successfully created and is ready for processing.
            </Typography>
          </Paper>
        </div>
      )}

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Shipments', onClick: onBack },
          { label: 'Create New Shipment' },
        ]}
      />

      {/* Stepper */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, mt: 4 }}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <AnimatedStepper activeStep={currentStep} steps={shipmentSteps} />
        </Paper>
      </Box>

      {/* Form */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, mt: 4 }}>
          {/* Step 0: Shipment Type */}
          {currentStep === 0 && (
            <Paper elevation={2} sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Package className="w-8 h-8" style={{ color: '#1A3D32' }} />
                <Box>
                  <Typography variant="h5">Select Shipment Type</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Choose whether this is an import or export shipment
                  </Typography>
                </Box>
              </Box>

              <FormControl component="fieldset">
                <RadioGroup
                  value={shipmentType}
                  onChange={(e) => setShipmentType(e.target.value as 'import' | 'export')}
                >
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 2,
                          cursor: 'pointer',
                          border: shipmentType === 'import' ? 2 : 1,
                          borderColor: shipmentType === 'import' ? 'primary.main' : 'divider',
                          bgcolor: shipmentType === 'import' ? 'primary.50' : 'background.paper',
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            borderColor: 'primary.main',
                            boxShadow: 2,
                            '& .import-icon': {
                              color: '#1A3D32',
                              transform: 'scale(1.1)',
                            },
                          },
                        }}
                        onClick={() => setShipmentType('import')}
                      >
                        <FormControlLabel
                          value="import"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                              <Ship 
                                className="w-8 h-8 import-icon" 
                                style={{
                                  color: shipmentType === 'import' ? '#1A3D32' : '#6b7280',
                                  transition: 'all 0.2s ease-in-out',
                                }}
                              />
                              <Box>
                                <Typography variant="h6">Import</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Bringing goods into the country
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 2,
                          cursor: 'pointer',
                          border: shipmentType === 'export' ? 2 : 1,
                          borderColor: shipmentType === 'export' ? 'primary.main' : 'divider',
                          bgcolor: shipmentType === 'export' ? 'primary.50' : 'background.paper',
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            borderColor: 'primary.main',
                            boxShadow: 2,
                            '& .export-icon': {
                              color: '#1A3D32',
                              transform: 'scale(1.1)',
                            },
                          },
                        }}
                        onClick={() => setShipmentType('export')}
                      >
                        <FormControlLabel
                          value="export"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                              <Plane 
                                className="w-8 h-8 export-icon" 
                                style={{
                                  color: shipmentType === 'export' ? '#1A3D32' : '#6b7280',
                                  transition: 'all 0.2s ease-in-out',
                                }}
                              />
                              <Box>
                                <Typography variant="h6">Export</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Sending goods out of the country
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </Card>
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Paper>
          )}

          {/* Step 1: Cargo Details */}
          {currentStep === 1 && (
            <Paper elevation={2} sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <BoxIcon className="w-8 h-8" style={{ color: '#1A3D32' }} />
                <Box>
                  <Typography variant="h5">Cargo Details</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Provide information about your cargo
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="HS Code"
                    required
                    value={hsCode}
                    onChange={(e) => setHsCode(e.target.value)}
                    placeholder="e.g., 8471.30.00"
                    helperText="Harmonized System tariff code"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g., Electronic Components"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Quantity (CBM)"
                    required
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g., 20"
                    helperText="Cubic meters"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Weight (KG)"
                    required
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g., 5000"
                    helperText="Total weight in kilograms"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 2 }} />
                  <FormControl component="fieldset">
                    <FormLabel>Compliance Critical Cargo</FormLabel>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                      Requires special handling
                    </Typography>
                    <RadioGroup
                      value={complianceCritical}
                      onChange={(e) => setComplianceCritical(e.target.value as 'yes' | 'no')}
                    >
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Card
                            variant="outlined"
                            sx={{
                              p: 2,
                              cursor: 'pointer',
                              border: complianceCritical === 'yes' ? 2 : 1,
                              borderColor: complianceCritical === 'yes' ? 'warning.main' : 'divider',
                              bgcolor: complianceCritical === 'yes' ? 'warning.50' : 'background.paper',
                            }}
                            onClick={() => setComplianceCritical('yes')}
                          >
                            <FormControlLabel
                              value="yes"
                              control={<Radio />}
                              label="Yes - Requires Special Compliance"
                            />
                          </Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Card
                            variant="outlined"
                            sx={{
                              p: 2,
                              cursor: 'pointer',
                              border: complianceCritical === 'no' ? 2 : 1,
                              borderColor: complianceCritical === 'no' ? 'success.main' : 'divider',
                              bgcolor: complianceCritical === 'no' ? 'success.50' : 'background.paper',
                            }}
                            onClick={() => setComplianceCritical('no')}
                          >
                            <FormControlLabel
                              value="no"
                              control={<Radio />}
                              label="No - Standard Cargo"
                            />
                          </Card>
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Step 2: Route & Logistics */}
          {currentStep === 2 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Route Information */}
              <Paper elevation={2} sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Globe className="w-8 h-8" style={{ color: '#1A3D32' }} />
                  <Box>
                    <Typography variant="h5">Route Information</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Specify origin and destination
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={3} sx={{ width: '100%' }}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CountryDropdown
                      label="Origin Country"
                      value={originCountry}
                      onChange={(country) => setOriginCountry(country)}
                      placeholder="Select origin country"
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CountryDropdown
                      label="Destination Country"
                      value={destinationCountry}
                      onChange={(country) => setDestinationCountry(country)}
                      placeholder="Select destination country"
                      required
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Transportation Mode */}
              <Paper elevation={2} sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Truck className="w-8 h-8" style={{ color: '#1A3D32' }} />
                  <Box>
                    <Typography variant="h5">Transportation Mode</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Select how the cargo will be transported
                    </Typography>
                  </Box>
                </Box>

                <FormControl component="fieldset">
                  <RadioGroup value={mode} onChange={(e) => setMode(e.target.value)}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <SelectionCard
                          icon={Ship}
                          title="Sea Freight"
                          description="Cost-effective for large volumes"
                          value="sea"
                          selected={mode === 'sea'}
                          onClick={() => setMode('sea')}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <SelectionCard
                          icon={Plane}
                          title="Air Freight"
                          description="Fast delivery for urgent cargo"
                          value="air"
                          selected={mode === 'air'}
                          onClick={() => setMode('air')}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <SelectionCard
                          icon={Truck}
                          title="Road Freight"
                          description="Door-to-door land transport"
                          value="road"
                          selected={mode === 'road'}
                          onClick={() => setMode('road')}
                        />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Paper>

              {/* Schedule */}
              <Paper elevation={2} sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Package className="w-8 h-8" style={{ color: '#1A3D32' }} />
                  <Box>
                    <Typography variant="h5">Schedule</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Set pickup and delivery dates
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <DatePicker
                      label="Pickup Date *"
                      value={pickupDate}
                      onChange={(newValue) => setPickupDate(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          helperText: 'When will the cargo be picked up?',
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <DatePicker
                      label="Estimated Time of Arrival *"
                      value={eta}
                      onChange={(newValue) => setEta(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          helperText: 'Expected delivery date',
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          )}

          {/* Step 3: Partner Selection */}
          {currentStep === 3 && (
            <Paper elevation={2} sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Users className="w-8 h-8" style={{ color: '#1A3D32' }} />
                <Box>
                  <Typography variant="h5">Select Partners</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Choose one or more partners to handle your shipment
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Multi-Select Autocomplete for Partners */}
                <Autocomplete
                  multiple
                  id="partners-autocomplete"
                  options={partners}
                  getOptionLabel={(option) => `${option.companyName} - ${option.country}`}
                  value={selectedPartners}
                  onChange={(event, newValue) => {
                    setSelectedPartners(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Partners"
                      placeholder="Search and select partners"
                      required
                      helperText="Select one or more partners to work with on this shipment"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((partner, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={partner.id}
                        label={partner.companyName}
                        color="primary"
                        icon={<Users style={{ width: 16, height: 16 }} />}
                      />
                    ))
                  }
                  renderOption={(props, partner) => (
                    <Box component="li" {...props}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, width: '100%' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {partner.companyName}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                          <Typography variant="caption" color="text.secondary">
                            📍 {partner.country}
                          </Typography>
                          {partner.partnerType && (
                            <Typography variant="caption" color="primary" sx={{ textTransform: 'capitalize' }}>
                              {partner.partnerType.replace('_', ' ')}
                            </Typography>
                          )}
                          <Typography variant="caption" color="text.secondary">
                            ✉️ {partner.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                />

                {/* Selected Partners Display */}
                {selectedPartners.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                      Selected Partners ({selectedPartners.length})
                    </Typography>
                    <Grid container spacing={1.5}>
                      {selectedPartners.map((partner) => (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={partner.id}>
                          <Card variant="outlined" sx={{ 
                            borderColor: 'primary.main', 
                            bgcolor: 'primary.50',
                            transition: 'all 0.2s',
                            '&:hover': {
                              boxShadow: 2,
                              transform: 'translateY(-2px)',
                            }
                          }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                              <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5 }}>
                                <Box
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    flexShrink: 0,
                                  }}
                                >
                                  <Users style={{ width: 16, height: 16 }} />
                                </Box>
                                <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, lineHeight: 1.3 }}>
                                    {partner.companyName}
                                  </Typography>
                                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                                    <Typography 
                                      variant="caption" 
                                      color="text.secondary" 
                                      sx={{ fontSize: '0.7rem', lineHeight: 1.4 }}
                                    >
                                      Contact: {partner.contactPerson}
                                    </Typography>
                                    <Typography 
                                      variant="caption" 
                                      color="text.secondary" 
                                      sx={{ 
                                        fontSize: '0.7rem', 
                                        lineHeight: 1.4,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                      }}
                                    >
                                      Email: {partner.email}
                                    </Typography>
                                    <Typography 
                                      variant="caption" 
                                      color="text.secondary" 
                                      sx={{ fontSize: '0.7rem', lineHeight: 1.4 }}
                                    >
                                      Country: {partner.country}
                                    </Typography>
                                  </Box>
                                  {partner.partnerType && (
                                    <Chip
                                      label={partner.partnerType.replace('_', ' ')}
                                      size="small"
                                      color="primary"
                                      sx={{ 
                                        textTransform: 'capitalize', 
                                        height: 20,
                                        fontSize: '0.65rem',
                                        mt: 0.5,
                                        '& .MuiChip-label': {
                                          px: 1,
                                        }
                                      }}
                                    />
                                  )}
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                <Divider>
                  <Typography variant="body2" color="text.secondary">
                    OR
                  </Typography>
                </Divider>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Plus />}
                  onClick={() => setShowCreatePartner(true)}
                  fullWidth
                  sx={{ borderStyle: 'dashed' }}
                >
                  Create New Partner
                </Button>
              </Box>
            </Paper>
          )}

          {/* Step 4: Documents */}
          {currentStep === 4 && (
            <Paper elevation={2} sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <FileText className="w-8 h-8" style={{ color: '#1A3D32' }} />
                <Box>
                  <Typography variant="h5">Upload Documents</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upload any relevant documents for your shipment (optional)
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Document Type Selector */}
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Document Type</InputLabel>
                      <Select
                        value={selectedDocumentType}
                        onChange={(e) => setSelectedDocumentType(e.target.value)}
                        label="Document Type"
                      >
                        <MenuItem value="commercial_invoice">Commercial Invoice</MenuItem>
                        <MenuItem value="packing_list">Packing List</MenuItem>
                        <MenuItem value="bill_of_lading">Bill of Lading</MenuItem>
                        <MenuItem value="certificate_of_origin">Certificate of Origin</MenuItem>
                        <MenuItem value="customs_declaration">Customs Declaration</MenuItem>
                        <MenuItem value="insurance_certificate">Insurance Certificate</MenuItem>
                        <MenuItem value="delivery_note">Delivery Note</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Drag and Drop Upload Area */}
                <Card
                  variant="outlined"
                  sx={{
                    p: 2.5,
                    border: dragActive ? '2px dashed' : '2px dashed',
                    borderColor: dragActive ? 'primary.main' : 'divider',
                    bgcolor: dragActive ? 'primary.50' : 'background.paper',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'primary.50',
                    },
                  }}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(true);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(false);
                    const files = e.dataTransfer.files;
                    if (files && files.length > 0) {
                      const event = { target: { files } } as any;
                      handleFileUpload(event);
                    }
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Upload className="w-10 h-10 mx-auto mb-2" style={{ color: '#3D7A68' }} />
                    <Typography variant="body1" sx={{ mb: 0.5, fontWeight: 500 }}>
                      Drag and drop files here
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
                      or
                    </Typography>
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<Upload className="w-4 h-4" />}
                      size="small"
                    >
                      Browse Files
                      <input
                        type="file"
                        hidden
                        multiple
                        onChange={handleFileUpload}
                      />
                    </Button>
                    <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1.5 }}>
                      Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
                    </Typography>
                  </Box>
                </Card>

                {/* Uploaded Documents Table */}
                {uploadedDocuments.length > 0 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Uploaded Documents ({uploadedDocuments.length})
                    </Typography>
                    <TableContainer component={Paper} variant="outlined">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Document Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Document Type</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>File Size</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Upload Date</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="center">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {uploadedDocuments.map((doc) => (
                            <TableRow key={doc.id} hover>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <File className="w-5 h-5" style={{ color: '#1A3D32' }} />
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {doc.name}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={doc.documentType.replace('_', ' ')}
                                  size="small"
                                  color="primary"
                                  sx={{ textTransform: 'capitalize' }}
                                />
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2">
                                  {(doc.size / 1024).toFixed(2)} KB
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2">
                                  {doc.uploadDate.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={doc.status}
                                  size="small"
                                  color={
                                    doc.status === 'ready' ? 'success' :
                                    doc.status === 'processing' ? 'warning' :
                                    doc.status === 'uploaded' ? 'info' :
                                    doc.status === 'failed' ? 'error' : 'default'
                                  }
                                  sx={{ textTransform: 'capitalize' }}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleRemoveDocument(doc.id)}
                                  sx={{ '&:hover': { bgcolor: 'error.lighter' } }}
                                >
                                  <X className="w-4 h-4" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
              </Box>
            </Paper>
          )}

          {/* Step 5: Review & Submit */}
          {currentStep === 5 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Header */}
              <Paper elevation={2} sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ p: 1, bgcolor: 'success.lighter', borderRadius: 1.5 }}>
                    <CheckCircle style={{ width: 20, height: 20, color: '#16a34a' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Review Your Shipment</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Please verify all information before submitting
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Shipment Type & Cargo Details Combined */}
              <Card>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 2 }}>
                    {/* Shipment Type */}
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Box sx={{ p: 0.75, bgcolor: 'primary.lighter', borderRadius: 1 }}>
                          <Package style={{ width: 16, height: 16, color: '#1A3D32' }} />
                        </Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Shipment Type</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: 500, ml: 4 }}>
                        {shipmentType}
                      </Typography>
                    </Box>

                    {/* Cargo Details */}
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Box sx={{ p: 0.75, bgcolor: 'secondary.lighter', borderRadius: 1 }}>
                          <BoxIcon style={{ width: 16, height: 16, color: '#3D7A68' }} />
                        </Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Cargo Details</Typography>
                      </Box>
                      
                      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5, ml: 4 }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Product Name</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{productName || '-'}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">HS Code</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{hsCode || '-'}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Quantity</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{quantity ? `${quantity} CBM` : '-'}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Weight</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{weight ? `${weight} KG` : '-'}</Typography>
                        </Box>
                        <Box>
                          <Chip 
                            label={complianceCritical === 'yes' ? 'Special Compliance' : 'Standard Cargo'}
                            size="small"
                            color={complianceCritical === 'yes' ? 'warning' : 'success'}
                            sx={{ height: 20, fontSize: '0.65rem' }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Route & Schedule Combined */}
              <Card>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                    {/* Route & Logistics */}
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Box sx={{ p: 0.75, bgcolor: 'info.lighter', borderRadius: 1 }}>
                          <Globe style={{ width: 16, height: 16, color: '#0284c7' }} />
                        </Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Route & Logistics</Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, ml: 4 }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Origin → Destination</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {originCountry?.name || '-'} → {destinationCountry?.name || '-'}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Transportation Mode</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                            {mode === 'sea' && <Ship style={{ width: 16, height: 16, color: '#1A3D32' }} />}
                            {mode === 'air' && <Plane style={{ width: 16, height: 16, color: '#1A3D32' }} />}
                            {mode === 'road' && <Truck style={{ width: 16, height: 16, color: '#1A3D32' }} />}
                            <Typography variant="body2" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
                              {mode ? `${mode} Freight` : '-'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    {/* Schedule */}
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Box sx={{ p: 0.75, bgcolor: 'warning.lighter', borderRadius: 1 }}>
                          <Package style={{ width: 16, height: 16, color: '#ea580c' }} />
                        </Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Schedule</Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, ml: 4 }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Pickup Date</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {pickupDate ? pickupDate.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            }) : '-'}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Estimated Arrival</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {eta ? eta.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            }) : '-'}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Partners Card */}
              <Card>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Box sx={{ p: 0.75, bgcolor: 'success.lighter', borderRadius: 1 }}>
                      <Users style={{ width: 16, height: 16, color: '#16a34a' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Selected Partners</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        {selectedPartners.length} {selectedPartners.length === 1 ? 'partner' : 'partners'} selected
                      </Typography>
                    </Box>
                  </Box>

                  {selectedPartners.length > 0 ? (
                    <Grid container spacing={1.5}>
                      {selectedPartners.map((partner, index) => (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={partner.id}>
                          <Card 
                            variant="outlined" 
                            sx={{ 
                              borderColor: 'success.main',
                              bgcolor: 'success.50',
                            }}
                          >
                            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                              <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5 }}>
                                <Box
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'success.main',
                                    color: 'white',
                                    flexShrink: 0,
                                    fontWeight: 700,
                                    fontSize: '0.875rem',
                                  }}
                                >
                                  {index + 1}
                                </Box>
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.75, lineHeight: 1.3 }}>
                                    {partner.companyName}
                                  </Typography>

                                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                    <Box>
                                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                        Contact: {partner.contactPerson}
                                      </Typography>
                                    </Box>

                                    <Box>
                                      <Typography 
                                        variant="caption" 
                                        color="text.secondary" 
                                        sx={{ 
                                          fontSize: '0.7rem',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                          display: 'block'
                                        }}
                                      >
                                        {partner.email}
                                      </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                        {partner.country}
                                      </Typography>
                                      {partner.partnerType && (
                                        <Chip
                                          label={partner.partnerType.replace('_', ' ')}
                                          size="small"
                                          color="success"
                                          sx={{ 
                                            textTransform: 'capitalize',
                                            height: 18,
                                            fontSize: '0.6rem',
                                            '& .MuiChip-label': { px: 0.75 }
                                          }}
                                        />
                                      )}
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Alert severity="warning" sx={{ py: 0.5 }}>
                      No partners selected for this shipment
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Documents Card */}
              <Card>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Box sx={{ p: 0.75, bgcolor: 'info.lighter', borderRadius: 1 }}>
                      <FileText style={{ width: 16, height: 16, color: '#0284c7' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Uploaded Documents</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        {uploadedDocuments.length} {uploadedDocuments.length === 1 ? 'document' : 'documents'} attached
                      </Typography>
                    </Box>
                  </Box>

                  {uploadedDocuments.length > 0 ? (
                    <Grid container spacing={1.5}>
                      {uploadedDocuments.map((doc) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={doc.id}>
                          <Card 
                            variant="outlined" 
                            sx={{ 
                              borderColor: 'divider',
                              bgcolor: 'grey.50',
                            }}
                          >
                            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                              <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5 }}>
                                <Box
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'info.main',
                                    flexShrink: 0,
                                  }}
                                >
                                  <File style={{ width: 16, height: 16, color: 'white' }} />
                                </Box>
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                  <Typography 
                                    variant="subtitle2" 
                                    sx={{ 
                                      fontWeight: 600, 
                                      mb: 0.5, 
                                      lineHeight: 1.3,
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {doc.fileName}
                                  </Typography>

                                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                      Type: {doc.documentType.replace('_', ' ').split(' ').map(word => 
                                        word.charAt(0).toUpperCase() + word.slice(1)
                                      ).join(' ')}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                        {doc.fileSize}
                                      </Typography>
                                      <Chip
                                        label={doc.status}
                                        size="small"
                                        color={
                                          doc.status === 'Uploaded' ? 'success' :
                                          doc.status === 'Processing' ? 'warning' : 'default'
                                        }
                                        sx={{ 
                                          height: 18,
                                          fontSize: '0.6rem',
                                          '& .MuiChip-label': { px: 0.75 }
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Alert severity="info" sx={{ py: 0.5 }}>
                      No documents uploaded for this shipment
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {error && (
                <Alert severity="error" icon={<AlertCircle />}>
                  {error}
                </Alert>
              )}
            </Box>
          )}

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              variant="outlined"
              onClick={currentStep === 0 ? onBack : handleBack}
              size="large"
            >
              {currentStep === 0 ? 'Cancel' : 'Previous'}
            </Button>
            <Box sx={{ flex: 1 }} />
            {currentStep < 5 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!canProceed}
                size="large"
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                disabled={loading}
                startIcon={<CheckCircle />}
                size="large"
              >
                Submit Shipment
              </Button>
            )}
          </Box>
        </Box>
      </LocalizationProvider>
    </div>
  );
}