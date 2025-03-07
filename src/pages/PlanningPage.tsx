import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updatePlanningCell } from '../store/planningSlice';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function PlanningPage() {
  const dispatch = useDispatch();
  const planningData = useSelector((state: RootState) => state.planning.rows);

  const columnDefs = useMemo(() => {
    const baseColumns = [
      {
        headerName: 'Store',
        field: 'store.label',
        width: 200,
        pinned: 'left' as const,
        cellStyle: { backgroundColor: '#f8fafc', fontWeight: 500 }
      },
      {
        headerName: 'SKU',
        field: 'sku.label',
        width: 200,
        pinned: 'left' as const,
        cellStyle: { backgroundColor: '#f8fafc', fontWeight: 500 }
      }
    ];
  
    const months = ['March', 'April', 'May'];
  
    const monthColumns: any = months.map(month => ({
      headerName: month,
      groupId: month,
      headerClass: 'centered-header',
      children: Array.from({ length: 4 }, (_, i) => {
        const week = `${month}_W${i + 1}`;
        return {
          headerName: `Week ${i + 1}`, 
          headerClass: 'centered-header',
          children: [
            {
              headerName: 'Units Sold',
              field: `${week}.salesUnits`,
              width: 120,
              editable: true,
              valueParser: (params: any) => Number(params.newValue),
              cellStyle: { backgroundColor: '#f0f9ff' },
              valueGetter: (params: any) => params.data?.[week]?.salesUnits || 0,
              cellClass: 'numeric-cell',
              valueSetter: (params: any) => {
                const salesUnits = Number(params.newValue) || 0;
                const price = params.data.sku.price;
                const cost = params.data.sku.cost;
                const salesDollars = salesUnits * price;
                const gmDollars = salesDollars - (salesUnits * cost);
                const gmPercent = salesDollars > 0 ? (gmDollars / salesDollars) * 100 : 0;
  
                const data = { salesUnits, salesDollars, gmDollars, gmPercent };
  
                dispatch(updatePlanningCell({
                  storeId: params.data.store.id,
                  skuId: params.data.sku.id,
                  weekId: week,
                  data
                }));
  
                params.data[week] = data;
                return true;
              }
            },
            {
              headerName: 'Sales $',
              field: `${week}.salesDollars`,
              width: 120,
              valueGetter: (params: any) => params.data?.[week]?.salesDollars || 0,
              valueFormatter: (params: any) => params.value ? `$${params.value.toFixed(2)}` : '$0.00',
              cellStyle: { backgroundColor: '#f0f9ff' },
              cellClass: 'numeric-cell'
            },
            {
              headerName: 'GM $',
              field: `${week}.gmDollars`,
              width: 120,
              valueGetter: (params: any) => params.data?.[week]?.gmDollars || 0,
              valueFormatter: (params: any) => params.value ? `$${params.value.toFixed(2)}` : '$0.00',
              cellStyle: { backgroundColor: '#f0f9ff' },
              cellClass: 'numeric-cell'
            },
            {
              headerName: 'GM %',
              field: `${week}.gmPercent`,
              width: 120,
              valueGetter: (params: any) => params.data?.[week]?.gmPercent || 0,
              valueFormatter: (params: any) => params.value ? `${params.value.toFixed(1)}%` : '0.0%',
              cellClass: 'numeric-cell',
              cellStyle: (params: any) => {
                const value = params.value || 0;
                if (value >= 40) return { backgroundColor: '#dcfce7', color: '#166534', fontWeight: '500' };
                else if (value >= 10) return { backgroundColor: '#fef9c3', color: '#854d0e', fontWeight: '500' };
                else if (value > 5) return { backgroundColor: '#fed7aa', color: '#9a3412', fontWeight: '500' };
                return { backgroundColor: '#fecaca', color: '#991b1b', fontWeight: '500' };
              }
            }
          ]
        };
      })
    }));
  
    return [...baseColumns, ...monthColumns];
  }, [dispatch]);
  

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    suppressMovable: true
  }), []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Planning</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div 
          className="ag-theme-alpine w-full h-[600px]"
        >
          <AgGridReact
            rowData={planningData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            groupDisplayType="groupRows"
            suppressRowTransform={true}
            rowHeight={48}
            headerHeight={48}
            groupHeaderHeight={48}
          />
        </div>
      </div>
    </div>
  );
}