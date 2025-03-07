import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { RootState } from '../store';
import { SKU, addSku, updateSku, deleteSku } from '../store/skusSlice';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { ColDef } from 'ag-grid-community';

export default function SkusPage() {
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.skus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSku, setEditSku] = useState<SKU | null>(null);
  const [skuToDelete, setSkuToDelete] = useState<SKU | null>(null);

  const columnDefs: ColDef<SKU>[] = useMemo(() => [
    {
        headerName: '',
        width: 60,
        cellRenderer: (params: any) => (
            <Trash2 size={18} className="mt-2 cursor-pointer" onClick={() => setSkuToDelete(params.data)} />
        ),
      },
    { 
      field: 'label',
      headerName: 'SKU',
      minWidth: 200
    },
    { 
      field: 'price',
      headerName: 'Price',
      width: 120,
      valueFormatter: (params: any) => 
        params.value ? `$${params.value.toFixed(2)}` : '',
      type: 'numericColumn'
    },
    { 
      field: 'cost',
      headerName: 'Cost',
      width: 120,
      valueFormatter: (params: any) => 
        params.value ? `$${params.value.toFixed(2)}` : '',
      type: 'numericColumn'
    },
    {
      headerName: 'Edit',
      width: 120,
      cellRenderer: (params: any) => (
          <Pencil size={18} className="mt-2 cursor-pointer" onClick={() => {setEditSku(params.data); setIsModalOpen(true);}} />
      ),
    }
  ], [dispatch]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true
  }), []);

  const handleSave = () => {
    if (editSku) {
      if (editSku.id) {
        dispatch(updateSku(editSku)); // Updating existing SKU
      } else {
        dispatch(
          addSku({
            ...editSku,
            id: `SKU${Date.now()}`, // Unique ID
            seqNo: skus.length + 1,
          })
        );
      }
      setIsModalOpen(false);
      setEditSku(null);
    }
  };
    const handleDelete = () => {
        if (skuToDelete) {
          dispatch(deleteSku(skuToDelete.id));
          setSkuToDelete(null);
        }
      };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">SKUs Management</h1>
        <button
          onClick={() => {
            setEditSku(null);
            setIsModalOpen(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add SKU</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="ag-theme-alpine w-full h-[600px]">
          <AgGridReact
            rowData={skus}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
          />
        </div>
      </div>
      {/* Add/Edit SKU Modal */}
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editSku?.id ? "Edit SKU" : "Add SKU"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sku-label">Sku Name</Label>
                <Input
                  id="sku-label"
                  value={editSku?.label ?? ""}
                  onChange={(e) =>
                    setEditSku((prev) => ({ ...prev!, label: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku-price">Price</Label>
                <Input
                  id="sku-price"
                  type="number"
                  value={editSku?.price ?? 0}
                  onChange={(e) =>
                    setEditSku((prev) => ({ ...prev!, price: Number(e.target.value) }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku-cost">Cost</Label>
                <Input
                  id="sku-cost"
                  type="number"
                  value={editSku?.cost ?? 0}
                  onChange={(e) =>
                    setEditSku((prev) => ({ ...prev!, cost: Number(e.target.value) }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {skuToDelete && (
        <AlertDialog open={!!skuToDelete} onOpenChange={() => setSkuToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <p>Do you really want to delete {skuToDelete.label}?</p>
            <AlertDialogFooter>
              <Button className="cursor-pointer" variant="outline" onClick={() => setSkuToDelete(null)}>Cancel</Button>
              <Button className="cursor-pointer" variant="destructive" onClick={handleDelete}>Delete</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}