/**
 * Base API Configuration and HTTP Client
 * This file provides the core HTTP client for making REST API calls
 */

// API Configuration
const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'https://api.amaravathi.com/v1',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
};

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Error handling
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Set auth token in localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem('auth_token');
};

// Base fetch wrapper with error handling
async function fetchWithConfig<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...API_CONFIG.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, config);
    
    // Parse response
    const data = await response.json().catch(() => ({}));

    // Handle HTTP errors
    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.message || `HTTP Error: ${response.status}`,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      0,
      error instanceof Error ? error.message : 'Network error occurred',
      null
    );
  }
}

// HTTP Methods
export const api = {
  // GET request
  get: async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    const queryString = params
      ? '?' + new URLSearchParams(params).toString()
      : '';
    return fetchWithConfig<T>(`${endpoint}${queryString}`, {
      method: 'GET',
    });
  },

  // POST request
  post: async <T>(endpoint: string, data?: any): Promise<T> => {
    return fetchWithConfig<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // PUT request
  put: async <T>(endpoint: string, data?: any): Promise<T> => {
    return fetchWithConfig<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // PATCH request
  patch: async <T>(endpoint: string, data?: any): Promise<T> => {
    return fetchWithConfig<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // DELETE request
  delete: async <T>(endpoint: string): Promise<T> => {
    return fetchWithConfig<T>(endpoint, {
      method: 'DELETE',
    });
  },

  // Upload file
  upload: async <T>(endpoint: string, formData: FormData): Promise<T> => {
    const token = getAuthToken();
    
    const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.message || `Upload failed: ${response.status}`,
        data
      );
    }

    return data;
  },
};

export default api;
