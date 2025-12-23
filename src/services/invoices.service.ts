/**
 * Invoices Service
 * Handles all invoice and payment-related API calls
 */

import api from './api';
import type {
  Invoice,
  CreateInvoiceRequest,
  PaginationParams,
  PaginatedResponse,
} from '../types';

export const invoicesService = {
  /**
   * Get all invoices with pagination and filters
   * @param params - Pagination and filter parameters
   * @returns Paginated list of invoices
   */
  getAll: async (params?: PaginationParams & { status?: string; search?: string }): Promise<PaginatedResponse<Invoice>> => {
    try {
      return await api.get<PaginatedResponse<Invoice>>('/invoices', params);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get invoice by ID
   * @param id - Invoice ID
   * @returns Invoice details
   */
  getById: async (id: string): Promise<Invoice> => {
    try {
      return await api.get<Invoice>(`/invoices/${id}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new invoice
   * @param invoiceData - Invoice creation data
   * @returns Created invoice
   */
  create: async (invoiceData: CreateInvoiceRequest): Promise<Invoice> => {
    try {
      return await api.post<Invoice>('/invoices', invoiceData);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update existing invoice
   * @param id - Invoice ID
   * @param updates - Fields to update
   * @returns Updated invoice
   */
  update: async (id: string, updates: Partial<CreateInvoiceRequest>): Promise<Invoice> => {
    try {
      return await api.patch<Invoice>(`/invoices/${id}`, updates);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete invoice
   * @param id - Invoice ID
   */
  delete: async (id: string): Promise<{ message: string }> => {
    try {
      return await api.delete<{ message: string }>(`/invoices/${id}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Mark invoice as paid
   * @param id - Invoice ID
   * @param paidDate - Payment date
   * @returns Updated invoice
   */
  markAsPaid: async (id: string, paidDate?: string): Promise<Invoice> => {
    try {
      return await api.post<Invoice>(`/invoices/${id}/pay`, {
        paidDate: paidDate || new Date().toISOString(),
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Send invoice to customer
   * @param id - Invoice ID
   * @param email - Customer email (optional, uses invoice customer if not provided)
   */
  send: async (id: string, email?: string): Promise<{ message: string }> => {
    try {
      return await api.post<{ message: string }>(`/invoices/${id}/send`, { email });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Download invoice PDF
   * @param id - Invoice ID
   * @returns PDF blob
   */
  downloadPDF: async (id: string): Promise<Blob> => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'https://api.amaravathi.com/v1'}/invoices/${id}/pdf`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      );
      return await response.blob();
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get invoices by status
   * @param status - Invoice status
   * @returns Invoices with specified status
   */
  getByStatus: async (status: string): Promise<Invoice[]> => {
    try {
      return await api.get<Invoice[]>('/invoices', { status });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get overdue invoices
   * @returns List of overdue invoices
   */
  getOverdue: async (): Promise<Invoice[]> => {
    try {
      return await api.get<Invoice[]>('/invoices/overdue');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get invoices by shipment
   * @param shipmentId - Shipment ID
   * @returns Invoices related to shipment
   */
  getByShipment: async (shipmentId: string): Promise<Invoice[]> => {
    try {
      return await api.get<Invoice[]>(`/invoices/shipment/${shipmentId}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Calculate invoice totals
   * @param items - Invoice items
   * @returns Total calculations
   */
  calculateTotals: (items: Array<{ quantity: number; unitPrice: number }>): {
    subtotal: number;
    tax: number;
    total: number;
  } => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const tax = subtotal * 0.1; // 10% tax - adjust as needed
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  },
};

export default invoicesService;
