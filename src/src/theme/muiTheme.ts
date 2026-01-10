import { createTheme } from '@mui/material/styles';

// Extend the Palette interface to include custom colors
declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
  }
}

// Amaravathi Imports & Exports Brand Colors
// Extracted from your existing Tailwind design
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // blue-600
      light: '#3b82f6', // blue-500
      lighter: '#dbeafe', // blue-100 - for selected menu items
      dark: '#1d4ed8', // blue-700
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981', // green-500
      light: '#34d399', // green-400
      dark: '#059669', // green-600
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444', // red-500
      light: '#f87171', // red-400
      dark: '#dc2626', // red-600
    },
    warning: {
      main: '#f59e0b', // amber-500
      light: '#fbbf24', // amber-400
      dark: '#d97706', // amber-600
    },
    info: {
      main: '#3b82f6', // blue-500
      light: '#60a5fa', // blue-400
      dark: '#2563eb', // blue-600
    },
    success: {
      main: '#10b981', // green-500
      light: '#34d399', // green-400
      dark: '#059669', // green-600
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    background: {
      default: '#f9fafb', // gray-50
      paper: '#ffffff',
    },
    text: {
      primary: '#111827', // gray-900
      secondary: '#6b7280', // gray-500
      disabled: '#9ca3af', // gray-400
    },
  },
  typography: {
    fontFamily: 'inherit', // Use your existing font from globals.css
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none', // Don't uppercase buttons
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8, // Match your Tailwind rounded-lg
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #e5e7eb', // gray-200
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f9fafb', // gray-50
            borderBottom: '1px solid #e5e7eb',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#6b7280', // gray-500
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f9fafb', // gray-50
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '9999px', // rounded-full
          fontWeight: 500,
          fontSize: '0.75rem',
        },
      },
    },
  },
});

// Custom colors for role badges (matching your existing design)
export const roleColors = {
  ADMIN: {
    bg: '#fee2e2', // red-100
    text: '#991b1b', // red-800
  },
  IMPORTER: {
    bg: '#dbeafe', // blue-100
    text: '#1e40af', // blue-800
  },
  IMPT: {
    bg: '#dbeafe', // blue-100
    text: '#1e40af', // blue-800
  },
  EXPORTER: {
    bg: '#d1fae5', // green-100
    text: '#065f46', // green-800
  },
  EXPT: {
    bg: '#d1fae5', // green-100
    text: '#065f46', // green-800
  },
};

// Custom colors for status badges
export const statusColors = {
  ACTIVE: {
    bg: '#d1fae5', // green-100
    text: '#065f46', // green-800
  },
  PENDING_VERIFICATION: {
    bg: '#fef3c7', // yellow-100
    text: '#92400e', // yellow-800
  },
  INACTIVE: {
    bg: '#f3f4f6', // gray-100
    text: '#1f2937', // gray-800
  },
  // Shipment statuses
  Booked: {
    bg: '#dbeafe', // blue-100
    text: '#1e40af', // blue-800
  },
  Cleared: {
    bg: '#d1fae5', // green-100
    text: '#065f46', // green-800
  },
  Delayed: {
    bg: '#fee2e2', // red-100
    text: '#991b1b', // red-800
  },
};

// Custom colors for partner types
export const partnerTypeColors = {
  Exporter: {
    bg: '#dbeafe', // blue-100
    text: '#1e40af', // blue-800
  },
  Importer: {
    bg: '#d1fae5', // green-100
    text: '#065f46', // green-800
  },
  'Freight Agent': {
    bg: '#e9d5ff', // purple-100
    text: '#6b21a8', // purple-800
  },
};