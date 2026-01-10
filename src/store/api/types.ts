/**
 * Shared TypeScript Types
 * Common interfaces used across multiple API endpoints
 */

// Country interface matching backend response
export interface Country {
  id: number;
  iso2: string | null;
  iso3: string | null;
  name: string;
  phoneCode: string | null;
  currency: string;
}

// Product Type interface matching backend response
export interface ProductType {
  id: number;
  code: string;
  name: string;
  category: string;
  hsCode: string;
}

// Role interface matching backend response
export interface Role {
  id: number;
  code: string;
  name: string;
  type: string | null;
  description: string;
}