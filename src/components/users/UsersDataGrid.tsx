import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Eye, Edit } from 'lucide-react';
import { Chip, IconButton, Box } from '@mui/material';
import { roleColors, statusColors } from '../../src/theme/muiTheme';
import type { Role } from '../../store/api/types';

export interface UserGridRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  roles: Role[];
  originCountry?: { name: string; code: string } | null;
  destinationCountry?: { name: string; code: string } | null;
  productType?: { name: string; code: string } | null;
  status: string;
  emailVerified: boolean;
}

interface UsersDataGridProps {
  users: UserGridRow[];
  loading: boolean;
  onViewUser: (userId: string) => void;
  onEditUser?: (userId: string) => void;
}

export function UsersDataGrid({ users, loading, onViewUser, onEditUser }: UsersDataGridProps) {
  const formatRoleName = (role: Role) => {
    const roleCode = role.code.toUpperCase();
    switch (roleCode) {
      case 'ADMIN':
        return 'Admin';
      case 'IMPT':
        return 'Importer';
      case 'EXPT':
        return 'Exporter';
      default:
        return role.name || role.code;
    }
  };

  const getRoleColor = (roleCode: string) => {
    const code = roleCode.toUpperCase();
    return roleColors[code as keyof typeof roleColors] || { bg: '#f3f4f6', text: '#1f2937' };
  };

  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || { bg: '#f3f4f6', text: '#1f2937' };
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
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
      flex: 1,
      minWidth: 130,
    },
    {
      field: 'roles',
      headerName: 'Role(s)',
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const roles = params.value as Role[];
        return (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', py: 1 }}>
            {roles.map((role) => {
              const colors = getRoleColor(role.code);
              return (
                <Chip
                  key={role.id}
                  label={formatRoleName(role)}
                  size="small"
                  sx={{
                    backgroundColor: colors.bg,
                    color: colors.text,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    height: '24px',
                  }}
                />
              );
            })}
          </Box>
        );
      },
    },
    {
      field: 'originCountry',
      headerName: 'Origin Country',
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => params?.name || '-',
    },
    {
      field: 'destinationCountry',
      headerName: 'Destination Country',
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => params?.name || '-',
    },
    {
      field: 'productType',
      headerName: 'Product Type',
      flex: 1,
      minWidth: 130,
      valueGetter: (params) => params?.name || '-',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.8,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const colors = getStatusColor(params.value as string);
        return (
          <Chip
            label={formatStatus(params.value as string)}
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
      field: 'emailVerified',
      headerName: 'Email Verified',
      flex: 0.8,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams) => {
        const verified = params.value as boolean;
        return (
          <span style={{ color: verified ? '#059669' : '#9ca3af' }}>
            {verified ? '✓ Verified' : 'Not verified'}
          </span>
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
              onClick={() => onViewUser(params.row.id)}
              sx={{
                '&:hover': {
                  backgroundColor: '#f3f4f6',
                },
              }}
              title="View"
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </IconButton>
            {onEditUser && (
              <IconButton
                size="small"
                onClick={() => onEditUser(params.row.id)}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  },
                }}
                title="Edit"
              >
                <Edit className="w-4 h-4 text-gray-600" />
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
        rows={users}
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