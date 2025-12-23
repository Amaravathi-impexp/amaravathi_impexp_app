/**
 * Documents Service
 * Handles document upload, download, and management API calls
 */

import api from './api';
import type { Document, UploadDocumentRequest, PaginationParams, PaginatedResponse } from '../types';

export const documentsService = {
  /**
   * Get all documents with pagination and filters
   * @param params - Pagination and filter parameters
   * @returns Paginated list of documents
   */
  getAll: async (params?: PaginationParams & { type?: string; shipmentId?: string; search?: string }): Promise<PaginatedResponse<Document>> => {
    try {
      return await api.get<PaginatedResponse<Document>>('/documents', params);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get document by ID
   * @param id - Document ID
   * @returns Document details
   */
  getById: async (id: string): Promise<Document> => {
    try {
      return await api.get<Document>(`/documents/${id}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Upload document
   * @param documentData - Document upload data including file
   * @returns Uploaded document
   */
  upload: async (documentData: UploadDocumentRequest): Promise<Document> => {
    try {
      const formData = new FormData();
      formData.append('file', documentData.file);
      formData.append('name', documentData.name);
      formData.append('type', documentData.type);
      if (documentData.shipmentId) {
        formData.append('shipmentId', documentData.shipmentId);
      }

      return await api.upload<Document>('/documents/upload', formData);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete document
   * @param id - Document ID
   */
  delete: async (id: string): Promise<{ message: string }> => {
    try {
      return await api.delete<{ message: string }>(`/documents/${id}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Download document
   * @param id - Document ID
   * @returns File blob
   */
  download: async (id: string): Promise<Blob> => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'https://api.amaravathi.com/v1'}/documents/${id}/download`,
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
   * Get documents by shipment
   * @param shipmentId - Shipment ID
   * @returns Documents related to shipment
   */
  getByShipment: async (shipmentId: string): Promise<Document[]> => {
    try {
      return await api.get<Document[]>(`/documents/shipment/${shipmentId}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get documents by type
   * @param type - Document type
   * @returns Documents of specified type
   */
  getByType: async (type: string): Promise<Document[]> => {
    try {
      return await api.get<Document[]>('/documents', { type });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search documents
   * @param query - Search query
   * @returns Matching documents
   */
  search: async (query: string): Promise<Document[]> => {
    try {
      return await api.get<Document[]>('/documents/search', { q: query });
    } catch (error) {
      throw error;
    }
  },
};

export default documentsService;
