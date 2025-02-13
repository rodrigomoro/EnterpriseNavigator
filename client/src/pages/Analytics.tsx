import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import UserAvatar from "@/components/UserAvatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';
import { mockPeople } from '@/data/mockPeople';
import { mockStudents, mockPrograms } from '@/data/mockPrograms';

// Calculate program performance metrics
const programMetrics = {
  totalStudents: mockStudents.length,
  totalPrograms: mockPrograms.length,
  averageProgress: Math.round(
    mockPrograms.reduce((acc, proj) => acc + proj.progress, 0) / mockPrograms.length
  ),
  activeStaff: mockPeople.length
};

// Calculate program distribution data
const programDistributionData = mockPrograms.map(program => {
  const moduleTeachers = program.modules.flatMap(module => 
    program.intakes.flatMap(intake => 
      intake.groups.flatMap(group => 
        group.moduleTeachers
          .filter(mt => mt.moduleId === module)
          .flatMap(mt => mt.teacherIds)
      )
    )
  );

  return {
    name: program.name,
    value: program.studentCount,
    progress: program.progress,
    teamSize: new Set(moduleTeachers).size
  };
});

// Calculate program progress data
const programProgressData = mockPrograms.map(program => ({
  name: program.name,
  progress: program.progress,
  studentCount: program.studentCount
}));

// Colors for charts
const CHART_COLORS = ['#0ea5e9', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('12');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const progressData = payload.find((p: { dataKey: string; }) => p.dataKey === 'progress');
    const studentData = payload.find((p: { dataKey: string; }) => p.dataKey === 'studentCount');

    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid gap-2">
          <div className="font-medium">{label}</div>
          <div className="grid grid-cols-2 gap-4">
            {progressData && (
              <div>
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  Progress
                </span>
                <span className="block font-bold">
                  {progressData.value}%
                </span>
              </div>
            )}
            {studentData && (
              <div>
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  Students
                </span>
                <span className="block font-bold">
                  {studentData.value}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Educational Analytics</h1>
                <p className="text-muted-foreground">Program and Student Performance Insights</p>
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
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{programMetrics.totalStudents}</div>
                    <p className="text-xs text-muted-foreground">
                      Across all programs
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{programMetrics.totalPrograms}</div>
                    <p className="text-xs text-muted-foreground">
                      Currently running
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{programMetrics.averageProgress}%</div>
                    <p className="text-xs text-muted-foreground">
                      Program completion rate
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{programMetrics.activeStaff}</div>
                    <p className="text-xs text-muted-foreground">
                      Teaching and support
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Program Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Program Progress Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={programProgressData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" label={{ value: 'Progress (%)', angle: -90, position: 'insideLeft' }} />
                        <YAxis yAxisId="right" orientation="right" label={{ value: 'Students', angle: 90, position: 'insideRight' }} />
                        <Tooltip content={CustomTooltip} />
                        <Area
                          yAxisId="left"
                          type="monotone"
                          dataKey="progress"
                          stroke={CHART_COLORS[0]}
                          fill={CHART_COLORS[0]}
                          fillOpacity={0.2}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="studentCount"
                          stroke={CHART_COLORS[1]}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Program Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Program Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={programDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          nameKey="name"
                        >
                          {programDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="grid gap-2">
                                    <div className="font-medium">{data.name}</div>
                                    <div className="grid gap-1">
                                      <div className="text-sm">
                                        <span className="text-muted-foreground">Students: </span>
                                        <span className="font-medium">{data.value}</span>
                                      </div>
                                      <div className="text-sm">
                                        <span className="text-muted-foreground">Progress: </span>
                                        <span className="font-medium">{data.progress}%</span>
                                      </div>
                                      <div className="text-sm">
                                        <span className="text-muted-foreground">Team Size: </span>
                                        <span className="font-medium">{data.teamSize}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend />
                      </PieChart>
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