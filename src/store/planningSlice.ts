import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from './storesSlice';
import { SKU } from './skusSlice';

export interface PlanningCell {
  salesUnits: number;
  salesDollars: number;
  gmDollars: number;
  gmPercent: number;
}

export interface PlanningRow {
  store: Store;
  sku: SKU;
  [key: string]: any;
}

interface PlanningState {
  rows: PlanningRow[];
}

// Helper function to generate realistic sales patterns
const generateSalesPattern = (baseUnits: number, variance: number, trend: number = 0) => {
  return Math.max(0, Math.floor(
    baseUnits + 
    (Math.random() * 2 - 1) * variance + // Random variance
    trend // Trend adjustment
  ));
};

const generateSampleData = () => {
  const stores = [
    { seqNo: 1, id: 'ST035', label: 'San Francisco Bay Trends', city: 'San Francisco', state: 'CA' },
    { seqNo: 2, id: 'ST046', label: 'Phoenix Sunwear', city: 'Phoenix', state: 'AZ' },
    { seqNo: 3, id: 'ST064', label: 'Dallas Ranch Supply', city: 'Dallas', state: 'TX' },
    { seqNo: 4, id: 'ST066', label: 'Atlanta Outfitters', city: 'Atlanta', state: 'GA' },
    { seqNo: 5, id: 'ST073', label: 'Nashville Melody Music Store', city: 'Nashville', state: 'TN' },
    { seqNo: 6, id: 'ST074', label: 'New York Empire Eats', city: 'New York', state: 'NY' },
    { seqNo: 7, id: 'ST091', label: 'Denver Peaks Outdoor', city: 'Denver', state: 'CO' },
    { seqNo: 8, id: 'ST094', label: 'Philadelphia Liberty Market', city: 'Philadelphia', state: 'PA' },
    { seqNo: 9, id: 'ST097', label: 'Boston Harbor Books', city: 'Boston', state: 'MA' },
    { seqNo: 10, id: 'ST101', label: 'Austin Vibe Co.', city: 'Austin', state: 'TX' },
    { seqNo: 11, id: 'ST131', label: 'Los Angeles Luxe', city: 'Los Angeles', state: 'CA' },
    { seqNo: 12, id: 'ST150', label: 'Houston Harvest Market', city: 'Houston', state: 'TX' },
    { seqNo: 13, id: 'ST151', label: 'Portland Evergreen Goods', city: 'Portland', state: 'OR' },
    { seqNo: 14, id: 'ST156', label: 'Chicago Charm Boutique', city: 'Chicago', state: 'IL' },
    { seqNo: 15, id: 'ST163', label: 'Las Vegas Neon Treasures', city: 'Las Vegas', state: 'NV' },
    { seqNo: 16, id: 'ST175', label: 'Seattle Skyline Goods', city: 'Seattle', state: 'WA' },
    { seqNo: 17, id: 'ST176', label: 'Miami Breeze Apparel', city: 'Miami', state: 'FL' },
    { seqNo: 18, id: 'ST177', label: 'San Diego Wave Surf Shop', city: 'San Diego', state: 'CA' },
    { seqNo: 19, id: 'ST193', label: "Charlotte Queen Closet", city: 'Charlotte', state: 'NC' },
    { seqNo: 20, id: 'ST208', label: 'Detroit Motor Gear', city: 'Detroit', state: 'MI' }
  ];

  const skus = [
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

  const weeks = ['March_W1', 'March_W2', 'March_W3', 'March_W4', 
                'April_W1', 'April_W2', 'April_W3', 'April_W4',
                'May_W1', 'May_W2', 'May_W3', 'May_W4'];

  const rows: PlanningRow[] = [];
  
  stores.forEach(store => {
    const storeMultiplier = 0.5 + Math.random() * 1.5; // Random multiplier between 0.5 and 2

    skus.forEach(sku => {
      const row: PlanningRow = {
        store,
        sku,
        id: `${store.id}_${sku.id}`
      };

      // Base units for this SKU (some products sell more than others)
      const baseUnits = Math.floor((20 + Math.random() * 80) * storeMultiplier);
      const variance = baseUnits * 0.3; // 30% variance

      weeks.forEach((week, index) => {
        // Add seasonal trends and weekly patterns
        let trend = 0;
        
        // Spring season trend (increasing sales)
        trend += index * (baseUnits * 0.02);
        
        // Weekly pattern (higher sales on weekends)
        if (index % 4 === 2 || index % 4 === 3) {
          trend += baseUnits * 0.1;
        }

        const salesUnits = generateSalesPattern(baseUnits, variance, trend);
        const salesDollars = salesUnits * sku.price;
        const gmDollars = salesDollars - (salesUnits * sku.cost);
        const gmPercent = (gmDollars / salesDollars) * 100;

        row[week] = {
          salesUnits,
          salesDollars,
          gmDollars,
          gmPercent
        };
      });

      rows.push(row);
    });
  });

  return rows;
};

const initialState: PlanningState = {
  rows: generateSampleData()
};

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    updatePlanningCell: (state, action: PayloadAction<{
      storeId: string;
      skuId: string;
      weekId: string;
      data: PlanningCell;
    }>) => {
      const { storeId, skuId, weekId, data } = action.payload;
      const row = state.rows.find(r => r.store.id === storeId && r.sku.id === skuId);
      if (row) {
        row[weekId] = data;
      }
    }
  }
});

export const { updatePlanningCell } = planningSlice.actions;
export default planningSlice.reducer;