import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Plus } from 'lucide-react';

interface Store {
  seqNo: number;
  id: string;
  label: string;
  city: string;
  state: string;
}

const initialStores: Store[] = [
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
  { seqNo: 19, id: 'ST193', label: "Charlotte Queen's Closet", city: 'Charlotte', state: 'NC' },
  { seqNo: 20, id: 'ST208', label: 'Detroit Motor Gear', city: 'Detroit', state: 'MI' }
];

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>(initialStores);

  const columnDefs: ColDef<Store>[] = useMemo<ColDef<Store>[]>(() => [
    { 
      field: 'seqNo',
      headerName: 'SNo.',
      width: 120,
      rowDrag:true,
      editable: true
    },
    { 
      field: 'label',
      headerName: 'Store',
      minWidth: 200,
      editable: true
    },
    { 
      field: 'city',
      headerName: 'City',
      width: 150,
      editable: true
    },
    { 
      field: 'state',
      headerName: 'State',
      width: 100,
      editable: true,
      flex: 1,
    }
  ], []);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true
  }), []);

  const addNewStore = () => {
    const newStore: Store = {
      seqNo: stores.length + 1,
      id: `ST${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      label: 'New Store',
      city: '',
      state: ''
    };
    setStores([...stores, newStore]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Stores Management</h1>
        <button
          onClick={addNewStore}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Store</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="ag-theme-alpine w-full h-[600px]">
          <AgGridReact
            rowData={stores}
            columnDefs={columnDefs}
            rowDragManaged={true}
            defaultColDef={defaultColDef}
            animateRows={true}
            onRowDragEnd={(event) => {
              const newStores = [...stores];
              const [draggedNode] = event.node ? [event.node] : [];
              if (draggedNode) {
                const fromIndex = stores.findIndex(store => store.seqNo === draggedNode?.data?.seqNo);
                const toIndex = event.overIndex ?? 0;
                const [removed] = newStores.splice(fromIndex, 1);
                newStores.splice(toIndex, 0, removed);
                // Update sequence numbers
                newStores.forEach((store, index) => {
                  store.seqNo = index + 1;
                });
                setStores(newStores);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}