/**
 * TypeScript Type Definitions
 * Shared types and interfaces for API responses and data models
 */

// Common types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  company?: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  cell?: string;
  originCountry?: string;
  destinationCountry?: string;
  product?: string;
  notifications?: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: string;
  phone?: string;
  cell?: string;
  notifications?: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export interface UpdateUserRequest {
  role?: string;
  phone?: string;
  cell?: string;
  originCountry?: string;
  destinationCountry?: string;
  product?: string;
  notifications?: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

// Shipment types
export interface Shipment {
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
  volume?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateShipmentRequest {
  shipmentId: string;
  customerName: string;
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
  containerType: string;
  cargoType: string;
  weight: number;
  volume: number;
  value: number;
  currency: string;
  incoterms: string;
  specialInstructions?: string;
}

export interface UpdateShipmentRequest {
  currentLocation?: string;
  status?: string;
  eta?: string;
  alert?: string | null;
}

export interface TrackingInfo {
  shipmentId: string;
  currentLocation: string;
  status: string;
  timeline: TrackingEvent[];
}

export interface TrackingEvent {
  date: string;
  location: string;
  status: string;
  description: string;
}

// Partner types
export interface Partner {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  partnerType: string;
  status: 'Active' | 'Inactive' | 'Pending';
  createdAt: string;
  updatedAt: string;
}

export interface CreatePartnerRequest {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  partnerType: string;
  servicesOffered: string[];
  notes?: string;
}

// Invoice types
export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  shipmentId?: string;
  items: InvoiceItem[];
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface CreateInvoiceRequest {
  customerName: string;
  shipmentId?: string;
  items: InvoiceItem[];
  dueDate: string;
  currency: string;
  notes?: string;
}

// Dashboard/Analytics types
export interface DashboardStats {
  totalShipments: number;
  activeShipments: number;
  pendingDeliveries: number;
  completedShipments: number;
  revenue: {
    total: number;
    currency: string;
    growth: number;
  };
  alerts: number;
}

export interface AnalyticsData {
  shipmentsByStatus: Record<string, number>;
  shipmentsByMonth: Array<{
    month: string;
    count: number;
  }>;
  revenueByMonth: Array<{
    month: string;
    revenue: number;
  }>;
  topRoutes: Array<{
    route: string;
    count: number;
  }>;
}

// Document types
export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  shipmentId?: string;
  url: string;
  uploadedBy: string;
}

export interface UploadDocumentRequest {
  name: string;
  type: string;
  shipmentId?: string;
  file: File;
}