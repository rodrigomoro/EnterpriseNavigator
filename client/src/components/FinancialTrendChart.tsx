import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { addMonths, format, parseISO, subMonths } from 'date-fns';
import { sma } from 'moving-averages';
import { mockInvoices } from "@/data/mockInvoices";

interface DataPoint {
  date: string;
  amount: number;
  prediction?: number;
}

export default function FinancialTrendChart() {
  const [timeRange, setTimeRange] = useState('6');
  
  const data = useMemo(() => {
    const today = new Date();
    const startDate = subMonths(today, parseInt(timeRange));
    
    // Group invoices by month
    const monthlyData = mockInvoices.reduce((acc, invoice) => {
      const date = format(parseISO(invoice.issueDate), 'MMM yyyy');
      acc[date] = (acc[date] || 0) + invoice.totalAmount;
      return acc;
    }, {} as Record<string, number>);

    // Generate all months in range
    const allMonths: DataPoint[] = [];
    for (let i = 0; i <= parseInt(timeRange); i++) {
      const date = format(subMonths(today, i), 'MMM yyyy');
      allMonths.unshift({
        date,
        amount: monthlyData[date] || 0
      });
    }

    // Calculate moving average for prediction
    const values = allMonths.map(d => d.amount);
    const movingAverage = sma(values, 3);

    // Add predictions for next 3 months
    const withPredictions = [...allMonths];
    for (let i = 1; i <= 3; i++) {
      const date = format(addMonths(today, i), 'MMM yyyy');
      const lastMA = movingAverage[movingAverage.length - 1];
      withPredictions.push({
        date,
        amount: 0,
        prediction: lastMA + (lastMA * 0.05 * i) // Simple growth projection
      });
    }

    return withPredictions;
  }, [timeRange]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Revenue Trend & Forecast</CardTitle>
        <Select
          value={timeRange}
          onValueChange={(value) => setTimeRange(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">Last 3 months</SelectItem>
            <SelectItem value="6">Last 6 months</SelectItem>
            <SelectItem value="12">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                className="text-xs" 
                tickLine={false}
              />
              <YAxis 
                className="text-xs"
                tickFormatter={(value) => `€${value.toLocaleString()}`}
                tickLine={false}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Date
                            </span>
                            <span className="font-bold">
                              {payload[0].payload.date}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {payload[0].payload.prediction ? 'Forecast' : 'Amount'}
                            </span>
                            <span className="font-bold">
                              €{(payload[0].payload.prediction || payload[0].payload.amount).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="prediction"
                stroke="hsl(var(--primary))"
                strokeDasharray="5 5"
                fillOpacity={1}
                fill="url(#colorPrediction)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
