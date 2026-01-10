import { Star, Search, Plus, Mail, Phone, MapPin, Globe, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Collapse,
  Rating,
  Stack,
  Link,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
} from '@mui/material';
import { CreatePartner } from './CreatePartner';
import type { Partner } from '../types';
import { Breadcrumb } from './Breadcrumb';
import { useGetPartnersQuery, useDeletePartnerMutation } from '../store/api/partnersApi';
import { useGetCountriesQuery } from '../store/api/referenceDataApi';
import { useSnackbar } from 'notistack';

export function PartnerDirectory() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingPartnerId, setEditingPartnerId] = useState<number | null>(null);

  // Use RTK Query to fetch partners and countries
  const { data: partners = [], isLoading, isError, refetch } = useGetPartnersQuery();
  const { data: countries = [] } = useGetCountriesQuery();

  const handlePartnerCreated = () => {
    setShowCreateForm(false);
    setEditingPartnerId(null);
    refetch(); // Refresh the list
  };

  const handleEditPartner = (partnerId: number) => {
    setEditingPartnerId(partnerId);
    setShowCreateForm(true);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getPartnerTypeColor = (code: string) => {
    switch (code) {
      case 'EXPORTER':
        return 'primary';
      case 'IMPORTER':
        return 'success';
      case 'FF':
      case 'CHA':
        return 'secondary';
      default:
        return 'default';
    }
  };

  // Helper function to get country name by ID
  const getCountryName = (countryId: number) => {
    const country = countries.find(c => c.id === countryId);
    return country ? country.name : '-';
  };

  // Helper function to format address
  const formatAddress = (partner: Partner) => {
    const parts = [
      partner.addressLine1,
      partner.addressLine2,
      [partner.city, partner.state].filter(Boolean).join(', '),
      partner.postalCode
    ].filter(part => part && part.trim() !== '');
    
    return parts.length > 0 ? parts.join(', ') : '-';
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'INACTIVE':
        return 'error';
      case 'PENDING':
        return 'warning';
      default:
        return 'default';
    }
  };

  // Filter partners based on search query
  const filteredPartners = partners.filter((partner) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const partnerTypeNames = partner.partnerTypes.map(pt => pt.name.toLowerCase()).join(' ');
    return (
      partner.name.toLowerCase().includes(query) ||
      partnerTypeNames.includes(query) ||
      partner.email?.toLowerCase().includes(query) ||
      partner.phone?.toLowerCase().includes(query)
    );
  });

  const [deletePartner] = useDeletePartnerMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeletePartner = async (partnerId: number) => {
    try {
      await deletePartner(partnerId).unwrap();
      handleCloseDeleteDialog();
      refetch(); // Refresh the list
      enqueueSnackbar('Partner deleted successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to delete partner', { variant: 'error' });
      handleCloseDeleteDialog();
    }
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<Partner | null>(null);

  const handleOpenDeleteDialog = (partner: Partner) => {
    setPartnerToDelete(partner);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setPartnerToDelete(null);
  };

  if (showCreateForm) {
    return <CreatePartner onBack={() => setShowCreateForm(false)} onPartnerCreated={handlePartnerCreated} partnerId={editingPartnerId} />;
  }

  return (
    <Box>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Partner Directory' },
        ]}
      />

      {/* Partners Table */}
      <Paper elevation={2} sx={{ mt: 3 }}>
        <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Partners</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Collapse in={searchExpanded} orientation="horizontal">
              <TextField
                size="small"
                placeholder="Search partners..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                sx={{ width: 250 }}
              />
            </Collapse>
            <IconButton
              onClick={() => setSearchExpanded(!searchExpanded)}
              color="default"
            >
              <Search className="w-5 h-5" />
            </IconButton>
            <Button
              variant="contained"
              startIcon={<Plus className="w-5 h-5" />}
              onClick={() => setShowCreateForm(true)}
            >
              Create
            </Button>
          </Box>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : filteredPartners.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <Typography color="text.secondary">
              {searchQuery ? 'No partners found matching your search.' : 'No partners found.'}
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer sx={{ maxHeight: 'calc(100vh - 340px)', overflowY: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Partner Type</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Website</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Verified</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPartners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((partner) => (
                    <TableRow key={partner.id} hover>
                      <TableCell>
                        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                          {partner.partnerTypes.map((type) => (
                            <Chip
                              key={type.id}
                              label={type.name}
                              color={getPartnerTypeColor(type.code) as any}
                              size="small"
                            />
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {partner.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Mail className="w-4 h-4" style={{ opacity: 0.6 }} />
                          <Typography variant="body2">
                            {partner.email || '-'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Phone className="w-4 h-4" style={{ opacity: 0.6 }} />
                          <Typography variant="body2">
                            {partner.phone || '-'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {partner.website ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Globe className="w-4 h-4" style={{ opacity: 0.6 }} />
                            <Link
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="body2"
                              sx={{ textDecoration: 'none' }}
                            >
                              Visit
                            </Link>
                          </Box>
                        ) : (
                          <Typography variant="body2" color="text.secondary">-</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {getCountryName(partner.countryId)}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 200 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
                          <MapPin className="w-4 h-4" style={{ opacity: 0.6, marginTop: 2 }} />
                          <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                            {formatAddress(partner)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {partner.rating !== null && partner.rating !== undefined ? (
                          <Rating value={partner.rating} readOnly size="small" />
                        ) : (
                          <Typography variant="body2" color="text.secondary">-</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {partner.verified ? (
                            <>
                              <CheckCircle className="w-4 h-4" style={{ color: '#4caf50' }} />
                              <Typography variant="body2" color="success.main">
                                Yes
                              </Typography>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" style={{ color: '#9e9e9e' }} />
                              <Typography variant="body2" color="text.secondary">
                                No
                              </Typography>
                            </>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={partner.status}
                          color={getStatusColor(partner.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="Edit Partner">
                            <IconButton
                              color="primary"
                              onClick={() => handleEditPartner(partner.id)}
                            >
                              <Edit className="w-5 h-5" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Partner">
                            <IconButton
                              color="error"
                              onClick={() => handleOpenDeleteDialog(partner)}
                            >
                              <Trash2 className="w-5 h-5" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={filteredPartners.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>

      {/* Delete Partner Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Partner
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the partner "{partnerToDelete?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => partnerToDelete && handleDeletePartner(partnerToDelete.id)}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}