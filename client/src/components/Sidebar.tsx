import { Home, Calendar, Users, PieChart, Settings, LogOut, FolderKanban, Receipt, QrCode, BarChart, Network, Award } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { navigationLabels } from '@/data/mockData';

const navigationIcons = {
  home: Home,
  programs: FolderKanban,
  calendar: Calendar,
  people: Users,
  organization: Network,
  skillsMatrix: Award,
  invoices: Receipt,
  qrTracking: QrCode,
  financial: BarChart,
  analytics: PieChart,
};

export default function Sidebar() {
  const { language } = useLanguage();

  const navigationItems = Object.entries(navigationIcons).map(([key, Icon]) => ({
    icon: Icon,
    label: navigationLabels[key][language],
    href: `/${key === 'home' ? '' : key}`,
  }));

  return (
    <aside className="w-12 md:w-48 bg-sidebar text-sidebar-foreground min-h-screen flex flex-col">
      <div className="p-3">
        <h2 className="text-lg font-bold hidden md:block">Immune Institute ERP</h2>
      </div>

      <nav className="flex-1 px-2">
        {navigationItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-sidebar-accent group cursor-pointer">
              <item.icon className="h-4 w-4" />
              <span className="hidden md:block text-sm">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-border space-y-2">
        <button className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-sidebar-accent w-full">
          <Settings className="h-4 w-4" />
          <span className="hidden md:block text-sm">{navigationLabels.settings[language]}</span>
        </button>
        <button className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-sidebar-accent w-full">
          <LogOut className="h-4 w-4" />
          <span className="hidden md:block text-sm">{navigationLabels.logout[language]}</span>
        </button>
      </div>
    </aside>
  );
}