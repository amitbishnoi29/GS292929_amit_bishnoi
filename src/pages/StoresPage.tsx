import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Store, updateStore, deleteStore, reorderStores, addStore } from '../store/storesSlice';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StoresPage() {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores);
  const [storeModal, setStoreModal] = useState<Store | null>(null);
  const [storeToDelete, setStoreToDelete] = useState<Store | null>(null);

  const handleSave = () => {
    if (storeModal) {
      if (storeModal.id) {
        dispatch(updateStore(storeModal));
      } else {
        dispatch(addStore({ ...storeModal, id: Date.now().toString() }));
      }
      setStoreModal(null);
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
            <Pencil size={18} data-testid="edit-button" className="cursor-pointer" onClick={() => setStoreModal(params.data)} />
            <Trash2 size={18} data-testid="delete-button" className="cursor-pointer" onClick={() => setStoreToDelete(params.data)} />
          </div>
        ),
        width: 120,
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div className='flex items-center justify-between'>
        <h1 className="text-2xl font-bold text-gray-900">Stores Management</h1>
        <Button
          className="cursor-pointer"
          onClick={() =>
            setStoreModal({
              id: "",
              label: "",
              city: "",
              state: "",
              seqNo: stores.length + 1,
            })
          }
        >
          <Plus className="mr-2" /> Add Store
        </Button>
      </div>
      <div className="ag-theme-alpine w-full h-[600px]">
        <AgGridReact
          rowData={stores}
          columnDefs={columnDefs}
          animateRows={true}
          rowDragManaged={true}
          onRowDragEnd={(event) => {
            const newStores = [...stores];
            const [draggedNode] = event.node ? [event.node] : [];
            if (draggedNode) {
              const fromIndex = stores.findIndex(
                (store) => store.seqNo === draggedNode?.data?.seqNo
              );
              const toIndex = event.overIndex ?? 0;
              const [removed] = newStores.splice(fromIndex, 1);
              newStores.splice(toIndex, 0, removed);
              newStores.forEach((store, index) => {
                store.seqNo = index + 1;
              });
              dispatch(reorderStores(newStores));
            }
          }}
        />
      </div>

      {storeModal && (
        <Dialog open={!!storeModal} onOpenChange={() => setStoreModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {storeModal.id ? "Edit Store" : "Add Store"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="store-label" className='mb-2'>Store Name</Label>
                <Input
                  id="store-label"
                  value={storeModal.label}
                  onChange={(e) =>
                    setStoreModal({ ...storeModal, label: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="store-city" className='mb-2'>City</Label>
                <Input
                  id="store-city"
                  value={storeModal.city}
                  onChange={(e) =>
                    setStoreModal({ ...storeModal, city: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="store-state" className='mb-2'>State</Label>
                <Input
                  id="store-state"
                  value={storeModal.state}
                  onChange={(e) =>
                    setStoreModal({ ...storeModal, state: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => setStoreModal(null)}
              >
                Cancel
              </Button>
              <Button className="cursor-pointer" onClick={handleSave}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {storeToDelete && (
        <AlertDialog
          open={!!storeToDelete}
          onOpenChange={() => setStoreToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <p>Do you really want to delete {storeToDelete.label}?</p>
            <AlertDialogFooter>
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => setStoreToDelete(null)}
              >
                Cancel
              </Button>
              <Button
                className="cursor-pointer"
                variant="destructive"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
