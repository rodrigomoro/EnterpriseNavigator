import { Home, Calendar, Users, PieChart, Settings, LogOut, FolderKanban, Receipt, Building2, BarChart, Network, Award, BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from 'react';

const navigationGroups = [
  {
    items: [
      { icon: Home, label: 'Home', href: '/' },
    ]
  },
  {
    title: 'Academic',
    items: [
      { icon: FolderKanban, label: 'Programs', href: '/programs', tourId: 'program-management' },
      { icon: BookOpen, label: 'Modules', href: '/modules' },
      { icon: Calendar, label: 'Calendar', href: '/calendar', tourId: 'calendar' },
    ]
  },
  {
    title: 'HR',
    items: [
      { icon: Users, label: 'People', href: '/people', tourId: 'people-management' },
      { icon: Network, label: 'Organization', href: '/organization' },
      { icon: Award, label: 'Skills Matrix', href: '/skills-matrix' },
    ]
  },
  {
    title: 'Finance',
    items: [
      { icon: Receipt, label: 'Invoices', href: '/invoices' },
      { icon: Building2, label: 'Bank Integration', href: '/bank-integration' },
    ]
  },
  {
    title: 'Insights',
    items: [
      { icon: BarChart, label: 'Financial', href: '/financial-dashboard' },
      { icon: PieChart, label: 'Analytics', href: '/analytics' },
    ]
  }
];

export default function Sidebar() {
  const [openGroups, setOpenGroups] = useState<string[]>(['Academic', 'HR', 'Finance', 'Insights']);

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  return (
    <aside className="w-12 md:w-48 bg-sidebar text-sidebar-foreground h-screen flex flex-col fixed left-0 top-0">
      <div className="p-3">
        <h2 className="text-lg font-bold hidden md:block">Immune Institute ERP</h2>
      </div>

      <nav className="flex-1 px-2 overflow-y-auto">
        {navigationGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-4">
            {group.title ? (
              <Collapsible 
                open={openGroups.includes(group.title)} 
                onOpenChange={() => toggleGroup(group.title!)}
              >
                <CollapsibleTrigger className="flex items-center w-full text-xs uppercase text-sidebar-foreground/50 font-semibold px-2 mb-2">
                  {openGroups.includes(group.title!) ? (
                    <ChevronDown className="h-3 w-3 mr-1" />
                  ) : (
                    <ChevronRight className="h-3 w-3 mr-1" />
                  )}
                  <span className="hidden md:block">{group.title}</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {group.items.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <div 
                        className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-sidebar-accent group cursor-pointer"
                        {...(item.tourId ? { 'data-tour': item.tourId } : {})}
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="hidden md:block text-sm">{item.label}</span>
                      </div>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              // Non-collapsible items (Home)
              group.items.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div 
                    className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-sidebar-accent group cursor-pointer"
                    {...(item.tourId ? { 'data-tour': item.tourId } : {})}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden md:block text-sm">{item.label}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <Link href="/settings">
          <div 
            className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-sidebar-accent w-full cursor-pointer"
            data-tour="settings"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden md:block text-sm">Settings</span>
          </div>
        </Link>
        <button className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-sidebar-accent w-full mt-1">
          <LogOut className="h-4 w-4" />
          <span className="hidden md:block text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}