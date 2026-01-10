import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Grid,
  Card,
  CardContent,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  UserCheck,
  Building2,
  CheckCircle,
  Package,
  Ship,
  Plane,
  Landmark,
  ShieldCheck,
  Search,
  MapPin,
} from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { AnimatedStepper } from './common/AnimatedStepper';
import type { Partner } from '../types';
import { useGetPartnerTypesQuery, useGetCountriesQuery, Country } from '../store/api/referenceDataApi';
import { useCreatePartnerMutation, useUpdatePartnerMutation, useGetPartnerByIdQuery } from '../store/api/partnersApi';
import { useSnackbar } from 'notistack';

interface StepConfig {
  label: string;
  icon: any;
  description: string;
}

interface CreatePartnerProps {
  onBack: () => void;
  onPartnerCreated?: (partner: Partner) => void;
  preselectedPartnerType?: string;
  partnerId?: number; // Add partnerId for edit mode
  isEditMode?: boolean; // Add isEditMode flag
}

const partnerSteps: StepConfig[] = [
  { label: 'Partner Type', icon: UserCheck, description: 'Select partner type' },
  { label: 'Company Info', icon: Building2, description: 'Company details' },
  { label: 'Review & Submit', icon: CheckCircle, description: 'Confirm details' },
];

// Icon mapping for partner types
const partnerTypeIcons: Record<string, any> = {
  'IMPORTER': Package,
  'EXPORTER': Ship,
  'CHA': Building2,
  'FF': Plane,
  'BANK': Landmark,
  'INSURANCE': ShieldCheck,
  'SURVEYOR': Search,
};

export function CreatePartner({
  onBack,
  onPartnerCreated,
  preselectedPartnerType,
  partnerId,
  isEditMode,
}: CreatePartnerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [partnerTypes, setPartnerTypes] = useState<string[]>(preselectedPartnerType ? [preselectedPartnerType] : []);
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [cell, setCell] = useState('');
  const [website, setWebsite] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [servicesOffered, setServicesOffered] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // RTK Query hooks
  const { 
    data: partnerTypesData, 
    isLoading: isLoadingPartnerTypes,
    error: partnerTypesError,
    isSuccess: isPartnerTypesSuccess,
  } = useGetPartnerTypesQuery();

  const { data: countries = [], isLoading: isLoadingCountries } = useGetCountriesQuery();

  const [createPartner, { isLoading: isCreating }] = useCreatePartnerMutation();
  const [updatePartner, { isLoading: isUpdating }] = useUpdatePartnerMutation();
  const { data: partnerData, isLoading: isLoadingPartner } = useGetPartnerByIdQuery(partnerId || 0, { skip: !isEditMode });

  const serviceOptions = [
    'Sea Freight',
    'Air Freight',
    'Road Freight',
    'Customs Clearance',
    'Warehousing',
    'Documentation',
    'Insurance',
    'Packaging',
  ];

  const handleServiceToggle = (service: string) => {
    setServicesOffered((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleNext = () => {
    setError('');
    if (validateStep(currentStep)) {
      if (currentStep === partnerSteps.length - 1) {
        if (partnerId) {
          handleUpdate();
        } else {
          handleSubmit();
        }
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      onBack();
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return partnerTypes.length > 0;
      case 1:
        return name !== '' && selectedCountry !== null && email !== '' && cell !== '';
      case 2:
        return true; // Review step
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    try {
      setError('');

      // Convert partner type codes to IDs
      const partnerTypeIds = selectedPartnerTypesDetails.map(pt => pt.id);

      const result = await createPartner({
        partnerTypeIds: partnerTypeIds,
        name: name,
        email: email,
        phone: cell,
        website: website,
        countryId: selectedCountry?.id || 1,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        state: state,
        postalCode: postalCode,
      }).unwrap();

      setSuccess(true);
      enqueueSnackbar('Partner created successfully!', { variant: 'success' });
      
      if (onPartnerCreated) {
        onPartnerCreated(result as any);
      }
      
      setTimeout(() => {
        onBack();
      }, 2000);
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || 'Failed to create partner';
      setError(errorMessage);
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  const handleUpdate = async () => {
    try {
      setError('');

      // Convert partner type codes to IDs
      const partnerTypeIds = selectedPartnerTypesDetails.map(pt => pt.id);

      const result = await updatePartner({
        id: partnerId || 0,
        data: {
          partnerTypeIds: partnerTypeIds,
          name: name,
          email: email,
          phone: cell,
          website: website,
          countryId: selectedCountry?.id || 1,
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          city: city,
          state: state,
          postalCode: postalCode,
        }
      }).unwrap();

      setSuccess(true);
      enqueueSnackbar('Partner updated successfully!', { variant: 'success' });
      
      if (onPartnerCreated) {
        onPartnerCreated(result as any);
      }
      
      setTimeout(() => {
        onBack();
      }, 2000);
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || 'Failed to update partner';
      setError(errorMessage);
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  const isStepValid = (step: number): boolean => {
    return validateStep(step);
  };

  // Find selected partner type details
  const selectedPartnerTypesDetails = partnerTypesData?.filter(
    (pt) => partnerTypes.includes(pt.code)
  ) || [];
  
  // Load partner data in edit mode
  useEffect(() => {
    if (partnerId && partnerData && countries.length > 0) {
      setName(partnerData.name);
      setEmail(partnerData.email);
      setCell(partnerData.phone);
      setWebsite(partnerData.website || '');
      setSelectedCountry(countries.find(c => c.id === partnerData.countryId) || null);
      setAddressLine1(partnerData.addressLine1 || '');
      setAddressLine2(partnerData.addressLine2 || '');
      setCity(partnerData.city || '');
      setState(partnerData.state || '');
      setPostalCode(partnerData.postalCode || '');
      setPartnerTypes(partnerData.partnerTypes.map(pt => pt.code));
    }
  }, [partnerId, partnerData, countries]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', pb: 4 }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'divider', py: 2 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
          <Breadcrumb
            items={[
              { label: 'Dashboard', path: '/dashboard' },
              { label: 'Partners', path: '/dashboard/partners' },
              { label: 'Add New Partner' },
            ]}
          />
          <Typography variant="h4" sx={{ mt: 2, fontWeight: 600 }}>
            Add New Business Partner
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Register a new business partner for collaboration
          </Typography>
        </Box>
      </Box>

      {/* Stepper */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, mt: 4 }}>
        <AnimatedStepper steps={partnerSteps} activeStep={currentStep} />
      </Box>

      {/* Form */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, mt: 4 }}>
        {/* Step 0: Partner Type */}
        {currentStep === 0 && (
          <Paper elevation={2} sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <UserCheck style={{ width: 32, height: 32, color: '#2563eb' }} />
              <Box>
                <Typography variant="h5">Select Partner Types</Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose one or more types for this business partner
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Loading State */}
            {isLoadingPartnerTypes && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            )}

            {/* Error State */}
            {partnerTypesError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                Failed to load partner types. Please try again.
              </Alert>
            )}

            {/* Partner Types Autocomplete */}
            {!isLoadingPartnerTypes && !partnerTypesError && partnerTypesData && (
              <Autocomplete
                multiple
                id="partner-types-autocomplete"
                options={partnerTypesData}
                getOptionLabel={(option) => option.name}
                value={partnerTypesData.filter((pt) => partnerTypes.includes(pt.code))}
                onChange={(event, newValue) => {
                  setPartnerTypes(newValue.map((v) => v.code));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Partner Types"
                    placeholder="Select partner types"
                    helperText="Select one or more partner types that apply to this business"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    const Icon = partnerTypeIcons[option.code] || Building2;
                    return (
                      <Chip
                        {...getTagProps({ index })}
                        key={option.code}
                        icon={<Icon style={{ width: 16, height: 16 }} />}
                        label={option.name}
                        color="primary"
                        variant="outlined"
                      />
                    );
                  })
                }
                renderOption={(props, option) => {
                  const Icon = partnerTypeIcons[option.code] || Building2;
                  return (
                    <Box component="li" {...props}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: partnerTypes.includes(option.code) ? 'primary.main' : 'grey.100',
                            color: partnerTypes.includes(option.code) ? 'white' : 'text.secondary',
                          }}
                        >
                          <Icon style={{ width: 20, height: 20 }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {option.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {option.code}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                }}
                sx={{ mb: 2 }}
              />
            )}

            {/* Visual Cards Display (optional - shows selected types) */}
            {partnerTypes.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Selected Partner Types
                </Typography>
                <Grid container spacing={2}>
                  {selectedPartnerTypesDetails.map((type) => {
                    const Icon = partnerTypeIcons[type.code] || Building2;
                    return (
                      <Grid item xs={12} sm={6} md={4} key={type.code}>
                        <Card
                          sx={{
                            p: 2,
                            border: 2,
                            borderColor: 'primary.main',
                            bgcolor: 'primary.50',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'primary.main',
                                color: 'white',
                              }}
                            >
                              <Icon style={{ width: 20, height: 20 }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {type.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {type.code}
                              </Typography>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            )}
          </Paper>
        )}

        {/* Step 1: Company Info */}
        {currentStep === 1 && (
          <Paper elevation={2} sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Building2 style={{ width: 32, height: 32, color: '#2563eb' }} />
              <Box>
                <Typography variant="h5">Company Information</Typography>
                <Typography variant="body2" color="text.secondary">
                  Enter the partner's business details
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              {/* Company Name */}
              <TextField
                id="companyName"
                name="companyName"
                label="Company Name"
                required
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* Contact Person */}
              <TextField
                id="contactPerson"
                name="contactPerson"
                label="Contact Person"
                fullWidth
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
              />

              {/* Email */}
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Phone Number */}
              <TextField
                id="phone"
                name="phone"
                type="tel"
                label="Phone Number"
                required
                fullWidth
                value={cell}
                onChange={(e) => setCell(e.target.value)}
              />

              {/* Website */}
              <TextField
                id="website"
                name="website"
                type="url"
                label="Website"
                fullWidth
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />

              {/* Address Line 1 */}
              <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
                <TextField
                  id="addressLine1"
                  name="addressLine1"
                  label="Address Line 1"
                  fullWidth
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  multiline
                  rows={2}
                />
              </Box>

              {/* Address Line 2 */}
              <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
                <TextField
                  id="addressLine2"
                  name="addressLine2"
                  label="Address Line 2"
                  fullWidth
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  multiline
                  rows={2}
                />
              </Box>

              {/* City */}
              <TextField
                id="city"
                name="city"
                label="City"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              {/* State */}
              <TextField
                id="state"
                name="state"
                label="State"
                fullWidth
                value={state}
                onChange={(e) => setState(e.target.value)}
              />

              {/* Country */}
              <Autocomplete
                id="country"
                name="country"
                label="Country"
                required
                fullWidth
                value={selectedCountry}
                onChange={(event, newValue) => {
                  setSelectedCountry(newValue);
                }}
                options={countries}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    placeholder="Select country"
                    helperText="Select the country where the partner is based"
                  />
                )}
                sx={{ mb: 2 }}
              />

              {/* Postal Code */}
              <TextField
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                fullWidth
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />

              {/* Services Offered */}
              <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Services Offered</FormLabel>
                  <FormGroup row>
                    {serviceOptions.map((service) => (
                      <FormControlLabel
                        key={service}
                        control={
                          <Checkbox
                            checked={servicesOffered.includes(service)}
                            onChange={() => handleServiceToggle(service)}
                          />
                        }
                        label={service}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Box>
            </Box>
          </Paper>
        )}

        {/* Step 2: Review & Submit */}
        {currentStep === 2 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Header */}
            <Paper elevation={2} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ p: 1.5, bgcolor: 'success.lighter', borderRadius: 2 }}>
                  <CheckCircle style={{ width: 24, height: 24, color: '#16a34a' }} />
                </Box>
                <Box>
                  <Typography variant="h5">Review Partner Details</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Please verify all information before submitting
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Partner Types Card */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ p: 1.5, bgcolor: 'primary.lighter', borderRadius: 2 }}>
                    <Building2 style={{ width: 20, height: 20, color: '#2563eb' }} />
                  </Box>
                  <Typography variant="h6">Partner Types</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedPartnerTypesDetails.map((type) => {
                    const Icon = partnerTypeIcons[type.code] || Building2;
                    return (
                      <Chip
                        key={type.code}
                        icon={<Icon style={{ width: 16, height: 16 }} />}
                        label={type.name}
                        color="primary"
                        variant="filled"
                      />
                    );
                  })}
                </Box>
              </CardContent>
            </Card>

            {/* Company Information Card */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Box sx={{ p: 1.5, bgcolor: 'secondary.lighter', borderRadius: 2 }}>
                    <Building2 style={{ width: 20, height: 20, color: '#7c3aed' }} />
                  </Box>
                  <Typography variant="h6">Company Information</Typography>
                </Box>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                  {/* Company Name */}
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Company Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {name}
                    </Typography>
                  </Box>

                  {/* Contact Person */}
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Contact Person
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {contactPerson || '-'}
                    </Typography>
                  </Box>

                  {/* Email */}
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {email}
                    </Typography>
                  </Box>

                  {/* Phone */}
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Phone Number
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {cell}
                    </Typography>
                  </Box>

                  {/* Website */}
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Website
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {website || '-'}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Address Card */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ p: 1.5, bgcolor: 'info.lighter', borderRadius: 2 }}>
                    <MapPin style={{ width: 20, height: 20, color: '#0284c7' }} />
                  </Box>
                  <Typography variant="h6">Address</Typography>
                </Box>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr' }, gap: 3 }}>
                  {/* Street Address */}
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Street Address
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {addressLine1 || '-'}
                    </Typography>
                  </Box>

                  {/* City */}
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      City
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {city || '-'}
                    </Typography>
                  </Box>

                  {/* Postal Code */}
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Postal Code
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {postalCode || '-'}
                    </Typography>
                  </Box>

                  {/* Country */}
                  <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 3' } }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Country
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {selectedCountry?.name || '-'}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Services Card */}
            {servicesOffered.length > 0 && (
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ p: 1.5, bgcolor: 'warning.lighter', borderRadius: 2 }}>
                      <Package style={{ width: 20, height: 20, color: '#ea580c' }} />
                    </Box>
                    <Typography variant="h6">Services Offered</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {servicesOffered.map((service) => (
                      <Chip
                        key={service}
                        label={service}
                        color="warning"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mt: 3 }}>
                Partner created successfully! Redirecting...
              </Alert>
            )}
          </Box>
        )}

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={isCreating || isUpdating}
            size="large"
          >
            {currentStep === 0 ? 'Cancel' : 'Back'}
          </Button>

          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!isStepValid(currentStep) || isCreating || isUpdating}
            size="large"
            startIcon={isCreating && <CircularProgress size={20} />}
          >
            {isCreating
              ? 'Creating...'
              : isUpdating
              ? 'Updating...'
              : currentStep === partnerSteps.length - 1
              ? 'Create Partner'
              : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}