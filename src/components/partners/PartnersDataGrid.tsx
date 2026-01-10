import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Star } from 'lucide-react';
import { Chip, Box, Rating } from '@mui/material';
import { partnerTypeColors } from '../../src/theme/muiTheme';

interface Partner {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  partnerType: string;
  status: 'Active' | 'Inactive' | 'Pending';
  rating?: number;
}

interface PartnersDataGridProps {
  partners: Partner[];
  loading: boolean;
}

export function PartnersDataGrid({ partners, loading }: PartnersDataGridProps) {
  const getPartnerTypeColor = (type: string) => {
    return partnerTypeColors[type as keyof typeof partnerTypeColors] || { bg: '#f3f4f6', text: '#1f2937' };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return { bg: '#d1fae5', text: '#065f46' }; // green
      case 'Inactive':
        return { bg: '#f3f4f6', text: '#1f2937' }; // gray
      case 'Pending':
        return { bg: '#fef3c7', text: '#92400e' }; // yellow
      default:
        return { bg: '#f3f4f6', text: '#1f2937' }; // gray
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'companyName',
      headerName: 'Company Name',
      flex: 1,
      minWidth: 180,
    },
    {
      field: 'contactPerson',
      headerName: 'Contact Person',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 0.8,
      minWidth: 130,
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'partnerType',
      headerName: 'Partner Type',
      flex: 0.8,
      minWidth: 130,
      renderCell: (params: GridRenderCellParams) => {
        const colors = getPartnerTypeColor(params.value as string);
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
      flex: 0.6,
      minWidth: 100,
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
      field: 'rating',
      headerName: 'Rating',
      flex: 0.8,
      minWidth: 140,
      renderCell: (params: GridRenderCellParams) => {
        const rating = params.value as number | undefined;
        if (!rating) return <span style={{ color: '#9ca3af' }}>-</span>;
        return (
          <Rating
            value={rating}
            readOnly
            size="small"
            sx={{
              '& .MuiRating-iconFilled': {
                color: '#fbbf24', // yellow-400
              },
            }}
          />
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 280px)', width: '100%', minHeight: 400 }}>
      <DataGrid
        rows={partners}
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
