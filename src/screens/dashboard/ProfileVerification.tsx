import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Tooltip,
} from '@mui/material';
import { Upload, CreditCard } from 'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/selectors/authSelectors';
import { hasPermission } from '../../utils/roleUtils';
import { Permission } from '../../utils/permissions';

export function ProfileVerification() {
  const currentUser = useAppSelector(selectCurrentUser);
  const canSubmitVerification = hasPermission(currentUser, Permission.SUBMIT_PROFILE_VERIFICATION);
  
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    countryOfResidence: '',
    cityState: '',
    visaStatus: '',
    timeZone: 'America/Chicago',
    occupation: '',
    industryField: '',
    workExperience: '',
    businessActivity: '',
    capitalRange: '',
    tradingType: '',
    declaration: false,
    consent: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    creditScore: null as File | null,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setUploadedFiles((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = [
      'fullName',
      'dateOfBirth',
      'nationality',
      'countryOfResidence',
      'cityState',
      'occupation',
      'workExperience',
      'businessActivity',
      'capitalRange',
      'tradingType',
    ];

    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      alert('Please fill all required fields');
      return;
    }

    if (!formData.declaration || !formData.consent) {
      alert('Please accept both declaration and consent');
      return;
    }

    console.log('Form submitted:', formData, uploadedFiles);
    alert('Profile verification submitted successfully!');
  };

  return (
    <Box>
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Profile Verification' }]} />

      {/* Intro Message */}
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: '#4B5563',
          fontSize: '0.9375rem',
          lineHeight: 1.6,
        }}
      >
        To ensure safe, compliant participation and to provide appropriate trade opportunities, we
        require basic profile verification from all participants.
      </Typography>

      {/* Section 1: Personal & Residency Details */}
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: 2,
          p: 4,
          border: '1px solid #E5E7EB',
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: '#111827',
            mb: 3,
            fontSize: '1.0625rem',
          }}
        >
          Section 1: Personal & Residency Details
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Row 1: Full Name - Full Width */}
          <Box>
            <TextField
              fullWidth
              required
              label="Full Name (as per passport)"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                },
              }}
            />
          </Box>

          {/* Row 2: Date of Birth and Nationality */}
          <Box sx={{ display: 'flex', gap: 2.5 }}>
            <TextField
              type="date"
              required
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                width: '200px',
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                  '& input': {
                    fontSize: '0.9375rem',
                  },
                },
              }}
            />

            <TextField
              required
              label="Nationality"
              value={formData.nationality}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
              placeholder="Enter your nationality"
              sx={{
                width: '200px',
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                  '& input': {
                    fontSize: '0.9375rem',
                  },
                },
              }}
            />
          </Box>

          {/* Row 3: Country of Residence and City/State */}
          <Box sx={{ display: 'flex', gap: 2.5 }}>
            <TextField
              required
              label="Country of Residence"
              value={formData.countryOfResidence}
              onChange={(e) => handleInputChange('countryOfResidence', e.target.value)}
              placeholder="Enter country"
              sx={{
                width: '200px',
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                  '& input': {
                    fontSize: '0.9375rem',
                  },
                },
              }}
            />

            <TextField
              required
              label="City / State"
              value={formData.cityState}
              onChange={(e) => handleInputChange('cityState', e.target.value)}
              placeholder="Enter city / state"
              sx={{
                width: '200px',
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                  '& input': {
                    fontSize: '0.9375rem',
                  },
                },
              }}
            />
          </Box>

          {/* Row 4: Current Visa Status and Time Zone */}
          <Box sx={{ display: 'flex', gap: 2.5 }}>
            <FormControl sx={{ width: '200px' }}>
              <Select
                value={formData.visaStatus}
                onChange={(e) => handleInputChange('visaStatus', e.target.value)}
                displayEmpty
                renderValue={(value) => value || 'Current Visa Status (optional)'}
                sx={{
                  bgcolor: 'white',
                  fontSize: '0.9375rem',
                }}
              >
                <MenuItem value="">Select visa status</MenuItem>
                <MenuItem value="citizen">Citizen</MenuItem>
                <MenuItem value="permanent-resident">Permanent Resident</MenuItem>
                <MenuItem value="work-visa">Work Visa</MenuItem>
                <MenuItem value="student-visa">Student Visa</MenuItem>
                <MenuItem value="tourist-visa">Tourist Visa</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Time Zone"
              value={formData.timeZone}
              onChange={(e) => handleInputChange('timeZone', e.target.value)}
              disabled
              sx={{
                width: '200px',
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#F9FAFB',
                  '& input': {
                    fontSize: '0.9375rem',
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Section 2: Professional Background */}
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: 2,
          p: 4,
          border: '1px solid #E5E7EB',
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: '#111827',
            mb: 3,
            fontSize: '1.0625rem',
          }}
        >
          Section 2: Professional Background
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Current Occupation - Full Width */}
          <FormControl fullWidth required>
            <Select
              value={formData.occupation}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
              displayEmpty
              renderValue={(value) => value || 'Current Occupation *'}
              sx={{
                bgcolor: 'white',
                fontSize: '0.9375rem',
              }}
            >
              <MenuItem value="">Select occupation</MenuItem>
              <MenuItem value="employed">Employed</MenuItem>
              <MenuItem value="self-employed">Self-Employed</MenuItem>
              <MenuItem value="business-owner">Business Owner</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="retired">Retired</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          {/* Industry/Field and Years of Experience - 2/3 width */}
          <Box sx={{ maxWidth: '66.67%' }}>
            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Industry / Field of Work"
                  value={formData.industryField}
                  onChange={(e) => handleInputChange('industryField', e.target.value)}
                  placeholder="e.g., Technology, Healthcare, Finance"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'white',
                      '& input': {
                        fontSize: '0.9375rem',
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <Select
                    value={formData.workExperience}
                    onChange={(e) => handleInputChange('workExperience', e.target.value)}
                    displayEmpty
                    renderValue={(value) => value || 'Years of Work Experience *'}
                    sx={{
                      bgcolor: 'white',
                      fontSize: '0.9375rem',
                    }}
                  >
                    <MenuItem value="">Select experience</MenuItem>
                    <MenuItem value="0-2">0-2 years</MenuItem>
                    <MenuItem value="3-5">3-5 years</MenuItem>
                    <MenuItem value="6-10">6-10 years</MenuItem>
                    <MenuItem value="11-15">11-15 years</MenuItem>
                    <MenuItem value="15+">15+ years</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {/* Business Activity */}
          <FormControl fullWidth required>
            <Select
              value={formData.businessActivity}
              onChange={(e) => handleInputChange('businessActivity', e.target.value)}
              displayEmpty
              renderValue={(value) => value || 'Have you been involved in any business activity earlier? *'}
              sx={{
                bgcolor: 'white',
                fontSize: '0.9375rem',
              }}
            >
              <MenuItem value="">Select option</MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Section 3: Trade Readiness (Non-Technical) */}
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: 2,
          p: 4,
          border: '1px solid #E5E7EB',
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: '#111827',
            mb: 0.5,
            fontSize: '1.0625rem',
          }}
        >
          Section 3: Trade Readiness (Non-Technical)
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#9CA3AF',
            mb: 3,
            fontSize: '0.875rem',
          }}
        >
          Informational only — no disqualification
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Capital Comfort Range */}
          <FormControl fullWidth required>
            <Select
              value={formData.capitalRange}
              onChange={(e) => handleInputChange('capitalRange', e.target.value)}
              displayEmpty
              renderValue={(value) => value || 'Estimated capital comfort range for initial trades *'}
              sx={{
                bgcolor: 'white',
                fontSize: '0.9375rem',
              }}
            >
              <MenuItem value="">Select range</MenuItem>
              <MenuItem value="0-10k">$0 - $10,000</MenuItem>
              <MenuItem value="10k-50k">$10,000 - $50,000</MenuItem>
              <MenuItem value="50k-100k">$50,000 - $100,000</MenuItem>
              <MenuItem value="100k-500k">$100,000 - $500,000</MenuItem>
              <MenuItem value="500k+">$500,000+</MenuItem>
            </Select>
          </FormControl>

          {/* Trading Type */}
          <FormControl fullWidth required>
            <Select
              value={formData.tradingType}
              onChange={(e) => handleInputChange('tradingType', e.target.value)}
              displayEmpty
              renderValue={(value) => value || 'Do you intend to trade individually or with family/partners? *'}
              sx={{
                bgcolor: 'white',
                fontSize: '0.9375rem',
              }}
            >
              <MenuItem value="">Select option</MenuItem>
              <MenuItem value="individual">Individually</MenuItem>
              <MenuItem value="family">With Family</MenuItem>
              <MenuItem value="partners">With Partners</MenuItem>
              <MenuItem value="both">Both Individual and with Partners</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Section 4: Document Uploads */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: '#111827',
          mb: 0.5,
          fontSize: '1.0625rem',
        }}
      >
        Section 4: Document Uploads
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: '#9CA3AF',
          mb: 3,
          fontSize: '0.875rem',
        }}
      >
        Upload required documents for verification
      </Typography>

      {/* Credit Score */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3,
          borderRadius: 2,
          bgcolor: 'white',
          border: '1px solid #E5E7EB',
          mb: uploadedFiles.creditScore ? 1 : 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: '#D3FF62',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CreditCard size={24} color="#1A3D32" strokeWidth={2} />
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#111827',
                fontSize: '0.9375rem',
              }}
            >
              Credit Score
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#9CA3AF',
                fontSize: '0.875rem',
              }}
            >
              Upload credit report or score certificate
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          component="label"
          startIcon={<Upload size={18} />}
          sx={{
            textTransform: 'none',
            borderColor: '#D1D5DB',
            color: '#374151',
            bgcolor: 'white',
            fontWeight: 500,
            '&:hover': {
              borderColor: '#9CA3AF',
              bgcolor: '#F9FAFB',
            },
          }}
        >
          Upload
          <input
            type="file"
            hidden
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              handleFileUpload('creditScore', file);
            }}
          />
        </Button>
      </Box>
      {uploadedFiles.creditScore && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#10B981',
              fontSize: '0.875rem',
              ml: 8,
            }}
          >
            ✓ {uploadedFiles.creditScore.name}
          </Typography>
        </Box>
      )}

      {/* Section 5: Compliance & Declaration */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: '#111827',
          mb: 3,
          fontSize: '1.0625rem',
        }}
      >
        Section 5: Compliance & Declaration
      </Typography>

      {/* Declaration */}
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: 'white',
          border: '1px solid #E5E7EB',
          mb: 2,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.declaration}
              onChange={(e) => handleInputChange('declaration', e.target.checked)}
              sx={{
                color: '#D1D5DB',
                '&.Mui-checked': {
                  color: '#3D7A68',
                },
              }}
            />
          }
          label={
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: '#111827',
                  mb: 0.5,
                  fontSize: '0.875rem',
                }}
              >
                Declaration *
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#6B7280',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                }}
              >
                I confirm that the information provided above is accurate to the best of my
                knowledge. I understand that TIMPEX provides training, opportunity access, and
                execution support, and that all trading decisions remain my responsibility.
              </Typography>
            </Box>
          }
          sx={{ alignItems: 'flex-start', ml: 0 }}
        />
      </Box>

      {/* Consent */}
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: 'white',
          border: '1px solid #E5E7EB',
          mb: 4,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.consent}
              onChange={(e) => handleInputChange('consent', e.target.checked)}
              sx={{
                color: '#D1D5DB',
                '&.Mui-checked': {
                  color: '#3D7A68',
                },
              }}
            />
          }
          label={
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: '#111827',
                  mb: 0.5,
                  fontSize: '0.875rem',
                }}
              >
                Consent *
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#6B7280',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                }}
              >
                I consent to TIMPEX using this information for verification, training allocation,
                and trade opportunity matching.
              </Typography>
            </Box>
          }
          sx={{ alignItems: 'flex-start', ml: 0 }}
        />
      </Box>

      {/* Submit Button */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <Tooltip 
          title={!canSubmitVerification ? "Only administrators can submit profile verifications" : ""}
          arrow
          placement="top"
        >
          <Box sx={{ width: '100%', maxWidth: '600px' }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{
                bgcolor: '#1A3D32',
                color: 'white',
                textTransform: 'none',
                fontWeight: 600,
                py: 2,
                fontSize: '1rem',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: '#0F2620',
                },
                '&.Mui-disabled': {
                  bgcolor: '#9CA3AF',
                  color: 'white',
                },
              }}
              disabled={!canSubmitVerification}
            >
              Submit Verification
            </Button>
          </Box>
        </Tooltip>
        
        {!canSubmitVerification && (
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              color: '#6B7280',
              fontSize: '0.875rem',
              textAlign: 'center',
            }}
          >
            Note: You can view and fill out this form, but only administrators can submit verifications.
          </Typography>
        )}
      </Box>
    </Box>
  );
}