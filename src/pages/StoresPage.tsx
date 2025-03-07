import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"


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
  const [editStore, setEditStore] = useState<Store | null>(null);
  const [deleteStore, setDeleteStore] = useState<Store | null>(null);

  const handleUpdate = () => {
    if (editStore) {
      setStores((prev) => prev.map((store) => (store.id === editStore.id ? editStore : store)));
      setEditStore(null);
    }
  };

  const handleDelete = () => {
    if (deleteStore) {
      setStores((prev) => prev.filter((store) => store.id !== deleteStore.id));
      setDeleteStore(null);
    }
  };

  const columnDefs: ColDef<Store>[] = useMemo<ColDef<Store>[]>(
    () => [
      { field: 'seqNo', headerName: 'SNo.', width: 80 },
      { field: 'label', headerName: 'Store', minWidth: 200 },
      { field: 'city', headerName: 'City', width: 150 },
      { field: 'state', headerName: 'State', width: 100 },
      {
        headerName: 'Actions',
        cellRenderer: (params: any) => (
          <div className="flex mt-2 items-center justify-center space-x-4">
            <Pencil size={18} className="cursor-pointer" onClick={() => setEditStore(params.data)} />
            <Trash2 size={18} className="cursor-pointer" onClick={() => setDeleteStore(params.data)} />
          </div>
        ),
        width: 120,
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Stores Management</h1>
      <div className="ag-theme-alpine w-full h-[600px]">
        <AgGridReact rowData={stores} columnDefs={columnDefs} animateRows={true} />
      </div>
      
      {/* Edit Modal */}


{editStore && (
  <Dialog open={!!editStore} onOpenChange={() => setEditStore(null)}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Store</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <Label htmlFor="store-label">Store Name</Label>
          <Input 
            id="store-label"
            value={editStore.label} 
            onChange={(e) => setEditStore({ ...editStore, label: e.target.value })} 
          />
        </div>
        <div>
          <Label htmlFor="store-city">City</Label>
          <Input 
            id="store-city"
            value={editStore.city} 
            onChange={(e) => setEditStore({ ...editStore, city: e.target.value })} 
          />
        </div>
        <div>
          <Label htmlFor="store-state">State</Label>
          <Input 
            id="store-state"
            value={editStore.state} 
            onChange={(e) => setEditStore({ ...editStore, state: e.target.value })} 
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setEditStore(null)}>Cancel</Button>
        <Button onClick={handleUpdate}>Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)}


      {/* Delete Confirmation */}
      {deleteStore && (
        <AlertDialog open={!!deleteStore} onOpenChange={() => setDeleteStore(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <p>Do you really want to delete {deleteStore.label}?</p>
            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setDeleteStore(null)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
