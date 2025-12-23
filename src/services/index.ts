/**
 * Services Index
 * Central export point for all API services
 */

export { default as api } from './api';
export { default as authService } from './auth.service';
export { default as shipmentsService } from './shipments.service';
export { default as partnersService } from './partners.service';
export { default as usersService } from './users.service';
export { default as invoicesService } from './invoices.service';
export { default as dashboardService } from './dashboard.service';
export { default as documentsService } from './documents.service';

// Re-export commonly used utilities
export { setAuthToken, removeAuthToken, ApiError } from './api';
