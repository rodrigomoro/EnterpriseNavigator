import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockInvoices } from "@/data/mockData";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import UserAvatar from "@/components/UserAvatar";
import FinancialTrendChart from "@/components/FinancialTrendChart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Euro } from 'lucide-react';

// Calculate total revenue
const totalRevenue = mockInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);

// Calculate status distribution
const statusDistribution = mockInvoices.reduce((acc, invoice) => {
  acc[invoice.status] = (acc[invoice.status] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const statusColors = {
  draft: '#94a3b8',
  pending_approval: '#fbbf24',
  approved: '#22c55e',
  rejected: '#ef4444',
  signed: '#3b82f6',
  submitted: '#f59e0b',
  accepted: '#10b981'
};

const pieChartData = Object.entries(statusDistribution).map(([name, value]) => ({
  name: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '),
  value
}));

// Calculate monthly revenue data
const monthlyRevenue = mockInvoices.reduce((acc, invoice) => {
  const month = new Date(invoice.issueDate).toLocaleString('default', { month: 'short' });
  acc[month] = (acc[month] || 0) + invoice.totalAmount;
  return acc;
}, {} as Record<string, number>);

const barChartData = Object.entries(monthlyRevenue).map(([month, amount]) => ({
  month,
  amount
}));

export default function FinancialDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Financial Dashboard</h1>
                <p className="text-muted-foreground">Overview of financial performance</p>
              </div>
              <UserAvatar />
            </div>

            <div className="space-y-6">
              {/* Trend Chart */}
              <FinancialTrendChart />

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <Euro className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                    <div className="h-4 w-4 rounded-full bg-yellow-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {statusDistribution.pending_approval || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Requiring immediate attention
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Accepted Invoices</CardTitle>
                    <div className="h-4 w-4 rounded-full bg-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {statusDistribution.accepted || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Successfully processed
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Rejected Invoices</CardTitle>
                    <div className="h-4 w-4 rounded-full bg-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {statusDistribution.rejected || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Requiring revision
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Invoice Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={statusColors[entry.name.toLowerCase().replace(' ', '_') as keyof typeof statusColors]} 
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barChartData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="amount" fill="hsl(var(--primary))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}