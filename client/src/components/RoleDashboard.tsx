import { useState } from 'react';
import Calendar from '@/components/Calendar';
import PeopleDirectory from '@/components/PeopleDirectory';
import ProjectDirectory from '@/components/ProjectDirectory';
import TaskList from '@/components/TaskList';
import { Card } from '@/components/ui/card';

// Define dashboard widget types
type WidgetType = 'calendar' | 'people' | 'projects' | 'tasks';

// Define dashboard layout configuration by role
const roleBasedLayouts: Record<string, WidgetType[]> = {
  administrator: ['calendar', 'projects', 'tasks', 'people'],
  program_manager: ['projects', 'tasks', 'calendar', 'people'],
  instructor: ['calendar', 'tasks', 'people'],
  finance_manager: ['projects', 'tasks'],
};

// Widget components mapping
const widgets: Record<WidgetType, React.ComponentType> = {
  calendar: Calendar,
  people: PeopleDirectory,
  projects: ProjectDirectory,
  tasks: TaskList,
};

interface RoleDashboardProps {
  userRole?: string;
}

export default function RoleDashboard({ userRole = 'administrator' }: RoleDashboardProps) {
  const layout = roleBasedLayouts[userRole] || roleBasedLayouts.administrator;

  const renderWidget = (type: WidgetType, index: number) => {
    const Widget = widgets[type];
    return (
      <div key={index} className="bg-card rounded-lg shadow-sm p-4 mb-6">
        <Widget />
      </div>
    );
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column */}
      <div className="col-span-12 lg:col-span-5">
        {layout.slice(0, 2).map((widget, index) => renderWidget(widget as WidgetType, index))}
      </div>

      {/* Right Column */}
      <div className="col-span-12 lg:col-span-7 space-y-6">
        {layout.slice(2).map((widget, index) => renderWidget(widget as WidgetType, index + 2))}
      </div>
    </div>
  );
}
