import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

export default function ChartPage() {
  const planningData = useSelector((state: RootState) => state.planning.rows);
  const stores = useSelector((state: RootState) => state.stores);
  const [selectedStore, setSelectedStore] = useState(stores[0]?.id || '');

  const chartData = useMemo(() => {
    if (!selectedStore) return [];

    const storeData = planningData.filter(row => row.store.id === selectedStore);
    const weeks = ['March_W1', 'March_W2', 'March_W3', 'March_W4',
                  'April_W1', 'April_W2', 'April_W3', 'April_W4',
                  'May_W1', 'May_W2', 'May_W3', 'May_W4'];

    return weeks.map(week => {
      const weekData = storeData.reduce((acc, row) => {
        const weekStats = row[week] || { gmDollars: 0, salesDollars: 0 };
        return {
          gmDollars: acc.gmDollars + (weekStats.gmDollars || 0),
          salesDollars: acc.salesDollars + (weekStats.salesDollars || 0)
        };
      }, { gmDollars: 0, salesDollars: 0 });

      const gmPercent = weekData.salesDollars > 0
        ? (weekData.gmDollars / weekData.salesDollars) * 100
        : 0;

      return {
        week: week.replace('_', ' '),
        gmDollars: weekData.gmDollars,
        gmPercent
      };
    });
  }, [selectedStore, planningData]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Performance Chart</h1>
        <Select
          value={selectedStore}
          onValueChange={(value) => setSelectedStore(value)}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select store" />
          </SelectTrigger>
          <SelectContent>
            {stores.map((store) => (
              <SelectItem key={store.id} value={store.id}>
                {store.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow-md p-2 sm:p-6">
        <div className="w-full h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="week"
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                tick={{ fill: "#475569", fontSize: 12 }}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                tick={{ fill: "#475569", fontSize: 12 }}
                label={{
                  value: "GM Dollars",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#475569",
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => `${value.toFixed(1)}%`}
                tick={{ fill: "#475569", fontSize: 12 }}
                label={{
                  value: "GM Percentage",
                  angle: 90,
                  position: "insideRight",
                  fill: "#475569",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
                formatter={(value: any, name: string) => {
                  if (name === "GM Dollars")
                    return [`$${value.toFixed(2)}`, name];
                  return [`${value.toFixed(1)}%`, name];
                }}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="gmDollars"
                name="GM Dollars"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                yAxisId="right"
                dataKey="gmPercent"
                name="GM Percentage"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}