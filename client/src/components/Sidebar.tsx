import { Home, Calendar, Users, PieChart, Settings, LogOut, FolderKanban, Receipt, QrCode, BarChart, Network, Award, BookOpen } from 'lucide-react';
import { Link } from 'wouter';

const navigationItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: FolderKanban, label: 'Programs', href: '/programs' },
  { icon: BookOpen, label: 'Modules Catalog', href: '/modules' },
  { icon: Calendar, label: 'Calendar', href: '/calendar' },
  { icon: Users, label: 'People', href: '/people' },
  { icon: Network, label: 'Organization', href: '/organization' },
  { icon: Award, label: 'Skills Matrix', href: '/skills-matrix' },
  { icon: Receipt, label: 'Invoices', href: '/invoices' },
  { icon: QrCode, label: 'QR Tracking', href: '/qr-tracking' },
  { icon: BarChart, label: 'Financial', href: '/financial-dashboard' },
  { icon: PieChart, label: 'Analytics', href: '/analytics' },
];

export default function Sidebar() {
  return (
    <aside className="w-12 md:w-48 bg-sidebar text-sidebar-foreground min-h-screen flex flex-col">
      <div className="p-3">
        <h2 className="text-lg font-bold hidden md:block">Immune Institute ERP</h2>
      </div>

      <nav className="flex-1 px-2">
        {navigationItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-sidebar-accent group cursor-pointer">
              <item.icon className="h-4 w-4" />
              <span className="hidden md:block text-sm">{item.label}</span>
            </a>
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <Link href="/settings">
          <a className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-sidebar-accent w-full">
            <Settings className="h-4 w-4" />
            <span className="hidden md:block text-sm">Settings</span>
          </a>
        </Link>
        <button className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-sidebar-accent w-full mt-1">
          <LogOut className="h-4 w-4" />
          <span className="hidden md:block text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}