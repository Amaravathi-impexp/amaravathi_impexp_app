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

/**
 * TIMPEX.club (Telugu Import Export Club) MUI Theme
 * Updated with Timpex-inspired Green Theme Color Palette
 * 
 * This is our centralized Material-UI theme with RBAC and green eco-friendly design
 */
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#1A3D32',      // Dark Forest Green - Primary buttons, headers
      light: '#3D7A68',     // Sage Green - Lighter variant
      lighter: '#d4e8cd',   // Light Green - For selected menu items, backgrounds
      dark: '#0F2620',      // Darker Forest Green - Active states
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#D3FF62',      // Bright Lime - Accent color, CTAs
      light: '#e0ff8f',     // Lighter Lime
      dark: '#c4f050',      // Yellow-Green - Hover states
      contrastText: '#1A3D32', // Dark green text on lime background
    },
    error: {
      main: '#ef4444',      // red-500
      light: '#f87171',     // red-400
      dark: '#dc2626',      // red-600
    },
    warning: {
      main: '#f59e0b',      // amber-500
      light: '#fbbf24',     // amber-400
      dark: '#d97706',      // amber-600
    },
    info: {
      main: '#3D7A68',      // Sage Green - Info color
      light: '#60a898',     // Lighter Sage
      dark: '#2D5A4A',      // Medium Green
    },
    success: {
      main: '#1A3D32',      // Dark Forest Green - Success states
      light: '#3D7A68',     // Sage Green
      dark: '#0F2620',      // Darker Forest Green
    },
    grey: {
      50: '#F5F5FA',        // Light Gray - Section backgrounds
      100: '#E5E5EE',       // Light Gray - Dividers
      200: '#e5e7eb',       // Gray - Default borders
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#9A9A9A',       // Medium Gray - Secondary text
      600: '#6b7280',
      700: '#374151',
      800: '#1f2937',
      900: '#1A1A1A',       // Almost Black - Primary text
    },
    background: {
      default: '#FCFEF8',   // Off-White/Cream - Subtle background
      paper: '#FFFFFF',     // White - Cards, paper
    },
    text: {
      primary: '#1A1A1A',   // Almost Black - Primary text
      secondary: '#3D7A68', // Sage Green - Secondary text
      disabled: '#9A9A9A',  // Medium Gray - Disabled text
    },
  },
  typography: {
    // Use system UI fonts for better cross-platform consistency (matching Timpex)
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    h1: {
      fontWeight: 900,      // Extra bold for main headings (matching landing page)
      fontSize: '4rem',     // 64px
      lineHeight: 1.1,
      '@media (max-width:1024px)': {
        fontSize: '3.5rem', // 56px
      },
      '@media (max-width:768px)': {
        fontSize: '2.5rem', // 40px
      },
    },
    h2: {
      fontWeight: 900,      // Extra bold
      fontSize: '3.5rem',   // 56px
      lineHeight: 1.1,
      '@media (max-width:1024px)': {
        fontSize: '3rem',   // 48px
      },
      '@media (max-width:768px)': {
        fontSize: '2rem',   // 32px
      },
    },
    h3: {
      fontWeight: 900,      // Extra bold
      fontSize: '2.5rem',   // 40px
      lineHeight: 1.2,
      '@media (max-width:768px)': {
        fontSize: '1.875rem', // 30px
      },
    },
    h4: {
      fontWeight: 700,      // Bold
      fontSize: '2rem',     // 32px
      lineHeight: 1.3,
      '@media (max-width:768px)': {
        fontSize: '1.5rem', // 24px
      },
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.5rem',   // 24px
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 700,
      fontSize: '1.25rem',  // 20px
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1.125rem', // 18px
      lineHeight: 1.75,
      color: '#3D7A68',     // Sage Green
    },
    subtitle2: {
      fontSize: '1rem',     // 16px
      lineHeight: 1.75,
      color: '#3D7A68',     // Sage Green
    },
    body1: {
      fontSize: '1rem',     // 16px
      lineHeight: 1.75,
      color: '#1A1A1A',
    },
    body2: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.6,
      color: '#3D7A68',
    },
    button: {
      textTransform: 'none', // Don't uppercase buttons
      fontWeight: 600,
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 12,      // More rounded corners (matching Timpex design)
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '12px 24px',
          fontWeight: 600,
          fontSize: '1rem',
          transition: 'all 0.3s ease',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(26, 61, 50, 0.2)',
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          backgroundColor: '#1A3D32',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#2D5A4A',
          },
        },
        containedSecondary: {
          backgroundColor: '#D3FF62',
          color: '#1A3D32',
          '&:hover': {
            backgroundColor: '#c4f050',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: '#1A3D32',
          color: '#1A3D32',
          '&:hover': {
            borderWidth: '2px',
            borderColor: '#2D5A4A',
            backgroundColor: 'rgba(26, 61, 50, 0.05)',
          },
        },
        text: {
          color: '#1A3D32',
          '&:hover': {
            backgroundColor: 'rgba(26, 61, 50, 0.05)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#1A3D32',
          '&:hover': {
            backgroundColor: 'rgba(26, 61, 50, 0.05)',
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #E5E5EE',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#F5F5FA',
            borderBottom: '2px solid #d4e8cd',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#1A3D32',
          },
          '& .MuiDataGrid-row': {
            '&:hover': {
              backgroundColor: '#f0f7ed',
            },
            '&.Mui-selected': {
              backgroundColor: '#d4e8cd',
              '&:hover': {
                backgroundColor: '#c8e3bf',
              },
            },
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '2px solid #E5E5EE',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '9999px',
          fontWeight: 600,
          fontSize: '0.75rem',
        },
        filled: {
          backgroundColor: '#d4e8cd',
          color: '#1A3D32',
        },
        outlined: {
          borderColor: '#1A3D32',
          color: '#1A3D32',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(26, 61, 50, 0.1)',
          border: '1px solid #E5E5EE',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(26, 61, 50, 0.15)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(26, 61, 50, 0.1)',
        },
        elevation2: {
          boxShadow: '0 4px 6px rgba(26, 61, 50, 0.1)',
        },
        elevation3: {
          boxShadow: '0 10px 15px rgba(26, 61, 50, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': {
              borderColor: '#E5E5EE',
            },
            '&:hover fieldset': {
              borderColor: '#3D7A68',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1A3D32',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E5E5EE',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3D7A68',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1A3D32',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#f0f7ed',
          },
          '&.Mui-selected': {
            backgroundColor: '#d4e8cd',
            '&:hover': {
              backgroundColor: '#c8e3bf',
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E5E5EE',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#1A1A1A',
          boxShadow: '0 1px 3px rgba(26, 61, 50, 0.1)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          margin: '4px 0',
          '&:hover': {
            backgroundColor: '#f0f7ed',
          },
          '&.Mui-selected': {
            backgroundColor: '#d4e8cd',
            color: '#1A3D32',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#c8e3bf',
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          color: '#3D7A68',
          '&.Mui-selected': {
            color: '#1A3D32',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#1A3D32',
          height: '3px',
          borderRadius: '3px 3px 0 0',
        },
      },
    },
  },
});

/**
 * Custom colors for role badges (updated with green theme)
 */
export const roleColors = {
  ADMIN: {
    bg: '#fee2e2',       // red-100 (keep for admin distinction)
    text: '#991b1b',     // red-800
  },
  IMPORTER: {
    bg: '#d4e8cd',       // Light Green
    text: '#1A3D32',     // Dark Forest Green
  },
  IMPT: {
    bg: '#d4e8cd',       // Light Green
    text: '#1A3D32',     // Dark Forest Green
  },
  EXPORTER: {
    bg: '#e0ff8f',       // Lighter Lime
    text: '#2D5A4A',     // Medium Green
  },
  EXPT: {
    bg: '#e0ff8f',       // Lighter Lime
    text: '#2D5A4A',     // Medium Green
  },
};

/**
 * Custom colors for status badges (updated with green theme)
 */
export const statusColors = {
  ACTIVE: {
    bg: '#d4e8cd',       // Light Green
    text: '#1A3D32',     // Dark Forest Green
  },
  PENDING_VERIFICATION: {
    bg: '#fef3c7',       // yellow-100
    text: '#92400e',     // yellow-800
  },
  INACTIVE: {
    bg: '#F5F5FA',       // Light Gray
    text: '#1A1A1A',     // Almost Black
  },
  // Shipment statuses
  Booked: {
    bg: '#e0ff8f',       // Lighter Lime
    text: '#1A3D32',     // Dark Forest Green
  },
  'In Transit': {
    bg: '#d4e8cd',       // Light Green
    text: '#2D5A4A',     // Medium Green
  },
  Cleared: {
    bg: '#D3FF62',       // Bright Lime
    text: '#1A3D32',     // Dark Forest Green
  },
  Delayed: {
    bg: '#fee2e2',       // red-100
    text: '#991b1b',     // red-800
  },
  Cancelled: {
    bg: '#F5F5FA',       // Light Gray
    text: '#9A9A9A',     // Medium Gray
  },
};

/**
 * Custom colors for partner types (updated with green theme)
 */
export const partnerTypeColors = {
  Exporter: {
    bg: '#e0ff8f',       // Lighter Lime
    text: '#2D5A4A',     // Medium Green
  },
  Importer: {
    bg: '#d4e8cd',       // Light Green
    text: '#1A3D32',     // Dark Forest Green
  },
  'Freight Agent': {
    bg: '#f0f7ed',       // Pale Green
    text: '#3D7A68',     // Sage Green
  },
  'Customs Broker': {
    bg: '#D3FF62',       // Bright Lime
    text: '#1A3D32',     // Dark Forest Green
  },
  'Warehouse Provider': {
    bg: '#c8e3bf',       // Medium Light Green
    text: '#2D5A4A',     // Medium Green
  },
};