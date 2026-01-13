import { Upload, FileText, CheckCircle, XCircle, Clock, Download, Eye, AlertCircle, Search, ChevronDown, Ship, Anchor, Plane, User, Building2, FileCheck, Tag, Lock, MessageSquare } from 'lucide-react';
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
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
} from '@mui/material';
import { Breadcrumb } from './Breadcrumb';
import { useState } from 'react';

export function UploadDocuments() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [issuedDate, setIssuedDate] = useState('');
  const [issuedBy, setIssuedBy] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [confidential, setConfidential] = useState(false);
  const [notes, setNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);

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

  const handleUpload = () => {
    // Upload logic - TODO: Implement API call
    // Reset form after upload
    setSelectedFile(null);
    setDocumentType('');
    setDocumentNumber('');
    setIssuedDate('');
    setIssuedBy('');
    setTags([]);
    setConfidential(false);
    setNotes('');
  };

  const handleUploadAndAddAnother = () => {
    handleUpload();
    // Keep form open for another upload
  };

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  // Mock data for document checklist
  const documentChecklist = [
    { name: 'Commercial Invoice', status: 'uploaded', required: true, stage: 'now' },
    { name: 'Packing List', status: 'missing', required: true, stage: 'now' },
    { name: 'Bill of Lading', status: 'pending', required: false, stage: 'later' },
    { name: 'Shipping Bill', status: 'pending', required: false, stage: 'cha' },
    { name: 'Certificate of Origin', status: 'uploaded', required: false, stage: 'later' },
  ];

  // Mock data for document vault
  const documentVault = [
    { id: 1, type: 'Commercial Invoice', status: 'approved', uploadedBy: 'Exporter', date: 'Dec 24, 2024', fileSize: '2.4 MB' },
    { id: 2, type: 'Packing List', status: 'missing', uploadedBy: '—', date: '—', fileSize: '—' },
    { id: 3, type: 'Bill of Lading', status: 'pending', uploadedBy: 'Freight Forwarder', date: 'Dec 23, 2024', fileSize: '1.8 MB' },
    { id: 4, type: 'Certificate of Origin', status: 'approved', uploadedBy: 'Exporter', date: 'Dec 22, 2024', fileSize: '856 KB' },
    { id: 5, type: 'Customs Declaration', status: 'rejected', uploadedBy: 'CHA', date: 'Dec 21, 2024', fileSize: '1.2 MB' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded':
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'missing':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colorMap: Record<string, 'success' | 'error' | 'warning' | 'default'> = {
      approved: 'success',
      missing: 'error',
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

  const filteredDocuments = documentVault.filter(doc => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'required-now') return ['missing', 'pending'].includes(doc.status);
    if (filterStatus === 'missing') return doc.status === 'missing';
    if (filterStatus === 'needs-approval') return doc.status === 'pending';
    if (filterStatus === 'rejected') return doc.status === 'rejected';
    return true;
  }).filter(doc => 
    searchQuery === '' || doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Shipments', href: '/dashboard' },
          { label: 'EXP-211', href: '/dashboard' },
          { label: 'Documents' },
        ]}
      />

      {/* Main Content - Two Columns */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* LEFT: Shipment Summary */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Shipment Summary</Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FileText className="w-4 h-4 text-gray-500" />
                <Typography variant="body2" color="text.secondary">Shipment ID:</Typography>
                <Typography variant="body2">EXP-211</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Ship className="w-4 h-4 text-gray-500" />
                <Typography variant="body2" color="text.secondary">Type:</Typography>
                <Typography variant="body2">Export</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Anchor className="w-4 h-4 text-gray-500" />
                <Typography variant="body2" color="text.secondary">Route:</Typography>
                <Typography variant="body2">India → UAE</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AlertCircle className="w-4 h-4" style={{ color: '#1A3D32' }} />
                <Typography variant="body2" color="text.secondary">Status:</Typography>
                <Chip label="READY FOR CUSTOMS" color="info" size="small" />
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Plane className="w-4 h-4 text-gray-500" />
                <Typography variant="body2" color="text.secondary">Mode:</Typography>
                <Typography variant="body2">Sea</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FileCheck className="w-4 h-4 text-gray-500" />
                <Typography variant="body2" color="text.secondary">Incoterm:</Typography>
                <Typography variant="body2">FOB</Typography>
              </Box>
            </Box>

            <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2, mb: 2 }}>
              <Typography variant="body2" gutterBottom>Parties:</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <Typography variant="body2" color="text.secondary">Exporter</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <User className="w-4 h-4 text-gray-500" />
                  <Typography variant="body2" color="text.secondary">CHA</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <Typography variant="body2" color="text.secondary">Freight Forwarder</Typography>
                </Box>
              </Box>
            </Box>

            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography variant="body2">
                Required Now: <strong>2 documents</strong>
              </Typography>
              <Typography variant="caption" display="block">
                Next Stage: Customs Filing
              </Typography>
            </Alert>

            {/* Document Checklist */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Document Checklist</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {documentChecklist.map((doc, index) => (
                  <Paper
                    key={index}
                    variant="outlined"
                    sx={{
                      p: 1,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1,
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    {getStatusIcon(doc.status)}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2">{doc.name}</Typography>
                      {doc.required && (
                        <Typography variant="caption" color="error">
                          Required {doc.stage === 'now' ? 'NOW' : doc.stage === 'cha' ? '(CHA)' : '(Later)'}
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* RIGHT: Upload Panel */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Upload Document</Typography>

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
                p: 4,
                mb: 3,
                textAlign: 'center',
                bgcolor: isDragging ? 'primary.50' : 'background.paper',
                transition: 'all 0.3s',
                '&:hover': { borderColor: 'text.secondary' },
              }}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <Typography variant="body1" sx={{ mb: 1 }}>
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
              <Typography variant="body2" color="text.secondary">
                Supported formats: PDF, DOC, DOCX, JPG, PNG (max 10MB)
              </Typography>
              {selectedFile && (
                <Alert severity="success" sx={{ mt: 2, display: 'inline-flex' }}>
                  <Typography variant="body2">✓ {selectedFile.name}</Typography>
                </Alert>
              )}
            </Box>

            {/* Upload Form Fields */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {/* Document Type */}
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth required>
                  <InputLabel>Document Type</InputLabel>
                  <Select
                    value={documentType}
                    label="Document Type *"
                    onChange={(e) => setDocumentType(e.target.value)}
                  >
                    <MenuItem value="">Select type...</MenuItem>
                    <MenuItem value="invoice">Commercial Invoice</MenuItem>
                    <MenuItem value="packing">Packing List</MenuItem>
                    <MenuItem value="bl">Bill of Lading</MenuItem>
                    <MenuItem value="awb">Air Waybill</MenuItem>
                    <MenuItem value="shipping-bill">Shipping Bill</MenuItem>
                    <MenuItem value="coo">Certificate of Origin</MenuItem>
                    <MenuItem value="customs">Customs Declaration</MenuItem>
                    <MenuItem value="insurance">Insurance Certificate</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Document Number */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Document Number"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  placeholder="e.g., INV-2024-001"
                  helperText="Optional"
                />
              </Grid>

              {/* Issued Date */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Issued Date"
                  type="date"
                  value={issuedDate}
                  onChange={(e) => setIssuedDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* Issued By */}
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth required>
                  <InputLabel>Issued By</InputLabel>
                  <Select
                    value={issuedBy}
                    label="Issued By *"
                    onChange={(e) => setIssuedBy(e.target.value)}
                  >
                    <MenuItem value="">Select issuer...</MenuItem>
                    <MenuItem value="exporter">Exporter</MenuItem>
                    <MenuItem value="cha">CHA (Customs House Agent)</MenuItem>
                    <MenuItem value="ff">Freight Forwarder</MenuItem>
                    <MenuItem value="shipping-line">Shipping Line</MenuItem>
                    <MenuItem value="airline">Airline</MenuItem>
                    <MenuItem value="bank">Bank</MenuItem>
                    <MenuItem value="govt">Government Authority</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Tags */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {['Invoice', 'Customs', 'Freight', 'Insurance', 'Export', 'Import', 'Urgent'].map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    icon={<Tag className="w-3 h-3" />}
                    onClick={() => toggleTag(tag)}
                    color={tags.includes(tag) ? 'primary' : 'default'}
                    variant={tags.includes(tag) ? 'filled' : 'outlined'}
                    size="small"
                  />
                ))}
              </Box>
            </Box>

            {/* Confidential Toggle */}
            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={confidential}
                    onChange={(e) => setConfidential(e.target.checked)}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Lock className="w-4 h-4 text-gray-500" />
                    <Typography variant="body2">Mark as Confidential</Typography>
                  </Box>
                }
              />
              <Typography variant="caption" color="text.secondary" sx={{ ml: 4, display: 'block' }}>
                Restricted access to authorized parties only
              </Typography>
            </Box>

            {/* Notes */}
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional comments or instructions..."
              helperText="Optional"
              sx={{ mb: 3 }}
            />

            {/* AI Checks Info */}
            <Alert severity="info" icon={<AlertCircle className="w-5 h-5" />} sx={{ mb: 3 }}>
              <Typography variant="body2">AI-Powered Document Verification</Typography>
              <Typography variant="caption" display="block">
                Automatic OCR extraction, data validation, and mismatch detection will run upon upload
              </Typography>
            </Alert>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={!selectedFile || !documentType || !issuedDate || !issuedBy}
              >
                Upload
              </Button>
              <Button
                variant="outlined"
                onClick={handleUploadAndAddAnother}
                disabled={!selectedFile || !documentType || !issuedDate || !issuedBy}
              >
                Upload & Add Another
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Document Vault Table */}
      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>Document Vault</Typography>

        {/* Filters */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, mb: 3 }}>
          <Button
            variant={filterStatus === 'all' ? 'contained' : 'outlined'}
            onClick={() => setFilterStatus('all')}
            size="small"
          >
            All
          </Button>
          <Button
            variant={filterStatus === 'required-now' ? 'contained' : 'outlined'}
            onClick={() => setFilterStatus('required-now')}
            size="small"
          >
            Required Now
          </Button>
          <Button
            variant={filterStatus === 'missing' ? 'contained' : 'outlined'}
            onClick={() => setFilterStatus('missing')}
            size="small"
          >
            Missing
          </Button>
          <Button
            variant={filterStatus === 'needs-approval' ? 'contained' : 'outlined'}
            onClick={() => setFilterStatus('needs-approval')}
            size="small"
          >
            Needs Approval
          </Button>
          <Button
            variant={filterStatus === 'rejected' ? 'contained' : 'outlined'}
            onClick={() => setFilterStatus('rejected')}
            size="small"
          >
            Rejected
          </Button>

          <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
            {/* Search */}
            <TextField
              size="small"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="w-4 h-4 text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Sort */}
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select label="Sort By" defaultValue="last-updated">
                <MenuItem value="last-updated">Last updated</MenuItem>
                <MenuItem value="doc-type">Document type</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="uploaded-by">Uploaded by</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Document Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Uploaded By</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>File Size</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FileText className="w-4 h-4 text-gray-500" />
                      <Typography variant="body2">{doc.type}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell>
                    <Typography variant="body2">{doc.uploadedBy}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{doc.date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">{doc.fileSize}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {doc.status !== 'missing' && (
                        <>
                          <IconButton size="small" color="primary" title="View">
                            <Eye className="w-4 h-4" />
                          </IconButton>
                          <IconButton size="small" color="success" title="Download">
                            <Download className="w-4 h-4" />
                          </IconButton>
                          <IconButton size="small" color="secondary" title="Audit Log">
                            <MessageSquare className="w-4 h-4" />
                          </IconButton>
                        </>
                      )}
                      {doc.status === 'missing' && (
                        <Button variant="contained" size="small">
                          Upload
                        </Button>
                      )}
                      {doc.status === 'pending' && (
                        <Button variant="contained" color="warning" size="small">
                          Replace
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredDocuments.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <Typography variant="body2" color="text.secondary">
              No documents found
            </Typography>
          </Box>
        )}
      </Paper>
    </div>
  );
}