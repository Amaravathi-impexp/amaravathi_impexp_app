import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
} from '@mui/material';
import { Breadcrumb } from './Breadcrumb';

const invoices = [
  {
    id: 1,
    invoiceNo: 'INV-2024-001',
    party: 'Global Exports Ltd',
    amount: '45,250.00',
    currency: 'USD',
    dueDate: 'Dec 28, 2024',
    status: 'Pending',
  },
  {
    id: 2,
    invoiceNo: 'INV-2024-002',
    party: 'Ocean Freight Co',
    amount: '28,500.00',
    currency: 'EUR',
    dueDate: 'Dec 25, 2024',
    status: 'Paid',
  },
  {
    id: 3,
    invoiceNo: 'INV-2024-003',
    party: 'Asia Imports Inc',
    amount: '62,800.00',
    currency: 'USD',
    dueDate: 'Dec 30, 2024',
    status: 'Overdue',
  },
  {
    id: 4,
    invoiceNo: 'INV-2024-004',
    party: 'Continental Shipping',
    amount: '15,750.00',
    currency: 'GBP',
    dueDate: 'Jan 05, 2025',
    status: 'Pending',
  },
  {
    id: 5,
    invoiceNo: 'INV-2024-005',
    party: 'Pacific Trade Corp',
    amount: '38,900.00',
    currency: 'USD',
    dueDate: 'Dec 22, 2024',
    status: 'Paid',
  },
  {
    id: 6,
    invoiceNo: 'INV-2024-006',
    party: 'Mediterranean Logistics',
    amount: '52,300.00',
    currency: 'EUR',
    dueDate: 'Dec 20, 2024',
    status: 'Overdue',
  },
  {
    id: 7,
    invoiceNo: 'INV-2024-007',
    party: 'Nordic Freight Solutions',
    amount: '19,450.00',
    currency: 'USD',
    dueDate: 'Jan 10, 2025',
    status: 'Pending',
  },
  {
    id: 8,
    invoiceNo: 'INV-2024-008',
    party: 'Trans-Atlantic Cargo',
    amount: '71,200.00',
    currency: 'USD',
    dueDate: 'Dec 27, 2024',
    status: 'Paid',
  },
];

export function PaymentsInvoicing() {
  const getStatusColor = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Payments & Invoicing' }]} />

      {/* Invoices Table */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
                  Invoice No
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
                  Party
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
                  Amount
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
                  Currency
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
                  Due Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice.id}
                sx={{
                  '&:hover': {
                    bgcolor: 'grey.50',
                  },
                }}
              >
                <TableCell>
                  <Typography variant="body2">{invoice.invoiceNo}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{invoice.party}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{invoice.amount}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{invoice.currency}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{invoice.dueDate}</Typography>
                </TableCell>
                <TableCell>
                  <Chip label={invoice.status} color={getStatusColor(invoice.status)} size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
