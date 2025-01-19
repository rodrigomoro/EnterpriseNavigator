import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockInvoices } from "@/data/mockData";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import UserAvatar from "@/components/UserAvatar";
import FinancialTrendChart from "@/components/FinancialTrendChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { addMonths, format, parseISO, subMonths, differenceInDays } from 'date-fns';
import { sma } from 'moving-averages';

// Calculate average processing time
const getProcessingTimeData = () => {
  return mockInvoices.map(invoice => {
    const createdDate = new Date(invoice.auditTrail[0].timestamp);
    const lastAction = invoice.auditTrail[invoice.auditTrail.length - 1];
    const completedDate = new Date(lastAction.timestamp);
    const processingTime = differenceInDays(completedDate, createdDate);

    return {
      invoiceId: invoice.invoiceNumber,
      processingTime,
      status: invoice.status
    };
  });
};

// Calculate approval rates
const getApprovalRates = () => {
  const total = mockInvoices.length;
  const approved = mockInvoices.filter(i => i.status === 'accepted').length;
  const rejected = mockInvoices.filter(i => i.status === 'rejected').length;
  const pending = total - approved - rejected;

  return [
    { name: 'Approved', value: (approved / total) * 100 },
    { name: 'Rejected', value: (rejected / total) * 100 },
    { name: 'Pending', value: (pending / total) * 100 }
  ];
};

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('12');
  const processingTimeData = getProcessingTimeData();
  const approvalRates = getApprovalRates();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                <p className="text-muted-foreground">Comprehensive analysis and insights</p>
              </div>

              <div className="flex items-center gap-4">
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
                <UserAvatar />
              </div>
            </div>

            <div className="space-y-6">
              {/* Revenue Trend with Predictions */}
              <FinancialTrendChart />

              {/* Processing Time Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Processing Time Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={processingTimeData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="invoiceId" />
                        <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                        <Tooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                                        Invoice
                                      </span>
                                      <span className="font-bold">
                                        {payload[0].payload.invoiceId}
                                      </span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                                        Processing Time
                                      </span>
                                      <span className="font-bold">
                                        {payload[0].value} days
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="processingTime" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Approval Rate Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Approval Rate Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={approvalRates}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                                        Status
                                      </span>
                                      <span className="font-bold">
                                        {payload[0].payload.name}
                                      </span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                                        Percentage
                                      </span>
                                      <span className="font-bold">
                                        {payload[0].value.toFixed(1)}%
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
                          dataKey="value"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary))"
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
