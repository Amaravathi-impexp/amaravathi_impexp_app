/**
 * Shipments Slice
 * Manages shipment data and state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Shipment } from '../../types';

interface ShipmentsState {
  shipments: Shipment[];
  selectedShipment: Shipment | null;
  loading: boolean;
  error: string | null;
}

const initialState: ShipmentsState = {
  shipments: [],
  selectedShipment: null,
  loading: false,
  error: null,
};

const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    setShipments: (state, action: PayloadAction<Shipment[]>) => {
      state.shipments = action.payload;
      state.loading = false;
      state.error = null;
    },
    addShipment: (state, action: PayloadAction<Shipment>) => {
      state.shipments.unshift(action.payload);
    },
    updateShipment: (state, action: PayloadAction<Shipment>) => {
      const index = state.shipments.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.shipments[index] = action.payload;
      }
      if (state.selectedShipment?.id === action.payload.id) {
        state.selectedShipment = action.payload;
      }
    },
    deleteShipment: (state, action: PayloadAction<string>) => {
      state.shipments = state.shipments.filter(s => s.id !== action.payload);
      if (state.selectedShipment?.id === action.payload) {
        state.selectedShipment = null;
      }
    },
    setSelectedShipment: (state, action: PayloadAction<Shipment | null>) => {
      state.selectedShipment = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setShipments,
  addShipment,
  updateShipment,
  deleteShipment,
  setSelectedShipment,
  setLoading,
  setError,
} = shipmentsSlice.actions;

export default shipmentsSlice.reducer;
