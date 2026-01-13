import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Eye, Pencil } from 'lucide-react';
import { Chip, IconButton, Box } from '@mui/material';
import { statusColors } from '../../src/theme/muiTheme';

interface Shipment {
  id: string;
  cargo: string;
  currentLocation: string;
  status: 'Booked' | 'In Transit' | 'Cleared' | 'Delayed' | 'Delivered';
  eta: string;
  alert?: string | null;
  origin?: string;
  destination?: string;
  containerNumber?: string;
  weight?: number;
}

interface ShipmentsDataGridProps {
  shipments: Shipment[];
  loading: boolean;
  onViewShipment: (shipment: Shipment) => void;
  onEditShipment?: (shipment: Shipment) => void;
}

export function ShipmentsDataGrid({ 
  shipments, 
  loading, 
  onViewShipment, 
  onEditShipment 
}: ShipmentsDataGridProps) {
  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || { bg: '#f3f4f6', text: '#1f2937' };
  };

  const getLocationColor = (location: string) => {
    switch (location) {
      case 'Port':
        return { bg: '#e0f2e9', text: '#2D5A4A' }; // Updated: Light green, medium green
      case 'Customs':
        return { bg: '#fed7aa', text: '#c2410c' }; // orange
      case 'In Transit':
        return { bg: '#d4edda', text: '#1A3D32' }; // Updated: Light sage, dark forest green
      default:
        return { bg: '#f3f4f6', text: '#1f2937' }; // gray
    }
  };

  const getAlertColor = (alert: string | null | undefined) => {
    if (!alert) return { bg: '#f3f4f6', text: '#1f2937' };
    switch (alert) {
      case 'Delay':
        return { bg: '#fee2e2', text: '#991b1b' }; // red
      case 'Inspection':
        return { bg: '#fef3c7', text: '#92400e' }; // yellow
      case 'Hold':
        return { bg: '#fed7aa', text: '#c2410c' }; // orange
      default:
        return { bg: '#f3f4f6', text: '#1f2937' }; // gray
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Shipment ID',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'cargo',
      headerName: 'Cargo',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'origin',
      headerName: 'Origin',
      flex: 1,
      minWidth: 130,
      valueGetter: (params) => params || '-',
    },
    {
      field: 'destination',
      headerName: 'Destination',
      flex: 1,
      minWidth: 130,
      valueGetter: (params) => params || '-',
    },
    {
      field: 'currentLocation',
      headerName: 'Current Location',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const colors = getLocationColor(params.value as string);
        return (
          <Chip
            label={params.value}
            size="small"
            sx={{
              backgroundColor: colors.bg,
              color: colors.text,
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          />
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.8,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams) => {
        const colors = getStatusColor(params.value as string);
        return (
          <Chip
            label={params.value}
            size="small"
            sx={{
              backgroundColor: colors.bg,
              color: colors.text,
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          />
        );
      },
    },
    {
      field: 'eta',
      headerName: 'ETA',
      flex: 0.8,
      minWidth: 110,
    },
    {
      field: 'containerNumber',
      headerName: 'Container #',
      flex: 0.8,
      minWidth: 120,
      valueGetter: (params) => params || '-',
    },
    {
      field: 'alert',
      headerName: 'Alert',
      flex: 0.8,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams) => {
        const alert = params.value as string | null | undefined;
        if (!alert) return <span style={{ color: '#9ca3af' }}>-</span>;
        const colors = getAlertColor(alert);
        return (
          <Chip
            label={alert}
            size="small"
            sx={{
              backgroundColor: colors.bg,
              color: colors.text,
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => onViewShipment(params.row)}
              sx={{
                '&:hover': {
                  backgroundColor: '#f3f4f6',
                },
              }}
              title="View"
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </IconButton>
            {onEditShipment && (
              <IconButton
                size="small"
                onClick={() => onEditShipment(params.row)}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  },
                }}
                title="Edit"
              >
                <Pencil className="w-4 h-4 text-gray-600" />
              </IconButton>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 280px)', width: '100%', minHeight: 400 }}>
      <DataGrid
        rows={shipments}
        columns={columns}
        loading={loading}
        pageSizeOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25, page: 0 },
          },
        }}
        disableRowSelectionOnClick
        sx={{
          border: 'none',
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
        }}
      />
    </Box>
  );
}