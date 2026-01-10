import {
  Ship,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  Pencil,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";
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
  Collapse,
} from '@mui/material';
import { CreateShipment } from "./CreateShipment";
import { ViewShipmentDetails } from "./ViewShipmentDetails";
import { ModifyShipment } from "./ModifyShipment";
import { mockApi } from "../services/mock-api";
import type { Shipment } from "../types";
import { Breadcrumb } from "./Breadcrumb";
import { logger } from '../utils/logger';

export function Shipments() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [modifyingShipment, setModifyingShipment] = useState<Shipment | null>(null);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      setLoading(true);
      const response = await mockApi.shipments.getAll({ page: 1, limit: 50 });
      setShipments(response.data);
    } catch (error) {
      logger.error('Failed to fetch shipments', { error });
    } finally {
      setLoading(false);
    }
  };

  const handleShipmentCreated = () => {
    setShowCreateForm(false);
    fetchShipments(); // Refresh the list
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Booked":
        return "info";
      case "Cleared":
        return "success";
      case "Delayed":
        return "error";
      default:
        return "default";
    }
  };

  const getLocationColor = (location: string) => {
    switch (location) {
      case "Port":
        return "secondary";
      case "Customs":
        return "warning";
      case "In Transit":
        return "info";
      default:
        return "default";
    }
  };

  const getAlertColor = (alert: string | null) => {
    if (!alert) return "default";
    switch (alert) {
      case "Delay":
        return "error";
      case "Inspection":
        return "warning";
      case "Hold":
        return "warning";
      default:
        return "default";
    }
  };

  // Filter shipments based on search query
  const filteredShipments = shipments.filter((shipment) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      shipment.id.toLowerCase().includes(query) ||
      shipment.cargo.toLowerCase().includes(query) ||
      shipment.currentLocation.toLowerCase().includes(query) ||
      shipment.status.toLowerCase().includes(query) ||
      shipment.origin.toLowerCase().includes(query) ||
      shipment.destination.toLowerCase().includes(query)
    );
  });

  if (showCreateForm) {
    return (
      <CreateShipment onBack={() => setShowCreateForm(false)} onShipmentCreated={handleShipmentCreated} />
    );
  }

  if (selectedShipment) {
    return (
      <ViewShipmentDetails
        shipment={selectedShipment}
        onBack={() => setSelectedShipment(null)}
      />
    );
  }

  if (modifyingShipment) {
    return (
      <ModifyShipment
        shipment={modifyingShipment}
        onBack={() => setModifyingShipment(null)}
        onShipmentModified={fetchShipments}
      />
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Shipments' },
        ]}
      />

      {/* Shipments Table */}
      <Paper elevation={2} sx={{ mt: 3, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <Typography variant="h6">Recent Shipments</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Collapse in={searchExpanded} orientation="horizontal">
              <TextField
                size="small"
                placeholder="Search shipments..."
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

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : filteredShipments.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <Typography color="text.secondary">
              {searchQuery ? 'No shipments found matching your search.' : 'No shipments found.'}
            </Typography>
          </Box>
        ) : (
          <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Shipment ID</TableCell>
                  <TableCell>Cargo</TableCell>
                  <TableCell>Current Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>ETA</TableCell>
                  <TableCell>Alerts</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id} hover>
                    <TableCell>
                      <Typography variant="body2">{shipment.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{shipment.cargo}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={shipment.currentLocation}
                        color={getLocationColor(shipment.currentLocation) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={shipment.status}
                        color={getStatusColor(shipment.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {shipment.eta}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {shipment.alert ? (
                        <Chip
                          label={shipment.alert}
                          color={getAlertColor(shipment.alert) as any}
                          size="small"
                        />
                      ) : (
                        <Typography variant="body2" color="text.disabled">
                          -
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          color="primary"
                          title="View"
                          onClick={() => setSelectedShipment(shipment)}
                        >
                          <Eye className="w-4 h-4" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="default"
                          title="Modify"
                          onClick={() => setModifyingShipment(shipment)}
                        >
                          <Pencil className="w-4 h-4" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}
