import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Store, updateStore, deleteStore } from '../store/storesSlice';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StoresPage() {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores);
  const [editStore, setEditStore] = useState<Store | null>(null);
  const [storeToDelete, setStoreToDelete] = useState<Store | null>(null);

  const handleUpdate = () => {
    if (editStore) {
      dispatch(updateStore(editStore));
      setEditStore(null);
    }
  };

  const handleDelete = () => {
    if (storeToDelete) {
      dispatch(deleteStore(storeToDelete.id));
      setStoreToDelete(null);
    }
  };

  const columnDefs: ColDef<Store>[] = useMemo(
    () => [
      { field: 'seqNo', headerName: 'SNo.', width: 80, rowDrag: true },
      { field: 'label', headerName: 'Store', minWidth: 200 },
      { field: 'city', headerName: 'City', width: 150 },
      { field: 'state', headerName: 'State', width: 100 },
      {
        headerName: 'Actions',
        cellRenderer: (params: any) => (
          <div className="flex mt-2 items-center justify-center space-x-4">
            <Pencil size={18} className="cursor-pointer" onClick={() => setEditStore(params.data)} />
            <Trash2 size={18} className="cursor-pointer" onClick={() => setStoreToDelete(params.data)} />
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
      
      {/* Edit Store Modal */}
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
              <Button className="cursor-pointer" variant="outline" onClick={() => setEditStore(null)}>Cancel</Button>
              <Button className="cursor-pointer" onClick={handleUpdate}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation */}
      {storeToDelete && (
        <AlertDialog open={!!storeToDelete} onOpenChange={() => setStoreToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <p>Do you really want to delete {storeToDelete.label}?</p>
            <AlertDialogFooter>
              <Button className="cursor-pointer" variant="outline" onClick={() => setStoreToDelete(null)}>Cancel</Button>
              <Button className="cursor-pointer" variant="destructive" onClick={handleDelete}>Delete</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
