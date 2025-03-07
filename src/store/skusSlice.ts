import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SKU {
  seqNo: number;
  id: string;
  label: string;
  price: number;
  cost: number;
}

const initialSkus: SKU[] = [
  { seqNo: 1, id: 'SKU001', label: 'Premium Cotton T-Shirt', price: 29.99, cost: 12.50 },
  { seqNo: 2, id: 'SKU002', label: 'Designer Denim Jeans', price: 89.99, cost: 35.00 },
  { seqNo: 3, id: 'SKU003', label: 'Athletic Performance Sneakers', price: 79.99, cost: 32.00 },
  { seqNo: 4, id: 'SKU004', label: 'Leather Crossbody Bag', price: 129.99, cost: 52.00 },
  { seqNo: 5, id: 'SKU005', label: 'Aviator Sunglasses', price: 149.99, cost: 45.00 },
  { seqNo: 6, id: 'SKU006', label: 'Wireless Earbuds', price: 199.99, cost: 80.00 },
  { seqNo: 7, id: 'SKU007', label: 'Smart Fitness Watch', price: 249.99, cost: 100.00 },
  { seqNo: 8, id: 'SKU008', label: 'Organic Cotton Hoodie', price: 59.99, cost: 24.00 },
  { seqNo: 9, id: 'SKU009', label: 'Yoga Mat Premium', price: 45.99, cost: 18.40 },
  { seqNo: 10, id: 'SKU010', label: 'Stainless Water Bottle', price: 34.99, cost: 14.00 }
];

const skusSlice = createSlice({
  name: 'skus',
  initialState: initialSkus,
  reducers: {
    addSku: (state, action: PayloadAction<SKU>) => {
      state.push(action.payload);
    },
    updateSku: (state, action: PayloadAction<SKU>) => {
      const index = state.findIndex(sku => sku.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteSku: (state, action: PayloadAction<string>) => {
      return state.filter(sku => sku.id !== action.payload);
    },
    reorderSkus: (_, action: PayloadAction<SKU[]>) => {
      return action.payload;
    }
  }
});

export const { addSku, updateSku, deleteSku, reorderSkus } = skusSlice.actions;
export default skusSlice.reducer;