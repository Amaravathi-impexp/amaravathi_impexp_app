/**
 * Partners Slice
 * Manages partner directory data and state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Partner } from '../../types';

interface PartnersState {
  partners: Partner[];
  selectedPartner: Partner | null;
  loading: boolean;
  error: string | null;
}

const initialState: PartnersState = {
  partners: [],
  selectedPartner: null,
  loading: false,
  error: null,
};

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    setPartners: (state, action: PayloadAction<Partner[]>) => {
      state.partners = action.payload;
      state.loading = false;
      state.error = null;
    },
    addPartner: (state, action: PayloadAction<Partner>) => {
      state.partners.unshift(action.payload);
    },
    updatePartner: (state, action: PayloadAction<Partner>) => {
      const index = state.partners.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.partners[index] = action.payload;
      }
      if (state.selectedPartner?.id === action.payload.id) {
        state.selectedPartner = action.payload;
      }
    },
    deletePartner: (state, action: PayloadAction<string>) => {
      state.partners = state.partners.filter(p => p.id !== action.payload);
      if (state.selectedPartner?.id === action.payload) {
        state.selectedPartner = null;
      }
    },
    setSelectedPartner: (state, action: PayloadAction<Partner | null>) => {
      state.selectedPartner = action.payload;
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
  setPartners,
  addPartner,
  updatePartner,
  deletePartner,
  setSelectedPartner,
  setLoading,
  setError,
} = partnersSlice.actions;

export default partnersSlice.reducer;
