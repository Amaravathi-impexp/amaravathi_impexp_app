import { 
  Ship, 
  Package, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  FileText, 
  User, 
  Building2, 
  Weight, 
  Box as BoxIcon, 
  AlertCircle, 
  Upload,
  Save,
  X,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  Trash2,
  Plus
} from 'lucide-react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
  Box,
  Paper,
  Typography,
  Grid,
  IconButton,
  Chip,
} from '@mui/material';
import { Breadcrumb } from './Breadcrumb';
import type { Shipment } from '../types';
import { useState } from 'react';

interface ModifyShipmentProps {
  shipment: Shipment;
  onBack: () => void;
  onShipmentModified: () => void;
}

export function ModifyShipment({ shipment, onBack, onShipmentModified }: ModifyShipmentProps) {
  // Form state for shipment details
  const [formData, setFormData] = useState({
    // Basic Info
    shipmentType: 'Export',
    mode: 'Sea Freight',
    incoterms: 'FOB',
    
    // Origin & Destination
    origin: shipment.origin || 'Mumbai, India',
    destination: shipment.destination || 'Los Angeles, USA',
    originPort: 'INMUN - Jawaharlal Nehru Port',
    destinationPort: 'USLAX - Port of Los Angeles',
    
    // Container Info
    containerNumber: shipment.containerNumber || 'MSCU4567890',
    containerType: '40ft High Cube',
    sealNumber: 'SEAL-789456',
    
    // Cargo Details
    cargoDescription: shipment.cargo,
    weight: shipment.weight || 18500,
    volume: shipment.volume || 65,
    numberOfPackages: 450,
    hsCode: '8471.30.00',
    
    // Status & Location
    currentLocation: shipment.currentLocation,
    status: shipment.status,
    
    // Parties
    shipper: 'ABC Electronics Pvt Ltd',
    shipperAddress: '123 Industrial Area, Mumbai, Maharashtra 400001, India',
    consignee: 'XYZ Imports LLC',
    consigneeAddress: '456 Commerce St, Los Angeles, CA 90001, USA',
    
    // Service Providers
    freightForwarder: 'Global Logistics Solutions',
    cha: 'Mumbai Customs Clearing Co.',
    shippingLine: 'Maersk Line',
    vesselName: 'MSC GULSUN',
    voyageNumber: 'VOY-2024-089',
    
    // Dates
    departureDate: '2024-12-05',
    estimatedArrival: shipment.eta,
    
    // Commercial
    cargoValue: 125000,
    currency: 'USD',
    freightCharges: 4500,
    insuranceValue: 130000,
    
    // Special Instructions
    specialInstructions: 'Handle with care. Temperature sensitive cargo.',
    
    // Alert
    alert: shipment.alert || '',
  });

  // Document upload state
  const [uploadedDocuments, setUploadedDocuments] = useState([
    { id: 1, name: 'Commercial Invoice', file: 'invoice.pdf', size: '2.4 MB', uploadedDate: 'Dec 24, 2024', status: 'approved' },
    { id: 2, name: 'Packing List', file: 'packing_list.pdf', size: '1.8 MB', uploadedDate: 'Dec 24, 2024', status: 'approved' },
    { id: 3, name: 'Bill of Lading', file: 'bol.pdf', size: '856 KB', uploadedDate: 'Dec 23, 2024', status: 'pending' },
  ]);

  const [documentType, setDocumentType] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save shipment modifications
    // TODO: Implement API call to update shipment
    onShipmentModified();
  };

  // Document upload handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleDocumentUpload = () => {
    if (selectedFile && documentType) {
      const newDoc = {
        id: uploadedDocuments.length + 1,
        name: documentType,
        file: selectedFile.name,
        size: (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB',
        uploadedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'pending'
      };
      setUploadedDocuments([...uploadedDocuments, newDoc]);
      setSelectedFile(null);
      setDocumentType('');
    }
  };

  const handleDeleteDocument = (id: number) => {
    setUploadedDocuments(uploadedDocuments.filter(doc => doc.id !== id));
  };

  const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
    switch (status) {
      case 'Booked':
        return 'info';
      case 'In Transit':
        return 'primary';
      case 'Cleared':
      case 'Delivered':
        return 'success';
      case 'Delayed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getDocumentStatusBadge = (status: string) => {
    const colorMap: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
      approved: 'success',
      pending: 'warning',
      rejected: 'error',
    };
    return (
      <Chip 
        label={status.charAt(0).toUpperCase() + status.slice(1)} 
        color={colorMap[status] || 'default'}
        size="small"
      />
    );
  };

  // Determine which fields can be edited based on status
  const canEditBasicInfo = ['Booked', 'Delayed'].includes(formData.status);
  const canEditLocation = true; // Always editable for tracking
  const canEditDates = ['Booked'].includes(formData.status);
  const canEditCommercial = ['Booked'].includes(formData.status);

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Shipments', href: '#' },
          { label: shipment.id },
          { label: 'Modify' },
        ]}
      />

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={onBack}
            startIcon={<span>←</span>}
          >
            Back
          </Button>
          <Box>
            <Typography variant="h4">Modify Shipment</Typography>
            <Typography variant="body2" color="text.secondary">
              Shipment ID: {shipment.id}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<Save className="w-5 h-5" />}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Box>

      {/* Alert Banner */}
      <Alert severity="info" icon={<AlertCircle className="w-5 h-5" />} sx={{ mb: 3 }}>
        <Typography variant="body2">
          Some fields may be locked based on the current shipment status:{' '}
          <Chip 
            label={formData.status} 
            color={getStatusColor(formData.status)} 
            size="small" 
            sx={{ ml: 1 }}
          />
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
          Contact support if you need to modify locked fields.
        </Typography>
      </Alert>

      {/* Shipment Details Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Ship className="w-5 h-5" style={{ color: '#1A3D32' }} />
          <Typography variant="h5">Shipment Details</Typography>
        </Box>

        {/* Three Column Grid */}
        <Grid container spacing={3}>
          {/* Column 1: Basic Information */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Typography variant="subtitle2" sx={{ pb: 1, borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              Basic Information
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth disabled={!canEditBasicInfo}>
                <InputLabel>Shipment Type</InputLabel>
                <Select
                  value={formData.shipmentType}
                  label="Shipment Type"
                  onChange={(e) => handleInputChange('shipmentType', e.target.value)}
                >
                  <MenuItem value="Export">Export</MenuItem>
                  <MenuItem value="Import">Import</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth disabled={!canEditBasicInfo}>
                <InputLabel>Mode</InputLabel>
                <Select
                  value={formData.mode}
                  label="Mode"
                  onChange={(e) => handleInputChange('mode', e.target.value)}
                >
                  <MenuItem value="Sea Freight">Sea Freight</MenuItem>
                  <MenuItem value="Air Freight">Air Freight</MenuItem>
                  <MenuItem value="Road Freight">Road Freight</MenuItem>
                  <MenuItem value="Rail Freight">Rail Freight</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth disabled={!canEditBasicInfo}>
                <InputLabel>Incoterms</InputLabel>
                <Select
                  value={formData.incoterms}
                  label="Incoterms"
                  onChange={(e) => handleInputChange('incoterms', e.target.value)}
                >
                  <MenuItem value="FOB">FOB (Free On Board)</MenuItem>
                  <MenuItem value="CIF">CIF (Cost, Insurance & Freight)</MenuItem>
                  <MenuItem value="EXW">EXW (Ex Works)</MenuItem>
                  <MenuItem value="DDP">DDP (Delivered Duty Paid)</MenuItem>
                  <MenuItem value="FCA">FCA (Free Carrier)</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Current Location"
                value={formData.currentLocation}
                onChange={(e) => handleInputChange('currentLocation', e.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <MenuItem value="Booked">Booked</MenuItem>
                  <MenuItem value="In Transit">In Transit</MenuItem>
                  <MenuItem value="Cleared">Cleared</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Delayed">Delayed</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Alert Status</InputLabel>
                <Select
                  value={formData.alert}
                  label="Alert Status"
                  onChange={(e) => handleInputChange('alert', e.target.value)}
                >
                  <MenuItem value="">No Alert</MenuItem>
                  <MenuItem value="Delay">Delay</MenuItem>
                  <MenuItem value="Inspection">Inspection</MenuItem>
                  <MenuItem value="Hold">Hold</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="subtitle2" sx={{ pb: 1, borderBottom: 1, borderColor: 'divider', mt: 2, mb: 1 }}>
                Route Information
              </Typography>

              <TextField
                fullWidth
                label="Origin"
                value={formData.origin}
                onChange={(e) => handleInputChange('origin', e.target.value)}
                disabled={!canEditBasicInfo}
              />

              <TextField
                fullWidth
                label="Origin Port"
                value={formData.originPort}
                onChange={(e) => handleInputChange('originPort', e.target.value)}
                disabled={!canEditBasicInfo}
              />

              <TextField
                fullWidth
                label="Destination"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                disabled={!canEditBasicInfo}
              />

              <TextField
                fullWidth
                label="Destination Port"
                value={formData.destinationPort}
                onChange={(e) => handleInputChange('destinationPort', e.target.value)}
                disabled={!canEditBasicInfo}
              />
            </Box>
          </Grid>

          {/* Column 2: Container & Cargo */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Typography variant="subtitle2" sx={{ pb: 1, borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              Container Details
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Container Number"
                value={formData.containerNumber}
                onChange={(e) => handleInputChange('containerNumber', e.target.value)}
                disabled={!canEditBasicInfo}
              />

              <FormControl fullWidth disabled={!canEditBasicInfo}>
                <InputLabel>Container Type</InputLabel>
                <Select
                  value={formData.containerType}
                  label="Container Type"
                  onChange={(e) => handleInputChange('containerType', e.target.value)}
                >
                  <MenuItem value="20ft Standard">20ft Standard</MenuItem>
                  <MenuItem value="40ft Standard">40ft Standard</MenuItem>
                  <MenuItem value="40ft High Cube">40ft High Cube</MenuItem>
                  <MenuItem value="20ft Reefer">20ft Reefer</MenuItem>
                  <MenuItem value="40ft Reefer">40ft Reefer</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Seal Number"
                value={formData.sealNumber}
                onChange={(e) => handleInputChange('sealNumber', e.target.value)}
                disabled={!canEditBasicInfo}
              />

              <Typography variant="subtitle2" sx={{ pb: 1, borderBottom: 1, borderColor: 'divider', mt: 2, mb: 1 }}>
                Cargo Information
              </Typography>

              <TextField
                fullWidth
                label="Cargo Description"
                value={formData.cargoDescription}
                onChange={(e) => handleInputChange('cargoDescription', e.target.value)}
                disabled={!canEditBasicInfo}
              />

              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Weight (kg)"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', Number(e.target.value))}
                    disabled={!canEditBasicInfo}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Volume (m³)"
                    type="number"
                    value={formData.volume}
                    onChange={(e) => handleInputChange('volume', Number(e.target.value))}
                    disabled={!canEditBasicInfo}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Number of Packages"
                type="number"
                value={formData.numberOfPackages}
                onChange={(e) => handleInputChange('numberOfPackages', Number(e.target.value))}
                disabled={!canEditBasicInfo}
              />

              <TextField
                fullWidth
                label="HS Code"
                value={formData.hsCode}
                onChange={(e) => handleInputChange('hsCode', e.target.value)}
                disabled={!canEditBasicInfo}
              />

              <Typography variant="subtitle2" sx={{ pb: 1, borderBottom: 1, borderColor: 'divider', mt: 2, mb: 1 }}>
                Dates & Schedule
              </Typography>

              <TextField
                fullWidth
                label="Departure Date"
                type="date"
                value={formData.departureDate}
                onChange={(e) => handleInputChange('departureDate', e.target.value)}
                disabled={!canEditDates}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                label="Estimated Arrival"
                value={formData.estimatedArrival}
                onChange={(e) => handleInputChange('estimatedArrival', e.target.value)}
              />
            </Box>
          </Grid>

          {/* Column 3: Parties & Commercial */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Typography variant="subtitle2" sx={{ pb: 1, borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              Parties Involved
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Shipper"
                value={formData.shipper}
                onChange={(e) => handleInputChange('shipper', e.target.value)}
                disabled={!canEditBasicInfo}
              />

              <TextField
                fullWidth
                label="Shipper Address"
                multiline
                rows={2}
                value={formData.shipperAddress}
                onChange={(e) => handleInputChange('shipperAddress', e.target.value)}
                disabled={!canEditBasicInfo}
              />

              <TextField
                fullWidth
                label="Consignee"
                value={formData.consignee}
                onChange={(e) => handleInputChange('consignee', e.target.value)}
                disabled={!canEditBasicInfo}
              />

              <TextField
                fullWidth
                label="Consignee Address"
                multiline
                rows={2}
                value={formData.consigneeAddress}
                onChange={(e) => handleInputChange('consigneeAddress', e.target.value)}
                disabled={!canEditBasicInfo}
              />

              <Typography variant="subtitle2" sx={{ pb: 1, borderBottom: 1, borderColor: 'divider', mt: 2, mb: 1 }}>
                Service Providers
              </Typography>

              <TextField
                fullWidth
                label="Freight Forwarder"
                value={formData.freightForwarder}
                onChange={(e) => handleInputChange('freightForwarder', e.target.value)}
                disabled={!canEditBasicInfo}
              />

              <TextField
                fullWidth
                label="Customs House Agent"
                value={formData.cha}
                onChange={(e) => handleInputChange('cha', e.target.value)}
                disabled={!canEditBasicInfo}
              />

              <TextField
                fullWidth
                label="Shipping Line"
                value={formData.shippingLine}
                onChange={(e) => handleInputChange('shippingLine', e.target.value)}
                disabled={!canEditBasicInfo}
              />

              <TextField
                fullWidth
                label="Vessel Name"
                value={formData.vesselName}
                onChange={(e) => handleInputChange('vesselName', e.target.value)}
                disabled={!canEditBasicInfo}
              />

              <TextField
                fullWidth
                label="Voyage Number"
                value={formData.voyageNumber}
                onChange={(e) => handleInputChange('voyageNumber', e.target.value)}
                disabled={!canEditBasicInfo}
              />

              <Typography variant="subtitle2" sx={{ pb: 1, borderBottom: 1, borderColor: 'divider', mt: 2, mb: 1 }}>
                Commercial Details
              </Typography>

              <FormControl fullWidth disabled={!canEditCommercial}>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={formData.currency}
                  label="Currency"
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                  <MenuItem value="INR">INR</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Cargo Value"
                type="number"
                value={formData.cargoValue}
                onChange={(e) => handleInputChange('cargoValue', Number(e.target.value))}
                disabled={!canEditCommercial}
              />

              <TextField
                fullWidth
                label="Freight Charges"
                type="number"
                value={formData.freightCharges}
                onChange={(e) => handleInputChange('freightCharges', Number(e.target.value))}
                disabled={!canEditCommercial}
              />

              <TextField
                fullWidth
                label="Insurance Value"
                type="number"
                value={formData.insuranceValue}
                onChange={(e) => handleInputChange('insuranceValue', Number(e.target.value))}
                disabled={!canEditCommercial}
              />

              <TextField
                fullWidth
                label="Special Instructions"
                multiline
                rows={3}
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Document Upload Section */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <FileText className="w-5 h-5" style={{ color: '#1A3D32' }} />
          <Typography variant="h5">Document Management</Typography>
        </Box>

        {/* Upload Area */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Left: Upload Form */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>Upload New Document</Typography>
            
            {/* Drag & Drop Zone */}
            <Box
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              sx={{
                border: 2,
                borderStyle: 'dashed',
                borderColor: isDragging ? 'primary.main' : 'divider',
                borderRadius: 1,
                p: 3,
                mb: 2,
                textAlign: 'center',
                bgcolor: isDragging ? 'primary.50' : 'background.paper',
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: 'text.secondary',
                },
              }}
            >
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <Typography variant="body2" sx={{ mb: 1 }}>
                Drop files here or{' '}
                <label style={{ color: '#1976d2', cursor: 'pointer', textDecoration: 'underline' }}>
                  Browse
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                PDF, DOC, DOCX, JPG, PNG (max 10MB)
              </Typography>
              {selectedFile && (
                <Alert severity="success" sx={{ mt: 2, display: 'inline-flex' }}>
                  <Typography variant="caption">✓ {selectedFile.name}</Typography>
                </Alert>
              )}
            </Box>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Document Type</InputLabel>
              <Select
                value={documentType}
                label="Document Type"
                onChange={(e) => setDocumentType(e.target.value)}
              >
                <MenuItem value="">Select type...</MenuItem>
                <MenuItem value="Commercial Invoice">Commercial Invoice</MenuItem>
                <MenuItem value="Packing List">Packing List</MenuItem>
                <MenuItem value="Bill of Lading">Bill of Lading</MenuItem>
                <MenuItem value="Certificate of Origin">Certificate of Origin</MenuItem>
                <MenuItem value="Customs Declaration">Customs Declaration</MenuItem>
                <MenuItem value="Insurance Certificate">Insurance Certificate</MenuItem>
                <MenuItem value="Shipping Bill">Shipping Bill</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              startIcon={<Plus className="w-5 h-5" />}
              onClick={handleDocumentUpload}
              disabled={!selectedFile || !documentType}
            >
              Add Document
            </Button>
          </Grid>

          {/* Right: Uploaded Documents List */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Uploaded Documents ({uploadedDocuments.length})
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 400, overflowY: 'auto' }}>
              {uploadedDocuments.map((doc) => (
                <Paper
                  key={doc.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                    <FileText className="w-5 h-5" style={{ color: '#1A3D32' }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2">{doc.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {doc.file} • {doc.size} • {doc.uploadedDate}
                      </Typography>
                    </Box>
                    {getDocumentStatusBadge(doc.status)}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                    <IconButton size="small" color="primary" title="View">
                      <Eye className="w-4 h-4" />
                    </IconButton>
                    <IconButton size="small" color="success" title="Download">
                      <Download className="w-4 h-4" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteDocument(doc.id)}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </IconButton>
                  </Box>
                </Paper>
              ))}
              {uploadedDocuments.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <Typography variant="body2" color="text.secondary">
                    No documents uploaded yet
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Action Buttons at Bottom */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={onBack}>
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<Save className="w-5 h-5" />}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Box>
    </div>
  );
}